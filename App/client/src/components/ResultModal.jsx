import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import MagLoader from "../assets/MagLoader.mp4";
import Web3 from "web3";
import Oracle from "../contracts/Oracle.json";
import Caller from "../contracts/Caller.json";
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

Modal.setAppElement("#root");

const ResultModal = ({
  isOpen,
  onClose,
  rpcUrl,
  contractAddress,
  network,
  walletAddress,
}) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [processedRequests, setProcessedRequests] = useState(new Set());
  const [displayResult, setDisplayResult] = useState(false);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    const loadContract = async () => {
      try {
        console.log("Initializing Web3...");
        const web3 = new Web3(window.ethereum);

        const contractAdd =
          network === "FVM"
            ? "0x6Ed8401349B28DA0D5325701671b6951b397E8FC"
            : "0x1bFD12d25E35AB48AF1Ae46F5b3678c6c42F89E7";

        const contractInstance = new web3.eth.Contract(Oracle, contractAdd);
        setContract(contractInstance);
        console.log("Oracle Contract instance set.");

        // const privateKey = process.env.VITE_PRIVATE_KEY;
        const privateKey =
          "0xa6788cbcab0780795a33b8f70c16879851f7e92dae610e6cd93ce16a1788c0ac";
        console.log("Private key:", privateKey);

        // Replace with your actual private key
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        setAccount(account);
        console.log("Account set:", account);

        if (!subscriptionRef.current) {
          console.log("Setting up event listener...");

          // Introduce a short delay before setting up the event listener
          setTimeout(() => {
            const subscription = contractInstance.events
              .DataInput()
              .on("data", async (d) => {
                console.log("DataRequested event:", d);
                const { requestId, blocknumber, inputData, url } =
                  d.returnValues;
                console.log("Request ID:", requestId);
                console.log("Block number:", blocknumber);
                console.log("Input data:", inputData);
                console.log("URL:", url);

                if (processedRequests.has(requestId)) {
                  console.log("Request ID already processed:", requestId);
                  return;
                }

                setLoading(true);

                try {
                  const apiResult = "MEV";

                  console.log("Sending result to contract...");

                  const gasPrice = await web3.eth.getGasPrice();
                  const gasEstimate = await contractInstance.methods
                    .sendResult(requestId, apiResult)
                    .estimateGas({ from: account.address });

                  const tx = {
                    from: account.address,
                    to: contractAdd,
                    gas: gasEstimate,
                    gasPrice: gasPrice,
                    nonce: await web3.eth.getTransactionCount(account.address),
                    data: contractInstance.methods
                      .sendResult(requestId, apiResult)
                      .encodeABI(),
                  };

                  console.log("Transaction:", tx);
                  const signedTx = await web3.eth.accounts.signTransaction(
                    tx,
                    privateKey
                  );
                  console.log("Signed transaction:", signedTx.rawTransaction);
                  const receipt2 = await web3.eth.sendSignedTransaction(
                    signedTx.rawTransaction
                  );

                  setReceipt(receipt2);
                  console.log("Result sent to contract, receipt:", receipt2);

                  // Call the getResult function from Caller contract
                  const callerContract = new web3.eth.Contract(
                    Caller,
                    contractAddress
                  );
                  console.log("Caller contract instance set.");
                  const receivedResult = await callerContract.methods
                    .getResult(requestId)
                    .call();
                  console.log("Result from Caller contract:", receivedResult);

                  setTimeout(() => {
                    setResult(receivedResult); // Update result state with received value
                    setDisplayResult(true);
                    console.log("Result set:", receivedResult);
                  }, 3000); // 3 seconds delay

                  setProcessedRequests(
                    new Set([...processedRequests, requestId])
                  );
                } catch (error) {
                  console.error("Error in API call or contract method:", error);
                  // Ensure to unset loading state on error
                  setLoading(false);
                } finally {
                  setLoading(false);
                }
              })
              .on("error", (error) => {
                console.error("Error in event subscription:", error);
              });

            subscriptionRef.current = subscription;
            console.log("Event listener set up.");
          }, 5000); // 5 second delay
        }
      } catch (error) {
        console.error(
          "Error loading contract or setting up event listener:",
          error
        );
      }
    };

    if (isOpen) {
      loadContract();
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
        console.log("Event listener unsubscribed.");
      }
    };
  }, [rpcUrl, network, isOpen, processedRequests, contractAddress]);

  const overlayStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const onCloseModal = () => {
    onClose();
    setResult(null);
    setReceipt(null);
    setDisplayResult(false);
  };

  const contentStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    width: "58%",
    maxWidth: "80%",
    height: "70%",
    backgroundColor: "rgba(6,10,22,255)",
    border: "1px solid #fff",
    color: "#fff",
    boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.6)",
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Transaction Hash Modal"
      style={{
        overlay: overlayStyles,
        content: contentStyles,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <video autoPlay loop muted style={{ width: "40%", height: "auto" }}>
          <source src={MagLoader} type="video/mp4" />
        </video>
        {loading && (
          <p className="font-poppins font-medium text-[25px]">
            Calling the oracle...
          </p>
        )}
        {!loading && receipt && !result && (
          <p className="font-poppins font-medium text-[25px]">
            Transaction completed!
          </p>
        )}
        {!loading && receipt && displayResult && (
          <p
            className="font-poppins font-medium text-[25px]"
            style={{ color: result === "MEV" ? "red" : "green" }}
          >
            This transaction is: {result}
          </p>
        )}
        <button
          onClick={onCloseModal}
          className="py-3 px-6 bg-blue-gradient font-poppins font-medium text-[16px] text-primary outline-none rounded-[10px] mt-4"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ResultModal;
