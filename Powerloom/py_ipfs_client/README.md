# Optimised `py-ipfs-client` Library

## How to Run

Start a new terminal session & activate the ```py-ipfs-client``` library. This will be required for archiving the snaps on Filecoin

1. Clone the repository
   ``` bash
   git clone git@github.com:PowerLoom/py-ipfs-client.git && cd py-ipfs-client
   ```

2. Install Poetry
   ``` bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```

3.  Verify Installation
    ``` bash
    source ~/.bashrc  # or ~/.zshrc, ~/.profile, etc. && poetry --version
    ```

4.  Add Poetry to path manually . If the automatic addition to PATH didn't work, you can manually add Poetry to your PATH. 
    Typically, Poetry is installed in the 
       following directory:

    On Unix (Linux/macOS): ```$HOME/.local/bin```
    On Windows: ```%APPDATA%\Python\Scripts```

    ``` bash
    export PATH="$HOME/.local/bin:$PATH"
    ```

5.  Install packages
    ``` bash
    poetry install
    ```

6. Run file
   ``` bash
   poetry run python path/to/your_script.py
   ```
