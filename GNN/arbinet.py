import pandas as pd
import torch
from torch_geometric.data import Data
from sklearn.preprocessing import LabelEncoder
import torch.nn.functional as F
from torch_geometric.nn import GCNConv

# Load node features and labels
transactions_df = pd.read_csv('transactions.csv')
edges_df = pd.read_csv('edges.csv')

# Encode categorical features like contract_address and node
le_contract = LabelEncoder()
le_node = LabelEncoder()

transactions_df['contract_address'] = le_contract.fit_transform(transactions_df['contract_address'])
transactions_df['node'] = le_node.fit_transform(transactions_df['node'])

# Extract node features and labels
node_features = torch.tensor(transactions_df[['contract_address', 'node', 'amount']].values, dtype=torch.float)
node_labels = torch.tensor(transactions_df['label'].values, dtype=torch.long)

# Extract edge indices
edge_index = torch.tensor(edges_df.values.T, dtype=torch.long)

# Create a PyTorch Geometric Data object
data = Data(x=node_features, edge_index=edge_index, y=node_labels)


class GNN(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(GNN, self).__init__()
        self.conv1 = GCNConv(input_dim, hidden_dim)
        self.conv2 = GCNConv(hidden_dim, output_dim)

    def forward(self, data):
        x, edge_index = data.x, data.edge_index
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = self.conv2(x, edge_index)
        return F.log_softmax(x, dim=1)

# Define the model
input_dim = node_features.shape[1]
hidden_dim = 16
output_dim = 2  # MEV or NON-MEV

model = GNN(input_dim, hidden_dim, output_dim)

optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
loss_fn = torch.nn.CrossEntropyLoss()

# Training the GNN
def train():
    model.train()
    optimizer.zero_grad()
    out = model(data)
    loss = loss_fn(out, data.y)
    loss.backward()
    optimizer.step()
    return loss.item()

# Training loop
for epoch in range(100):
    loss = train()
    if epoch % 10 == 0:
        print(f'Epoch {epoch}, Loss: {loss:.4f}')

def predict(model, data, new_data):
    model.eval()
    new_data_tensor = torch.tensor(new_data, dtype=torch.float)
    data.x = new_data_tensor
    out = model(data)
    _, pred = out.max(dim=1)
    return pred.item()

# Example new data for prediction
new_data = [[contract_address_value, node_value, amount_value]]
prediction = predict(model, data, new_data)
print('Prediction (0=NON-MEV, 1=MEV):', prediction)
