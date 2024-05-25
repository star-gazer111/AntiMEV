import pandas as pd
import torch
from torch_geometric.data import Data
import torch.nn.functional as F
from torch_geometric.nn import GCNConv

nodes_df = pd.read_csv('nodes.csv')
edges_df = pd.read_csv('edges.csv')

node_features = torch.tensor(nodes_df.iloc[:, 1:-1].values, dtype=torch.float)
node_labels = torch.tensor(nodes_df['label'].values, dtype=torch.long)
edge_index = torch.tensor(edges_df.values.T, dtype=torch.long)

data = Data(x=node_features, edge_index=edge_index, y=node_labels)

#  Graph Neural Network
class GNN(torch.nn.Module):
    def __init__(self):
        super(GNN, self).__init__()
        self.conv1 = GCNConv(node_features.shape[1], 16)
        self.conv2 = GCNConv(16, 2)

    def forward(self, data):
        x, edge_index = data.x, data.edge_index
        x = self.conv1(x, edge_index)
        x = F.relu(x)
        x = self.conv2(x, edge_index)
        return F.log_softmax(x, dim=1)

model = GNN()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
loss_fn = torch.nn.CrossEntropyLoss()

def train():
    model.train()
    optimizer.zero_grad()
    out = model(data)
    loss = loss_fn(out, data.y)
    loss.backward()
    optimizer.step()
    return loss.item()

for epoch in range(100):
    loss = train()
    if epoch % 10 == 0:
        print(f'Epoch {epoch}, Loss: {loss:.4f}')

model.eval()
_, pred = model(data).max(dim=1)
correct = int((pred == data.y).sum())
accuracy = correct / len(data.y)
print(f'Accuracy: {accuracy:.4f}')
