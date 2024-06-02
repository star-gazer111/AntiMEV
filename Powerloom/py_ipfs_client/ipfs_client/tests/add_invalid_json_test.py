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

async def test_add_invalid_json(self):
       client = AsyncIPFSClientSingleton(...)  # Initialize client with mock settings
       invalid_json_data = {"key": b"value"}  # Invalid JSON with bytes value
       
       with pytest.raises(IPFSAsyncClientError):
           await client.add_json(invalid_json_data)