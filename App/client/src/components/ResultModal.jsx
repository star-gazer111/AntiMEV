import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import MagLoader from "../assets/MagLoader.mp4";
import Web3 from "web3";
import Oracle from "../contracts/Oracle.json";

Modal.setAppElement("#root");

const ResultModal = ({ isOpen, onClose, inputValue }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getEvent = useCallback(async () => {
    try {
      // give option betwenn galadriel or filecoin network
      // option between rpc -> create 2 sets
      const web3 = new Web3(
        "https://polygon-amoy.g.alchemy.com/v2/sqeU7BdoNCBWEPHTgRMpC8VAWuPuh0ZS"
      );
      // galabriel network address =
      // or
      // filecoin network address =
      const contractAddress = "0x6C60b01A7C22b72ce4d6407c8169BC949EECDc1a";
      const contractInstance = new web3.eth.Contract(Oracle, contractAddress);
      const latestBlockNumber = await web3.eth.getBlockNumber();
      // const startBlock = Math.max(0, latestBlockNumber - 100); // Increased range to ensure event capture

      const events = await contractInstance.getPastEvents("DataRequested", {
        fromBlock: 0,
        toBlock: "latest",
      });
      console.log("Events:", events);

      // const events = await contractInstance.getPastEvents("ResultProcessed", {
      //   fromBlock: 0,
      //   toBlock: "latest",
      // });

      // result setting logic

      // input logs -> formatting inputs for Gnn model classification

      // user -> hash ->  contract address, to-from,

      // user -> send -> caller contract request result -> oracle contract request result ->
      // backend event listen -> GNN api -> call oracle contract send result ->
      // caller contract proceess result -> caller event listen -> frontend

      if (events && events.length > 0) {
        const lastEvent = events[events.length - 1];
        console.log("Last event:", lastEvent);
        if (lastEvent.returnValues) {
          setResult(lastEvent.returnValues[1]);
        } else {
          console.error("Event data is not as expected");
        }
      } else {
        console.error("No events found");
      }
    } catch (error) {
      console.error("Error in getEvent:", error);
    } finally {
      setLoading(false); // Set loading to false after attempting to fetch the event
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLoading(true); // Set loading to true when modal opens
      getEvent();
    } else {
      setResult(null);
      setLoading(false);
    }
  }, [isOpen, getEvent]);

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
        {loading ? (
          <p>Waiting for the result...</p>
        ) : (
          result && <p>This transaction is: {result}</p>
        )}

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
