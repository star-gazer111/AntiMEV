import json
from urllib.parse import urljoin
from tenacity import retry, stop_after_attempt, wait_fixed

from httpx import AsyncClient
from httpx import AsyncHTTPTransport
from httpx import Limits, Timeout

import ipfs_client.exceptions
import ipfs_client.utils.addr as addr_util
from ipfs_client.dag import DAGSection
from ipfs_client.dag import IPFSAsyncClientError
from ipfs_client.default_logger import logger
from ipfs_client.settings.data_models import IPFSConfig


class AsyncIPFSClient:
    _settings: IPFSConfig
    _client: AsyncClient

    def __init__(
        self,
        addr,
        settings: IPFSConfig,
        api_base='api/v0',
        write_mode=False,
    ):
        try:
            self._base_url, self._host_numeric = addr_util.multiaddr_to_url_data(
                addr, api_base,
            )
        except ipfs_client.exceptions.AddressError:
            if not addr_util.is_valid_url(addr):
                raise ValueError('Invalid IPFS address')
            self._base_url = urljoin(addr, api_base)
            self._host_numeric = addr_util.P_TCP
        self.dag = None
        self._logger = logger.bind(module='IPFSAsyncClient')
        self._settings = settings
        self._write_mode = write_mode

    async def init_session(self):
        conn_limits = self._settings.connection_limits
        self._async_transport = AsyncHTTPTransport(
            limits=Limits(
                max_connections=conn_limits.max_connections,
                max_keepalive_connections=conn_limits.max_connections,
                keepalive_expiry=conn_limits.keepalive_expiry,
            ),
        )
        client_init_args = dict(
            base_url=self._base_url,
            timeout=Timeout(self._settings.timeout),
            follow_redirects=False,
            transport=self._async_transport,
        )
        if self._settings.url_auth:
            client_init_args.update(
                {
                    'auth': (
                        self._settings.url_auth.apiKey,
                        self._settings.url_auth.apiSecret,
                    ),
                },
            )
        self._client = AsyncClient(**client_init_args)

        if self._settings.remote_pinning.enabled and self._write_mode:
            if not all(
                [
                    self._settings.remote_pinning.service_name,
                    self._settings.remote_pinning.service_endpoint,
                    self._settings.remote_pinning.service_token,
                ],
            ):
                raise ValueError(
                    'Remote pinning enabled but service_name, service_endpoint, or service_token not set',
                )

            await self.add_remote_pinning_service()

        self.dag = DAGSection(self._client)
        self._logger.debug('Inited IPFS client on base url {}', self._base_url)

    async def add_remote_pinning_service(self):
        @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
        async def add_service():
            r = await self._client.post(
                url=f'/pin/remote/service/add?arg={self._settings.remote_pinning.service_name}&arg={self._settings.remote_pinning.service_endpoint}&arg={self._settings.remote_pinning.service_token}',
            )
            r.raise_for_status()  # Raise HTTPError if response status is not 2xx

            try:
                resp = json.loads(r.text)
                if resp.get('Message') == 'service already present':
                    self._logger.debug('Remote pinning service already present')
            except json.JSONDecodeError:
                raise IPFSAsyncClientError(
                    f'IPFS client error: remote pinning service add operation, response:{r}',
                )

        await add_service()

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    async def add_bytes(self, data: bytes, **kwargs):
        files = {'': data}
        r = await self._client.post(
            url='/add?cid-version=1',
            files=files,
        )
        r.raise_for_status()  # Raise HTTPError if response status is not 2xx

        try:
            resp = json.loads(r.text)
            generated_cid = resp['Hash']
        except json.JSONDecodeError:
            return r.text

        if self._settings.remote_pinning.enabled:
            await self.add_remote_pinning(data, generated_cid)

        return generated_cid

    @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
    async def cat(self, cid, **kwargs):
        bytes_mode = kwargs.get('bytes_mode', False)
        if not bytes_mode:
            response_body = ''
        else:
            response_body = b''
        last_response_code = None
        async with self._client.stream(method='POST', url=f'/cat?arg={cid}') as response:
            response.raise_for_status()  # Raise HTTPError if response status is not 2xx

            if not bytes_mode:
                async for chunk in response.aiter_text():
                    response_body += chunk
            else:
                async for chunk in response.aiter_bytes():
                    response_body += chunk
            last_response_code = response.status_code

        if not response_body:
            raise IPFSAsyncClientError(
                f'IPFS client error: cat on CID {cid}, response body empty. response status code error: {last_response_code}',
            )
        return response_body

    async def add_remote_pinning(self, data, generated_cid):
        @retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
        async def pin_data():
            r = await self._client.post(
                url=f'/pin/remote/add?arg={generated_cid}&service={self._settings.remote_pinning.service_name}&background={self._settings.remote_pinning.background_pinning}',
            )
            r.raise_for_status()  # Raise HTTPError if response status is not 2xx

        await pin_data()

    async def add_json(self, json_obj, **kwargs):
        try:
            json_data = json.dumps(json_obj).encode('utf-8')
        except Exception as e:
            raise e

        cid = await self.add_bytes(json_data, **kwargs)
        return cid


class AsyncIPFSClientSingleton:
    def __init__(self, settings: IPFSConfig):
        self._ipfs_write_client = AsyncIPFSClient(
            addr=settings.url, settings=settings, write_mode=True,
        )
        self._ipfs_read_client = AsyncIPFSClient(
            addr=settings.reader_url, settings=settings, write_mode=False,
        )
        self._initialized = False

    async def init_sessions(self):
        if self._initialized:
            return
        await self._ipfs_write_client.init_session()
        await self._ipfs_read_client.init_session()
        self._initialized = True
