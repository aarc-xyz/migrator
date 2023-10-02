"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protocol_kit_1 = require("@safe-global/protocol-kit");
const protocol_kit_2 = require("@safe-global/protocol-kit");
const ethers_1 = require("ethers");
// This file can be used to play around with the Safe Core SDK
const RPC_URL = "https://goerli.infura.io/v3/120eaf67c29b4178bb1f898409a2112b";
const config = {
    RPC_URL: RPC_URL,
    DEPLOYER_ADDRESS_PRIVATE_KEY: "935c99e14fb83d8f2cc6c24bb403a7d2b819a2b8a2ad49bec9b91708bd2a16bf",
    DEPLOY_SAFE: {
        OWNERS: ["0xc5d15056df341b47c3142efd5c0268ad3003c12c"],
        THRESHOLD: 1,
        SALT_NONCE: "0",
    },
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(config.RPC_URL);
        const deployerSigner = new ethers_1.ethers.Wallet(config.DEPLOYER_ADDRESS_PRIVATE_KEY, provider);
        // Create EthAdapter instance
        const ethAdapter = new protocol_kit_2.EthersAdapter({
            ethers: ethers_1.ethers,
            signerOrProvider: deployerSigner,
        });
        // Create SafeFactory instance
        const safeFactory = yield protocol_kit_1.SafeFactory.create({ ethAdapter });
        // Config of the deployed Safe
        const safeAccountConfig = {
            owners: config.DEPLOY_SAFE.OWNERS,
            threshold: config.DEPLOY_SAFE.THRESHOLD,
        };
        const saltNonce = config.DEPLOY_SAFE.SALT_NONCE;
        // Predict deployed address
        const predictedDeploySafeAddress = yield safeFactory.predictSafeAddress(safeAccountConfig, saltNonce);
        console.log("Predicted deployed Safe address:", predictedDeploySafeAddress);
        function callback(txHash) {
            console.log("Transaction hash:", txHash);
        }
        // Deploy Safe
        const safe = yield safeFactory.deploySafe({
            safeAccountConfig,
            saltNonce,
            callback,
        });
        console.log("Deployed Safe:", safe.getAddress());
    });
}
main();
