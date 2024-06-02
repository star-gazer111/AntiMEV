import io
import os
import asyncio
import pytest
from ipfs_client.main import AsyncIPFSClientSingleton
from ipfs_client.settings.data_models import ConnectionLimits
from ipfs_client.settings.data_models import ExternalAPIAuth
from ipfs_client.settings.data_models import IPFSConfig
from ipfs_client.settings.data_models import IPFSWriterRateLimit
from ipfs_client.settings.data_models import RemotePinningConfig

async def test_add_json(self):
       client = AsyncIPFSClientSingleton(...)  # Initialize client with mock settings
       json_data = {"key": "value"}
       cid = await client.add_json(json_data)
       # Assert that the returned CID is valid and can retrieve the correct JSON object
       retrieved_data = await client.get_json(cid)
       assert retrieved_data == json_data

async def test_add_invalid_json(self):
       client = AsyncIPFSClientSingleton(...)  # Initialize client with mock settings
       invalid_json_data = {"key": b"value"}  # Invalid JSON with bytes value
       
       with pytest.raises(IPFSAsyncClientError):
           await client.add_json(invalid_json_data)