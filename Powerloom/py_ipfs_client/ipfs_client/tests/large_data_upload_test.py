import os

from ipfs_client.main import AsyncIPFSClientSingleton
from ipfs_client.settings.data_models import ConnectionLimits
from ipfs_client.settings.data_models import ExternalAPIAuth
from ipfs_client.settings.data_models import IPFSConfig
from ipfs_client.settings.data_models import IPFSWriterRateLimit
from ipfs_client.settings.data_models import RemotePinningConfig

async def test_large_data_upload(self):
        client = AsyncIPFSClientSingleton(...)  # Initialize client with mock settings
        large_data = b"Large data" * 1024 * 1024  # 1MB of data
        cid = await client.add_bytes(large_data)
        
        # Assert that the returned CID is valid and can retrieve the correct data
        retrieved_data = await client.cat(cid)
        assert retrieved_data == large_data