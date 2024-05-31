# main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
import torch.nn as nn
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Step 1: Load the trained model and label encoder
class SimpleClassifier(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(SimpleClassifier, self).__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, output_dim)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return torch.log_softmax(x, dim=1)

model = SimpleClassifier(input_dim=2, hidden_dim=32, output_dim=2)
model.load_state_dict(torch.load('model.pth', map_location=torch.device('cpu')))  # Load your trained model here

label_encoder = LabelEncoder()
label_encoder.classes_ = torch.load('label_encoder.pth')  # Load your label encoder here

# Step 2: Initialize FastAPI app
app = FastAPI()

# Step 3: Define input and output models
class TransactionInput(BaseModel):
    block: int
    tx_hash: str

class TransactionOutput(BaseModel):
    prediction: str

# Step 4: Create prediction endpoint
@app.post('/predict/', response_model=TransactionOutput)
def predict(transaction: TransactionInput):
    try:
        # Encode transaction hash
        tx_hash_encoded = label_encoder.transform([transaction.tx_hash])[0]
        
        # Prepare input tensor
        input_tensor = torch.tensor([[transaction.block, tx_hash_encoded]], dtype=torch.float32)

        # Make prediction
        model.eval()
        with torch.no_grad():
            output = model(input_tensor)
            _, predicted_class = torch.max(output, 1)
            predicted_label = 'MEV' if (predicted_class.item() + 1) == 1 else 'Non-MEV'

        return {'prediction': predicted_label}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/')
def root():
    return {'message': 'Welcome to the FastAPI deployment for transaction prediction.'}

# Step 5: Run FastAPI app with Uvicorn server
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)
