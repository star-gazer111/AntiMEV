# AntiMEV

### The AI way of tracking MEV Transactions! 

This project uses Graph Neural Networks to track transactions happening on-chain. Here's a [live demo](https://mev-spy.vercel.app/) for you !

# Overview

![](https://github.com/star-gazer111/MEVSpy/blob/75f596f4795192933b11be48b779f9cea574af41/architecture/Screenshot%20from%202024-05-21%2013-10-34.png)

# Architecture

The project is a comprehensive one & involves 3 separately working parts linked to each other privately & securely using Lit Actions.

The first part of the project is the dataset generation. The transactions are fetched and labelled as MEV & Non-MEV  according to the algo mentioned below :
![image](https://github.com/star-gazer111/MEVSpy/blob/main/architecture/Screenshot%20from%202024-05-21%2013-10-38.png)



The architecture for the GNN we are using is as shown :

![image](https://github.com/star-gazer111/MEVSpy/blob/a5212e39cd43d18bb82e45edf067f48355cbb703/architecture/Screenshot%20from%202024-05-21%2013-10-44.png)

The second part of AntiMEV involves training the GNN using the dataset generated from Part 1. 


The final part is the user side. The trained model is hosted as an API . The user calls the main contract that interacts with the Oracle Contract through Lit Actions again(securely) & the oracle then calls the off-chain GNN with an input which is the tx_hash & the blockNumber that user gave as input and wants to scan it. The output is sent back by oracle using the callback function used in the contract. T The architecture for the 3rd part is inspired from Galadriel.


### This is how AntiMEV makes MEV tracking & analysis faster & efficient than ever!


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

   

# Citation
```bash
@article{park2023unraveling,
  title={Unraveling the MEV Enigma: ABI-Free Detection Model using Graph Neural Networks},
  author={Park, Seongwan and Jeong, Woojin and Lee, Yunyoung and Son, Bumho and Jang, Huisu and Lee, Jaewook},
  journal={arXiv preprint arXiv:2305.05952},
  year={2023}
}
```
