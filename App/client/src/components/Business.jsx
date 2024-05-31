import React, { useState, useContext, useEffect } from "react";
import { WalletContext } from "./Wallet";
import styles, { layout } from "../style";
import ResultModal from "./ResultModal";
import Web3 from "web3";
import Caller from "../contracts/Caller.json";

const Business = () => {
  const { walletAddress, setWalletAddress } = useContext(WalletContext);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contract, setContract] = useState(null);
  const [network, setNetwork] = useState("Galadriel");

  const networks = {
    Galadriel: {
      rpcUrl: "https://devnet.galadriel.com",
      contractAddress: "0xa983867B114D318F3B702108847dC845A071A2c3",
    },
    FVM: {
      rpcUrl: "https://rpc.ankr.com/filecoin_testnet",
      contractAddress: "0x305dF1bFCF362C845b3935d97C980BA3C6d6bcEd",
    },
  };

  useEffect(() => {
    const loadContract = async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const { rpcUrl, contractAddress } = networks[network];
      const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(Caller, contractAddress);
      setContract(contractInstance);
    };
    loadContract();
  }, [network]);

  useEffect(() => {
    const getAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      }
    };

    getAccount();
  }, []);

  const handleNetworkChange = (e) => {
    setNetwork(e.target.value);
  };

  const handleReset = () => {
    setInputValue("");
  };

  const handleSend = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      if (!contract) {
        throw new Error("Contract is not loaded.");
      }

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        throw new Error("No MetaMask account found.");
      }

      await contract.methods
        .requestResult(inputValue1, inputValue2)
        .send({ from: account });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error handling send:", error);
      alert(error.message);
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
        <p
          className="text-gradient"
          style={{
            color: "rgba(30, 33, 57, 0.5)",
            marginBottom: "40px",
            fontSize: "30px",
          }}
        >
          Paste your transaction hash here
        </p>

        <div
          style={{
            backgroundColor: "rgba(30, 33, 57, 0.5)",
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
              "0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2), 0 0 50px rgba(255, 255, 255, 0.1)",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "50px",
            }}
          >
            <p
              className="font-poppins text-[20px]"
              style={{ marginRight: "10px" }}
            >
              Select Network:
            </p>
            <select
              value={network}
              onChange={handleNetworkChange}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#fff",
                outline: "none",
                width: "150px",
                textAlign: "center",
                fontSize: "18px",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                padding: "10px",
                borderRadius: "10px",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
              }}
            >
              <option className="font-poppins text-[20px]" value="Galadriel">
                Galadriel
              </option>
              <option className="font-poppins text-[20px]" value="FVM">
                FVM
              </option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Enter block number"
            value={inputValue1}
            onChange={(e) => setInputValue1(e.target.value)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              outline: "none",
              width: "100%",
              marginBottom: "30px",
              textAlign: "center",
              fontSize: "18px",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
              padding: "15px",
              borderRadius: "10px",
            }}
          />

          <input
            type="text"
            placeholder="Enter the transaction hash"
            value={inputValue2}
            onChange={(e) => setInputValue2(e.target.value)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              outline: "none",
              width: "100%",
              marginBottom: "30px",
              textAlign: "center",
              fontSize: "18px",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
              padding: "15px",
              borderRadius: "10px",
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
        inputValue1={inputValue1}
        inputValue2={inputValue2}
        rpcUrl={networks[network].rpcUrl}
        contractAddress={networks[network].contractAddress}
        network={network}
        walletAddress={walletAddress}
      />
    </section>
  );
};

export default Business;
