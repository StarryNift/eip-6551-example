# eip-6551-example
EIP-6551 https://eips.ethereum.org/EIPS/eip-6551#counterfactual-account-addresses
## 合约设计
基于 EIP-4337 的基础，实现 EIP-6551 接口，支持基于 ERC721 token 进行合约账户创建及绑定，计算账户地址、查询 nonce、支持合约账户的授权、转账、执行合约等操作。
### 合约接口
#### IERC6551AccountProxy
```js
function implementation() external view returns (address);
```
#### IAccountGuardian
```js
event TransactionExecuted(address indexed target, uint256 indexed value, bytes data);
receive() external payable;
function setTrustedImplementation(address implementation, bool trusted) external;
function setTrustedExecutor(address executor, bool trusted) external;
function defaultImplementation() external view returns (address);
function isTrustedImplementation(address implementation) external view returns (bool);
function isTrustedExecutor(address implementation) external view returns (bool);
```

#### IERC6551Account
```js
function executeCall(address to, uint256 value, bytes calldata data) external payable returns (bytes memory);
function token()external view returns (uint256 chainId, address tokenContract, uint256 tokenId);
function owner() external view returns (address);
function nonce() external view returns (uint256);
```

## Advanced Sample Hardhat Project
```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

## Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

## Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
