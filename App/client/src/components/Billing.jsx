import React from "react";

import { apple, bill, google } from "../assets";
import styles, { layout } from "../style";

const Billing = () => {
  const handleSend = async () => {};

  return (
    <section
      id="clients"
      className={layout.sectionReverse}
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "500px",
        marginBottom: "300px", // Center content vertically
      }}
    >
      <h2 className="flex-1 font-poppins font-semibold ss:text-[52px] text-[52px] text-white ss:leading-[52px] leading-[55px] mb-10 mt-20">
        <span className="text-gradient mt-10">Client Dashboard</span>{" "}
      </h2>

      <div
        style={{
          backgroundColor: "rgba(30, 33, 57, 0.5)", // Semi-transparent background
          height: "400px",
          width: "60%",
          marginBottom: "20px",
          border: "1px solid #fff",
          borderRadius: "10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          color: "#fff",
          padding: "20px",
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2), 0 0 50px rgba(255, 255, 255, 0.1)", // Scattered glow effect
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)", // Whitish gradient
        }}
      >
        <div className="mt-10 justify-center">
          <p className="text-gradient font-poppins font-semibold ss:text-[32px] text-[32px] text-white ss:leading-[32px] leading-[35px] mb-10">
            ArbiNet
          </p>
          <p className="font-poppins text-[20px]">Current Accuracy: 91.4%</p>
          <p className="font-poppins text-[20px]">
            {/* <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "green",
                marginRight: "5px",
              }}
            ></span>{" "} */}
            {/* Green circle */}
            Status: <span style={{ color: "green" }}>Working</span>{" "}
            {/* Green color for status */}
          </p>
        </div>
        <div className="mt-20">
          <p className="mt-5 font-poppins text-[20px]">Layers: 7</p>
          <p className="font-poppins text-[20px]">
            Activation Function: Sigmoid
          </p>
          <p className="font-poppins text-[20px]">Time elapsed: undefined</p>
        </div>
        <div
          className="flex justify-center mt-12"
          style={{ gridColumn: "span 2" }}
        >
          <div className="flex justify-center mt-1">
            <button
              className="py-2 px-5 bg-blue-gradient font-poppins font-medium text-[16px] text-primary outline-none rounded-[10px] mt-4 mb-2"
              style={{ marginRight: "10px" }}
              onClick={handleSend}
            >
              Download Model
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Billing;
