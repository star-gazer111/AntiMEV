# MEV spy

### The AI way of tracking MEV Transactions! We are using Graph Neural Networks to ensure better MEV tracking for fair reward distribution among Validators & for comprehensive statistical analysis.

We use Graph Neural Networks to track transactions happening on-chain.

The project is a comprehensive one & involves 3 separately working parts linked to each other privately & securely using Lit Actions. The first part of the project is the dataset generation. We utilise Powerloom Snapshotters for this. The snapshotters take snap of the epoch from block 15615328 to block 15643187. The snapshotters generate transaction receipts of each transaction that was part of these blocks, the transactions are then sampled into a CSV and labelled as MEV & Non-MEV according to the algo mentioned here.

The dataset is then archived onto filecoin using the py-ipfs-client library provided by Powerloom. We made several improvements to the library such as a documentation to use it, added 7 more tests, optimised the code, added error handling & retrying mechanisms & also optimised exceptions handling & logging. Then Lassie can be used by Clients to retrieve the data from Filecoin for training the GNN model. The architecture is as shown below :

![image](https://github.com/star-gazer111/MEVSpy/blob/34b0ae2f654952828fa04f20e6abfcdfc510a3b5/architecture/MEVSpy.drawio%20(3).png)

The second part of MEVSPy involves training the GNN using the dataset generated from Part 1. The clients using LIt Actions train securely on their own end the model & sends the results to the server who aggregates them & keeps updating the global parameters. The approach of Federated Learning is utilised here for decentralised training of GNN using Lit Actions & Filecoin.

The final part is the user side. The trained model is hosted as an API (See more on it in the #how-to-run section of README). The user calls the main contract that interacts with the Oracle Contract through Lit Actions again(securely) & the oracle then calls the off-chain GNN with an input which is the tx_hash & the blockNumber that user gave as input and wants to scan it. The output is sent back by oracle using the callback function used in the contract. The contracts are deployed on FVM testnet & Galadriel Devnet. The architecture for the 3rd part is inspired from Galadriel.

This is how MEVSpy makes MEV tracking & analysis faster & efficient than ever

Inspiration taken from 
```bash
@article{park2023unraveling,
  title={Unraveling the MEV Enigma: ABI-Free Detection Model using Graph Neural Networks},
  author={Park, Seongwan and Jeong, Woojin and Lee, Yunyoung and Son, Bumho and Jang, Huisu and Lee, Jaewook},
  journal={arXiv preprint arXiv:2305.05952},
  year={2023}
}
```
