# MEVSpy

### The AI way of tracking MEV Transactions! We are using Graph Neural Networks to ensure better MEV tracking for fair reward distribution among Validators & for comprehensive statistical analysis.

We use Graph Neural Networks to track transactions happening on-chain. Here's a [live demo](https://mev-spy.vercel.app/) for you !

# Overview

![](https://github.com/star-gazer111/MEVSpy/blob/75f596f4795192933b11be48b779f9cea574af41/architecture/Screenshot%20from%202024-05-21%2013-10-34.png)

# Architecture

The project is a comprehensive one & involves 3 separately working parts linked to each other privately & securely using Lit Actions.

The first part of the project is the dataset generation. We utilise [Powerloom Snapshotters](https://docs.powerloom.io/docs/build-with-powerloom/snapshotter-node/introduction) for this. The snapshotters take snap of the epoch from block ```15615328``` to block ```15643187```. The snapshotters generate transaction receipts of each transaction that was part of these blocks, the transactions are then sampled into a CSV to create this [dataset](https://github.com/star-gazer111/MEVSpy/blob/c32f4d225961bb34b0a485386b2f819859be1d30/dataset/transactions.csv) and labelled as MEV & Non-MEV  according to the algo mentioned below :
![image](https://github.com/star-gazer111/MEVSpy/blob/main/architecture/Screenshot%20from%202024-05-21%2013-10-38.png)

The dataset is then archived onto filecoin using the py-ipfs-client library provided by Powerloom. We made several improvements to the library such as a documentation to use it, added 7 more tests, optimised the code, added error handling & retrying mechanisms & also optimised exceptions handling & logging. Then Lassie can be used by Clients to retrieve the data from Filecoin for training the GNN model. The architecture is as shown below :

![image](https://github.com/star-gazer111/MEVSpy/blob/34b0ae2f654952828fa04f20e6abfcdfc510a3b5/architecture/MEVSpy.drawio%20(3).png)

The architecture for the GNN we are using is as shown :

![image](https://github.com/star-gazer111/MEVSpy/blob/a5212e39cd43d18bb82e45edf067f48355cbb703/architecture/Screenshot%20from%202024-05-21%2013-10-44.png)

The second part of MEVSPy involves training the GNN using the dataset generated from Part 1. The clients using LIt Actions train securely on their own end the model & sends the results to the server who aggregates them & keeps updating the global parameters. The approach of Federated Learning is utilised here for decentralised training of GNN using Lit Actions & Filecoin.

![image](https://github.com/star-gazer111/MEVSpy/blob/9b8b87e612f1c032b72772595016ab283fb50ec6/architecture/MEVSpy.drawio%20(1).png)

The final part is the user side. The trained model is hosted as an API (See more on it in the #how-to-run section of README). The user calls the main contract that interacts with the Oracle Contract through Lit Actions again(securely) & the oracle then calls the off-chain GNN with an input which is the tx_hash & the blockNumber that user gave as input and wants to scan it. The output is sent back by oracle using the callback function used in the contract. The contracts are deployed on FVM testnet & Galadriel Devnet. The architecture for the 3rd part is inspired from Galadriel.

![image](https://github.com/star-gazer111/MEVSpy/blob/d592e567af4d29bb7034a8b479892ba73de37ad6/architecture/MEVSpy.drawio%20(2).png)

### This is how MEVSpy makes MEV tracking & analysis faster & efficient than ever!

## Deployed Contracts

| Contracts | Galadriel Devnet |
|-----------|------------------|
| [Oracle](https://github.com/star-gazer111/MEVSpy/blob/main/Contracts/contracts/Oracle.sol) | [0x1bFD12d25E35AB48AF1Ae46F5b3678c6c42F89E7](https://explorer.galadriel.com/address/0x1bFD12d25E35AB48AF1Ae46F5b3678c6c42F89E7) | 
| [Caller](https://github.com/star-gazer111/MEVSpy/blob/061e898011b0197a55dfeae8cf9f983572b0c4d9/Contracts/contracts/Caller.sol) | [0x4bFEF046E5e70Fb1180A63AAb761189BF2D2E89f](https://explorer.galadriel.com/address/0x4bFEF046E5e70Fb1180A63AAb761189BF2D2E89f) | 


| Contracts | Filecoin Testnet(FVM) |
|-----------|------------------|
| [Oracle](https://github.com/star-gazer111/MEVSpy/blob/main/Contracts/contracts/Oracle.sol) | [t410fn3meae2jwkg2bvjsk4awog3jkgzzp2h4qv2opzq](https://calibration.filfox.info/en/address/0x6Ed8401349B28DA0D5325701671b6951b397E8FC)| 
| [Caller](https://github.com/star-gazer111/MEVSpy/blob/main/Contracts/contracts/Caller.sol) |[t410fu7cq7fiedpwuthckdk5pb52dbgt77iuhtrea5aa](https://calibration.filfox.info/en/address/0xA7c50F95041beD499C4a1aBAf0f74309a7ffa287)| 

Check out below on how to use it.

# How to Use

### Case-1 : You just wish to scan your transaction ( For 98% of the users).

Well, for this you can directly use this [link](https://mev-spy.vercel.app/).

### Case-2 : You wish to train the Model.

1. Clone the repository
   ``` bash
   git clone git@github.com:star-gazer111/MEVSpy.git && cd MEVSpy
   ```

2. Open a terminal & start the model API
   ``` bash
   cd GNN && python main.py
   ```

3. Start another terminal & test your requests onto the API using CLI.
   ``` bash
   python predict.py
   ```
   
4. Open another terminal & start LitNode
   ``` bash
   cd backend && node run_scripts.js
   ```
   
5. Start the training!
   ``` bash
   cd TrainArbinet && ./run.sh
   ```
   In case, you get ```permission denied``` , make the script executable using :
   ``` bash
   chmod +x run.sh
   ```

6. Start the frontend
   ``` bash
   cd App && cd client && cd src && npm i
   ```

7. Run!
   ``` bash
   npm run dev
   ```

Be sure to replace the url [here](https://github.com/star-gazer111/MEVSpy/blob/c32f4d225961bb34b0a485386b2f819859be1d30/App/client/src/components/ResultModal.jsx#L57) with your own endpoint after running the api above.

### Case-3 : You wish to generate the dataset (be cautious of the hardware needs & be patient for the time it takes )

1. Clone the repository
   ``` bash
   git clone git@github.com:star-gazer111/MEVSpy.git && cd MEVSpy
   ```

2. Start the snapshotter node
   ``` bash
   cd Powerloom && cd snapshotter && cd utils && cd preloaders && python preloader.py
   ```

3. Start another terminal & activate the ```py-ipfs-client``` library. This will be required for archiving the snaps on Filecoin

   3a. Install Poetry
   ``` bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```

   3b. Verify Installation
   ``` bash
   source ~/.bashrc  # or ~/.zshrc, ~/.profile, etc. && poetry --version

   ```

   3c. Add Poetry to path manually . If the automatic addition to PATH didn't work, you can manually add Poetry to your PATH. Typically, Poetry is installed in the 
       following directory:

   On Unix (Linux/macOS): ```$HOME/.local/bin```
   On Windows: ```%APPDATA%\Python\Scripts```

   ``` bash
   export PATH="$HOME/.local/bin:$PATH"
   ```

   3d. Install packages
   ``` bash
   poetry install
   ```
   3e. Run File
   ``` bash
   poetry run python path/to/your_script.py
   ```
   

# Citation
```bash
@article{park2023unraveling,
  title={Unraveling the MEV Enigma: ABI-Free Detection Model using Graph Neural Networks},
  author={Park, Seongwan and Jeong, Woojin and Lee, Yunyoung and Son, Bumho and Jang, Huisu and Lee, Jaewook},
  journal={arXiv preprint arXiv:2305.05952},
  year={2023}
}
```
