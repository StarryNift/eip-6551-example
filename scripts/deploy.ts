import { ethers } from "hardhat";

async function main() {
	const ExampleERC6551Account = await ethers.getContractFactory("ExampleERC6551Account");
	const exampleERC6551Account = await ExampleERC6551Account.deploy();

	const ERC6551Registry = await ethers.getContractFactory("ERC6551Registry");
	const erc6551Registry = await ERC6551Registry.deploy();

	const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
	const simpleNFT = await SimpleNFT.deploy();

	await exampleERC6551Account.deployed();
	await erc6551Registry.deployed();
	await simpleNFT.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
