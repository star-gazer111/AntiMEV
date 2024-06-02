import typing as ty
import multiaddr


class Error(Exception):
    """Base class for all exceptions in this module."""
    pass


class AddressError(Error, multiaddr.exceptions.Error):
    """Raised when the provided daemon location Multiaddr does not match any
    of the supported patterns."""

    def __init__(self, addr: ty.Union[str, bytes]) -> None:
        self.addr = addr
        super().__init__(f'Unsupported Multiaddr pattern: {addr!r}')


class IPFSAsyncClientError(Error):
    """Raised for errors related to the IPFSAsyncClient operations."""

    def __init__(self, message: str) -> None:
        self.message = message
        super().__init__(message)

    def __str__(self) -> str:
        return self.message

    def __repr__(self) -> str:
        return f'{self.__class__.__name__}({self.message!r})'


class RemotePinningError(IPFSAsyncClientError):
    """Raised when an error occurs during remote pinning operations."""

    def __init__(self, message: str) -> None:
        super().__init__(message)