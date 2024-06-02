import io
import os
import pytest 
from ipfs_client.main import AsyncIPFSClientSingleton
from ipfs_client.settings.data_models import ConnectionLimits
from ipfs_client.settings.data_models import ExternalAPIAuth
from ipfs_client.settings.data_models import IPFSConfig
from ipfs_client.settings.data_models import IPFSWriterRateLimit
from ipfs_client.settings.data_models import RemotePinningConfig
from unittest.mock import AsyncMock, Mock

async def test_add_bytes_error_handling(self):
       client = AsyncIPFSClientSingleton(...)  # Initialize client with mock settings
       invalid_data = b"Invalid data"
       # Simulate a response with status_code != 200
       client._client.post = AsyncMock(return_value=Mock(status_code=500, text='{"Message": "error"}'))
       
       with pytest.raises(IPFSAsyncClientError):
           await client.add_bytes(invalid_data)