import React from "react";
import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] 
  ${index !== features.length - 1 ? "mb-6" : "mb-0"} 
  feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
    >
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => {
  return (
    <section id="features" className={layout.section}>
      <div
        className={layout.sectionInfo}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Align box to the left
        }}
      >
        {/* Text Above the Box */}
        <p style={{ color: "#fff", marginBottom: "10px" }}>
          Paste your transaction hash here
        </p>

        {/* Input Box with Buttons Inside */}
        <div
          style={{
            backgroundColor: "rgba(30, 33, 57, 0.5)", // Translucent background
            height: "250px", // Increased height
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
            placeholder="Enter text here"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              outline: "none",
              width: "100%",
              marginBottom: "10px",
            }}
          />

          <div className="flex justify-center">
            <button
              className="py-3 px-6 bg-blue-gradient font-poppins
      font-medium text-[16px]
    text-primary outline-none rounded-[10px]"
              style={{ marginRight: "10px" }}
            >
              Send
            </button>
            <button
              className="py-3 px-6 bg-blue-gradient font-poppins
      font-medium text-[16px]
    text-primary outline-none rounded-[10px]"
              style={{ marginLeft: "10px" }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Business;
