import { useState, useEffect, useContext } from "react";
import Button from "./Button";
import { close, mevspyLogo, menu } from "../assets";
import { navLinks } from "../constants";
import { WalletContext } from "./Wallet";
import "../style";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const { walletAddress, connectWallet } = useContext(WalletContext);

  // useEffect(() => {
  //   getCurrentWalletConnected();
  //   addWalletListener();
  // }, []);

  // const connectWallet = async () => {
  //   console.log("connect wallet");
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     try {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       setWalletAddress(accounts[0]);
  //       console.log(accounts[0]);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   } else {
  //     console.log("Please install MetaMask");
  //   }
  // };

  // const getCurrentWalletConnected = async () => {
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     try {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_accounts",
  //       });
  //       if (accounts.length > 0) {
  //         setWalletAddress(accounts[0]);
  //         console.log(accounts[0]);
  //       } else {
  //         console.log("Connect to MetaMask using the Connect button");
  //       }
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   } else {
  //     console.log("Please install MetaMask");
  //   }
  // };

  // const addWalletListener = () => {
  //   if (
  //     typeof window !== "undefined" &&
  //     typeof window.ethereum !== "undefined"
  //   ) {
  //     window.ethereum.on("accountsChanged", (accounts) => {
  //       setWalletAddress(accounts[0]);
  //       console.log(accounts[0]);
  //     });
  //   } else {
  //     console.log("Please install MetaMask");
  //   }
  // };

  return (
    <nav className="fixed top-0 left-0 w-full flex py-3 px-3 justify-between items-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <img src={mevspyLogo} alt="antiMEV" className="w-[145px] h-[50px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <div className="ml-7">
        <button
          onClick={connectWallet}
          className="ml-3px py-2 px-6 bg-blue-gradient font-poppins
      font-medium text-[14px]
    text-primary outline-none rounded-[10px]"
          style={{ width: "200px" }} // Added inline style for specific width
        >
          <span className="is-link has-text-weight-bold">
            {walletAddress && walletAddress.length > 0 ? (
              <>
                User
                <span
                  style={{ marginLeft: "10px" }}
                >{`${walletAddress.substring(0, 6)}...${walletAddress.substring(
                  38
                )}`}</span>
              </>
            ) : (
              "Connect Wallet"
            )}
          </span>
        </button>
      </div>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black bg-opacity-90 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
