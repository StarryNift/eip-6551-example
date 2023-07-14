import hre, {ethers} from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

describe("EIP6551 example test", function () {
	let owner: SignerWithAddress;
	let addr2: SignerWithAddress;

	const networkName = hre.network.name
	const chainId = hre.network.config.chainId

	beforeEach(async function() {
		// deploy example 721 NFT
		const MockERC721 = await ethers.getContractFactory("MockERC721");
		const EntryPoint = await ethers.getContractFactory("EntryPoint");
		const AccountGuardian = await ethers.getContractFactory("AccountGuardian");
		const AccountProxy = await ethers.getContractFactory("AccountProxy");
		const Account = await ethers.getContractFactory("Account");
		const ERC6551Registry = await ethers.getContractFactory("ERC6551Registry");
		const AbiEncode = await ethers.getContractFactory("AbiEncode");

		const abiEncode = await AbiEncode.deploy()
		await abiEncode.deployed()
		this.abiEncode = abiEncode

		const dummyERC721 = await MockERC721.deploy()
		this.dummyERC721 = await dummyERC721.deployed();

		let entryPoint = await EntryPoint.deploy()
		await entryPoint.deployed()

		let guardian = await AccountGuardian.deploy()
		await guardian.deployed()

		let implementation = await Account.deploy(
			guardian.address,
			entryPoint.address,
		)
		await implementation.deployed()

		let registry = await ERC6551Registry.deploy()
		await registry.deployed()
		this.registry = registry

		let accountProxy = await AccountProxy.deploy(implementation.address)
		await accountProxy.deployed()
		this.accountProxy = accountProxy

		const signers = await ethers.getSigners();
		this.owner = signers[0];
		this.addr2 = signers[0];
		this.chainId = chainId
		this.networkName = networkName
	})

  it("Should create account with NFT success", async function () {
		const {
			owner,
			addr2,
			accountProxy,
			registry,
			dummyERC721,
			abiEncode,
		} = this

	  const tokenId = 0
	  await dummyERC721.mint(owner.address, tokenId)

	  const sig = await abiEncode.encodeWithSignature()
	  await registry.createAccount(
		  accountProxy.address,
		  chainId,
		  dummyERC721.address,
		  tokenId,
		  0,
		  sig,
	  )

	  const accountAddress = await registry.account(
		  accountProxy.address,
		  chainId,
		  dummyERC721.address,
		  tokenId,
		  0
	  )
		// expect(accountAddress).to.not.be.null;
	  const Account = await ethers.getContractFactory("Account");
	  const ca = await Account.attach(accountAddress)
	  await ca.executeCall(addr2.address, 100000, "0x");

	  const entryPoint = await ca._entryPoint()
	  
	  console.log(entryPoint)

	  // const nftOwner = await mockNFT.ownerOf(tokenId)
	  // console.log(nftOwner, owner.address)
	  //
	  // // const tbaOwner = await exampleERC6551Account.owner()
	  // // console.log(tbaOwner)
	  //
	  // const tokenInfo = await exampleERC6551Account.token()
	  // console.log(tokenInfo)

  });
});
