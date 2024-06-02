import io
import os

from ipfs_client.main import AsyncIPFSClientSingleton
from ipfs_client.settings.data_models import ConnectionLimits
from ipfs_client.settings.data_models import ExternalAPIAuth
from ipfs_client.settings.data_models import IPFSConfig
from ipfs_client.settings.data_models import IPFSWriterRateLimit
from ipfs_client.settings.data_models import RemotePinningConfig


async def test_add_str(self):
       client = AsyncIPFSClientSingleton(...)  # Initialize client with mock settings
       string_data = "Hello, IPFS!"
       cid = await client.add_str(string_data)
       # Assert that the returned CID is valid and can retrieve the correct data
       retrieved_data = await client.cat(cid)
       assert retrieved_data == string_data.encode('utf-8')