import os
import asyncio
from ipfs_client.main import AsyncIPFSClientSingleton
from ipfs_client.settings.data_models import ConnectionLimits
from ipfs_client.settings.data_models import ExternalAPIAuth
from ipfs_client.settings.data_models import IPFSConfig
from ipfs_client.settings.data_models import IPFSWriterRateLimit
from ipfs_client.settings.data_models import RemotePinningConfig
from unittest.mock import AsyncMock, Mock

def test_logger_debug_messages(self):
       client = AsyncIPFSClientSingleton(...)  # Initialize client with mock settings
       client._logger.debug = Mock()
       # Trigger an operation that should log a debug message
       asyncio.run(client.init_session())
       client._logger.debug.assert_called_once_with('Inited IPFS client on base url {}', client._base_url)