# Optimised `py-ipfs-client` Library

## How to Run

Start a new terminal session & activate the ```py-ipfs-client``` library. This will be required for archiving the snaps on Filecoin

1. Install Poetry
   ``` bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```

2.  Verify Installation
   ``` bash
   source ~/.bashrc  # or ~/.zshrc, ~/.profile, etc. && poetry --version

   ```

3.  Add Poetry to path manually . If the automatic addition to PATH didn't work, you can manually add Poetry to your PATH. Typically, Poetry is installed in the 
       following directory:

   On Unix (Linux/macOS): ```$HOME/.local/bin```
   On Windows: ```%APPDATA%\Python\Scripts```

   ``` bash
   export PATH="$HOME/.local/bin:$PATH"
   ```

4. Install packages
   ``` bash
   poetry install
   ```
