import React, { useState, useContext, useEffect } from "react";
import { WalletContext } from "./Wallet";
import { features } from "../constants";
import styles, { layout } from "../style";
import ResultModal from "./ResultModal";
import Web3 from "web3";
import Caller from "../contracts/Caller.json";
// import dotenv from "dotenv";
// dotenv.config();

const Business = () => {
  const { walletAddress } = useContext(WalletContext);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contract, setContract] = useState(null);

  // useEffect(() => {
  //   if (walletAddress) {
  //     // const web3 = new Web3(
  //     //   "https://polygon-amoy.g.alchemy.com/v2/sqeU7BdoNCBWEPHTgRMpC8VAWuPuh0ZS"
  //     // );
  //     // const contractAddress = "0x169667De2B0EbefE1Ac958FC184B3d034E034b62";
  //     // const contractInstance = new web3.eth.Contract(Caller, contractAddress);
  //     // setContract(contractInstance);
  //   }
  // }, [walletAddress]);

  const handleReset = () => {
    setInputValue("");
  };

  const getTransactionReceipt = async (data) => {
    return data;
  };

  const callContractFunction = async (receipt) => {
    console.log("Calling contract function with receipt:", receipt);
  };

  // const handleSend = async () => {
  //   try {
  //     // const receipt = await Web3.getTransactionReceipt(inputValue);
  //     // const receipt = await getTransactionReceipt(inputValue);
  //     const web3 = new Web3(
  //       "https://polygon-amoy.g.alchemy.com/v2/sqeU7BdoNCBWEPHTgRMpC8VAWuPuh0ZS"
  //     );
  //     const contractAddress = "0x169667De2B0EbefE1Ac958FC184B3d034E034b62";
  //     const contractInstance = new web3.eth.Contract(Caller, contractAddress);
  //     setContract(contractInstance);
  //     await contract.methods
  //       .requestResult(inputValue)
  //       .send({ from: walletAddress });

  //     setIsModalOpen(true);
  //   } catch (error) {
  //     console.error("Error handling send:", error);
  //   }
  // };

  const handleSend = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
      }

      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const web3 = new Web3(window.ethereum);
      const contractAddress = "0x169667De2B0EbefE1Ac958FC184B3d034E034b62";
      const contractInstance = new web3.eth.Contract(Caller, contractAddress);

      // Ensure inputValue is converted to a number or hexadecimal format as needed
      await contractInstance.methods
        .requestResult(inputValue)
        .send({ from: walletAddress });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error handling send:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="features" className={layout.section}>
      <div
        className={layout.sectionInfo}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <p style={{ color: "#fff", marginBottom: "40px", fontSize: "30px" }}>
          Paste your transaction hash here
        </p>

        <div
          style={{
            backgroundColor: "rgba(30, 33, 57, 0.5)", // Semi-transparent background
            height: "400px",
            width: "60%",
            marginBottom: "20px",
            border: "1px solid #fff",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            padding: "20px",
            boxShadow:
              "0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2), 0 0 50px rgba(255, 255, 255, 0.1)", // Scattered glow effect
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)", // Whitish gradient
          }}
        >
          <input
            type="text"
            placeholder="Enter the transaction hash"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              outline: "none",
              width: "100%",
              marginBottom: "30px",
              textAlign: "center",
              fontSize: "18px",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)", // Whitish glow
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)", // Whitish gradient
              padding: "15px", // Adjust padding as needed
              borderRadius: "10px", // Rounded corners
            }}
          />

          <div className="flex justify-center mt-12">
            <button
              className="py-3 px-6 bg-blue-gradient font-poppins font-medium text-[16px] text-primary outline-none rounded-[10px] mt-4"
              style={{ marginRight: "10px" }}
              onClick={handleSend}
            >
              Send
            </button>
            <button
              className="py-3 px-6 bg-blue-gradient font-poppins font-medium text-[16px] text-primary outline-none rounded-[10px] mt-4"
              style={{ marginLeft: "10px" }}
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <ResultModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        inputValue={inputValue}
      />
    </section>
  );
};

export default Business;
