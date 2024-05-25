import React from "react";

const Button = ({ styles }) => {
  return (
    <button
      type="button"
      className={`ml-3px py-2 px-3 bg-blue-gradient font-poppins
    font-medium text-[14px]
  text-primary outline-none ${styles} rounded-[10px]`}
    >
      {/* we can use our prop here */}
      Connect Wallet
    </button>
  );
};

export default Button;
