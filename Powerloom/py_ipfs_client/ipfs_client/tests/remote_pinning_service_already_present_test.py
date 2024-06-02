import os

from ipfs_client.main import AsyncIPFSClientSingleton
from ipfs_client.settings.data_models import ConnectionLimits
from ipfs_client.settings.data_models import ExternalAPIAuth
from ipfs_client.settings.data_models import IPFSConfig
from ipfs_client.settings.data_models import IPFSWriterRateLimit
from ipfs_client.settings.data_models import RemotePinningConfig
from unittest.mock import AsyncMock, Mock

async def test_remote_pinning_service_already_present(self):
       client = AsyncIPFSClientSingleton(...)  # Initialize client with mock settings
       client._client.post = AsyncMock(return_value=Mock(status_code=500, text='{"Message": "service already present"}'))
       
       await client.init_session()  # This should log a debug message and continue without raising an error