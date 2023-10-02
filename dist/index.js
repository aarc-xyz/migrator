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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wagmi_1 = require("wagmi");
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
const tokens_1 = require("./tokens");
dotenv_1.default.config();
const TRANSACTION_GAS_LIMIT = 30000000;
function migrate(signer, chainId, ownerAddress, safeAddress, tokenAddresses) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let balances = yield (0, tokens_1.getBalances)(chainId, ownerAddress);
        if (tokenAddresses.length === 0) {
            // Migrate all tokens
            tokenAddresses = balances.map((b) => b.tokenAddress);
        }
        else {
            // Only migrate specified tokens
            const selected = balances.filter((b) => tokenAddresses.includes(b.tokenAddress));
            if (selected.length === 0) {
                throw new Error("No matching tokens found in balances");
            }
            balances = selected;
        }
        const transfers = [];
        for (let i = 0; i < balances.length; i++) {
            const balance = balances[i];
            if (balance.supportsErc.includes("erc721")) {
                const contract = new ethers_1.Contract(balance.tokenAddress, wagmi_1.erc721ABI, signer);
                const nfts = (_a = balance.nftData) !== null && _a !== void 0 ? _a : [];
                for (let i = 0; i < nfts.length; i++) {
                    transfers.push(contract["safeTransferFrom(address,address,uint256)"](ownerAddress, safeAddress, Number(nfts[i].token_id)));
                }
            }
            else if (balance.supportsErc.includes("erc20")) {
                const contract = new ethers_1.Contract(balance.tokenAddress, wagmi_1.erc20ABI, signer);
                transfers.push(contract.transfer(safeAddress, balance.balance), {
                    gasLimit: TRANSACTION_GAS_LIMIT,
                });
            }
        }
        return Promise.all(transfers);
    });
}
const maxRetries = 5;
function migrateETH(provider, wallet, recipientAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        let retryCount = 0;
        while (retryCount < maxRetries) {
            try {
                // Get the current balance of the wallet
                const walletBalance = yield wallet.getBalance();
                if (walletBalance.eq(ethers_1.ethers.BigNumber.from(0))) {
                    console.log("Wallet balance is zero. No ETH to migrate.");
                    return;
                }
                // Estimate the gas limit for the transaction
                const gasLimit = yield wallet.estimateGas({
                    to: recipientAddress,
                    value: ethers_1.ethers.constants.Zero, // Initialize with zero value
                });
                // Get the current gas price from the Ethereum network
                const gasPrice = yield provider.getGasPrice();
                // Calculate the amount to migrate (subtract gas cost)
                const gasCost = gasLimit.mul(gasPrice);
                const amountToMigrate = walletBalance.sub(gasCost.mul(10000));
                console.log(walletBalance);
                console.log(amountToMigrate);
                // Ensure the amount to migrate is positive
                if (amountToMigrate.lte(ethers_1.ethers.constants.Zero)) {
                    console.log("Insufficient balance to cover gas costs. No ETH to migrate.");
                    return;
                }
                // Create a transaction object with gasLimit and gasPrice
                const tx = {
                    to: recipientAddress,
                    value: amountToMigrate,
                    gasLimit: gasLimit, // Set gas limit
                };
                // Send the transaction
                const txResponse = yield wallet.sendTransaction(tx);
                // Wait for the transaction to be mined
                const receipt = yield txResponse.wait();
                console.log(`ETH migrated: ${amountToMigrate.toString()} Wei`);
                console.log(`Transaction hash: ${txResponse.hash}`);
                console.log(`Gas used: ${receipt.gasUsed.toString()}`);
                // Transaction succeeded, exit the loop
                break;
            }
            catch (error) {
                console.error(`Error migrating ETH (Attempt ${retryCount + 1}/${maxRetries}):`, error);
                // Increment the retry count
                retryCount++;
                if (retryCount < maxRetries) {
                    console.log("Retrying in 5 seconds...");
                    yield new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
                }
                else {
                    console.error(`Max retry attempts (${maxRetries}) reached. Transaction failed.`);
                    break;
                }
            }
        }
    });
}
module.exports = {
    migrate,
    getBalances: tokens_1.getBalances,
};
