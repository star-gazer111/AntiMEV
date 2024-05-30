import { HardhatUserConfig } from "hardhat/config";
// import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
// require("@nomiclabs/hardhat-etherscan");
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  gasReporter: {
    enabled: true,
    currency: "CHF",
    gasPrice: 21,
  },
  solidity: {
    version: "0.8.25", // Specify your Solidity version here
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    galadriel_testnet: {
      chainId: 696969,
      url: "https://devnet.galadriel.com",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    fvm_testnet: {
      chainId: 314159,
      url: "https://rpc.ankr.com/filecoin_testnet",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gas: "auto",
      gasPrice: "auto",
    },
    amoy: {
      chainId: 80002,
      url: "https://polygon-amoy.g.alchemy.com/v2/sqeU7BdoNCBWEPHTgRMpC8VAWuPuh0ZS",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gas: "auto",
      gasPrice: "auto",
    },
  },
  etherscan: {
    apiKey: "CASCHAC8CG63GI93XQK53SZ3SVX8X6JK44",
  },
};

export default config;
