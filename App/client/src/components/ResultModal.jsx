import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../ResultModal.css";
import loader from "../assets/loader.mp4";

Modal.setAppElement("#root");

const ResultModal = ({ isOpen, onClose, inputValue }) => {
  // State to hold the fetched result
  const [result, setResult] = useState(null);

  // Function to fetch result from backend
  const fetchResult = async () => {
    // Example fetch request to the backend, replace with your actual endpoint
    const response = await fetch(`your-backend-endpoint?input=${inputValue}`);
    const data = await response.json();
    setResult(data.result);
  };

  // Fetch result when the component mounts
  useEffect(() => {
    if (isOpen) {
      fetchResult();
    }
  }, [isOpen, inputValue]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Transaction Hash Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "10px", // Rounded corners to match input box
          padding: "20px",
          width: "50%", // Adjust the width as needed
          maxWidth: "1000px", // Optional: max width
          height: "70%", // Set height to auto to maintain aspect ratio
          backgroundColor: "rgba(28,30,50,255)", // Solid background color
          border: "1px solid #fff", // Same border as input box
          color: "#fff", // Text color for visibility
          opacity: "1000", // Full opacity
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between", // Add space between flex items
          height: "100%", // Ensure the container takes full height
        }}
      >
        <video autoPlay loop muted style={{ width: "40%", height: "auto" }}>
          <source src={loader} type="video/mp4" />
        </video>

        {/* Display the fetched result after "This transaction is:" */}
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
