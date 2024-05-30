import { ethers } from "hardhat";

async function main() {
  const Oracle = await ethers.getContractFactory("Oracle");
  const oracleTx = await Oracle.deploy([
    "0x1FaB368B18440bCf0DD7BEE006E8885FcCE300c8",
  ]);
  await oracleTx.deployed(); // Wait for the Oracle contract to be deployed
  console.log("Oracle deployed to:", oracleTx.address);

  const Caller = await ethers.getContractFactory("Caller");
  const callerTx = await Caller.deploy(oracleTx.address); // Pass the Oracle contract address directly
  await callerTx.deployed(); // Wait for the Caller contract to be deployed
  console.log("Caller deployed to:", callerTx.address);

  await oracleTx.addToWhitelist(callerTx.address); // Use the transaction object for interactions
  console.log("Caller added to whitelist");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
