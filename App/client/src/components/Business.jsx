import React, { useState } from "react";
import { features } from "../constants";
import styles, { layout } from "../style";
import ResultModal from "./ResultModal";

const Business = () => {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = () => {
    setInputValue("");
  };

  const handleSend = () => {
    setIsModalOpen(true);
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
          alignItems: "center", // Centering items horizontally
          marginTop: "100px",
        }}
      >
        {/* Text Above the Box */}
        <p style={{ color: "#fff", marginBottom: "40px", fontSize: "25px" }}>
          Paste your transaction hash here
        </p>

        {/* Input Box with Buttons Inside */}
        <div
          style={{
            backgroundColor: "rgba(30, 33, 57, 0.5)", // Translucent background
            height: "300px", // Increased height
            width: "50%", // Half of the screen width
            marginBottom: "20px",
            border: "1px solid #fff", // White border for visibility
            borderRadius: "10px", // Rounded border
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff", // Text color for visibility
            padding: "20px", // Padding inside the box
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
            }}
          />

          <div className="flex justify-center mt-12">
            <button
              className="py-3 px-6 bg-blue-gradient font-poppins font-medium text-[16px] text-primary outline-none rounded-[10px]"
              style={{ marginRight: "10px" }}
              onClick={handleSend}
            >
              Send
            </button>
            <button
              className="py-3 px-6 bg-blue-gradient font-poppins font-medium text-[16px] text-primary outline-none rounded-[10px]"
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
