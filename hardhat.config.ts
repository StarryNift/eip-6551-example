import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const accounts = [
	process.env.PRIVATE_KEY1 || "",
	process.env.PRIVATE_KEY2 || "",
	process.env.PRIVATE_KEY3 || "",
	process.env.PRIVATE_KEY4 || "",
	process.env.PRIVATE_KEY5 || ""
];

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
	  version: "0.8.13",
	  settings: {
		  optimizer: {
			  enabled: true,
			  runs: 1000,
		  },
	  },
  },
	defaultNetwork: "ganache",
  networks: {
	  hardhat: {
		  gasPrice: "auto",
		  gas: "auto",
		  chainId: 12345,
		  blockGasLimit: 0x1fffffffffffff,
		  allowUnlimitedContractSize: true,
	  },
	  ganache: {
		  url: "http://127.0.0.1:7545",
		  accounts,
		  chainId: 1337,
		  blockGasLimit: 0x1fffffffffffff,
		  allowUnlimitedContractSize: true,
	  },
	  bscTest: {
		  url: process.env.BSCTEST_URL || "",
		  accounts,
		  chainId: 97
	  },
	  bscMain: {
		  url: process.env.BSC_URL || "",
		  accounts,
		  chainId: 56
	  }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
