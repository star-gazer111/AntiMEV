import subprocess
from dotenv import load_dotenv
import os

def run_command(command):
    try:
        result = subprocess.run(command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"Command '{command}' executed successfully.")
        print("Output:\n", result.stdout.decode())
    except subprocess.CalledProcessError as e:
        print(f"Command '{command}' failed with error:\n{e.stderr.decode()}")

# Load environment variables from .env file
load_dotenv()

CID = os.getenv('CID')
INPUT_FILE = os.getenv('INPUT_FILE')
FILE_PATH = os.getenv('FILE_PATH')
OUTPUT_DIR = os.getenv('OUTPUT_DIR')

commands = [
    "go install github.com/filecoin-project/lassie/cmd/lassie@latest",
    "go install github.com/ipld/go-car/cmd/car@latest",
    f"lassie fetch -o - {CID} | car extract",
    "ls -l",
    f"car extract -f {INPUT_FILE}{FILE_PATH} {OUTPUT_DIR}"
]

for command in commands:
    run_command(command)
