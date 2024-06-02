import sys
from loguru import logger


class CustomFormatter:
    def __init__(self):
        self.FORMAT = (
            "{time:MMMM D, YYYY > HH:mm:ss!UTC} | {level} | {message} | {extra}"
        )

    def __call__(self, record):
        return self.FORMAT.format(**record)


def setup_logger():
    logger.remove()

    # Add stdout handler for DEBUG level messages
    logger.add(
        sys.stdout,
        level='DEBUG',
        format=CustomFormatter(),
        colorize=True  # Enable colorization for terminal output
    )

    # Add stderr handler for WARNING and ERROR level messages
    logger.add(
        sys.stderr,
        level='WARNING',
        format=CustomFormatter(),
        colorize=True,
    )

    # Add additional stderr handler for ERROR level messages with backtrace and diagnose
    logger.add(
        sys.stderr,
        level='ERROR',
        format=CustomFormatter(),
        colorize=True,
        backtrace=True,
        diagnose=True,
    )

    # Optionally add file handler or other handlers as needed
    # logger.add("file.log", level="INFO", format=CustomFormatter())

    # Add any other desired configurations, like rotation, retention, etc.
    # logger.configure(handlers=[{"sink": "file.log", "rotation": "10 MB"}])


# Initialize logger setup
setup_logger()
