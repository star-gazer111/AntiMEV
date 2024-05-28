import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import loader from "../assets/loader.mp4";
import MagLoader from "../assets/MagLoader.mp4";
import Web3 from "web3";
import Oracle from "../contracts/Oracle.json";

Modal.setAppElement("#root");

const ResultModal = ({ isOpen, onClose, inputValue }) => {
  const [result, setResult] = useState(null);

  const getEvent = async () => {
    try {
      const web3 = new Web3("http://localhost:8545");
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractInstance = new web3.eth.Contract(Oracle, contractAddress);
      const latestBlockNumber = await web3.eth.getBlockNumber();
      const startBlock = Math.max(0, latestBlockNumber - 4);

      contractInstance.events.ResultProcessed(
        {
          filter: {},
          fromBlock: startBlock,
        },
        function (error, event) {
          if (error) {
            console.error("Error in event handler:", error);
          } else {
            console.log("Event:", event);
            if (event.returnValues && event.returnValues.length >= 2) {
              setResult(event.returnValues[1]);
            } else {
              console.error("Event data is not as expected");
            }
          }
        }
      );
    } catch (error) {
      console.error("Error in getEvent:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getEvent();
    }
  }, [isOpen, inputValue]);

  const overlayStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
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
    boxShadow: "0 0 20px 10px rgba(255, 255, 255, 0.6)", // Whitish glow
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
        {!result && <p>Waiting for the result...</p>}
        {result && <p>This transaction is: {result}</p>}

        <button
          onClick={onClose}
          className="py-3 px-6 bg-blue-gradient font-poppins font-medium text-[16px] text-primary outline-none rounded-[10px] mt-4"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ResultModal;
