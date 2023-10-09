import { SafeAccountConfig, SafeFactory } from "@safe-global/protocol-kit";
import { EthersAdapter } from "@safe-global/protocol-kit";
import { ethers } from "ethers";

// This file can be used to play around with the Safe Core SDK
const RPC_URL = "https://goerli.infura.io/v3/120eaf67c29b4178bb1f898409a2112b";

interface Config {
  RPC_URL: string;
  DEPLOYER_ADDRESS_PRIVATE_KEY: string;
  DEPLOY_SAFE: {
    OWNERS: string[];
    THRESHOLD: number;
    SALT_NONCE: string;
  };
}

const config: Config = {
  RPC_URL: RPC_URL,
  DEPLOYER_ADDRESS_PRIVATE_KEY: "935c99e14fb83d8f2cc6c24bb403a7d2b819a2b8a2ad49bec9b91708bd2a16bf",
  DEPLOY_SAFE: {
    OWNERS: ["0xc5d15056df341b47c3142efd5c0268ad3003c12c"],
    THRESHOLD: 1, // <SAFE_THRESHOLD>
    SALT_NONCE: "0",
  },
};

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(config.RPC_URL);
  const deployerSigner = new ethers.Wallet(
    config.DEPLOYER_ADDRESS_PRIVATE_KEY,
    provider
  );

  // Create EthAdapter instance
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: deployerSigner,
  });

  // Create SafeFactory instance
  const safeFactory = await SafeFactory.create({ ethAdapter });

  // Config of the deployed Safe
  const safeAccountConfig: SafeAccountConfig = {
    owners: config.DEPLOY_SAFE.OWNERS,
    threshold: config.DEPLOY_SAFE.THRESHOLD,
  };
  
  const saltNonce = config.DEPLOY_SAFE.SALT_NONCE;

  // Predict deployed address
  const predictedDeploySafeAddress = await safeFactory.predictSafeAddress(
    safeAccountConfig,
    saltNonce
  );

  console.log("Predicted deployed Safe address:", predictedDeploySafeAddress);

  function callback(txHash: string) {
    console.log("Transaction hash:", txHash);
  }

  // Deploy Safe
  const safe = await safeFactory.deploySafe({
    safeAccountConfig,
    saltNonce,
    callback,
  });

  console.log("Deployed Safe:", safe.getAddress());
}

main();
