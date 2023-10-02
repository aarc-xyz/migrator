import { erc20ABI, erc721ABI } from "wagmi";
import { Contract, Signer, ethers } from "ethers";
import dotenv from "dotenv";
import { getBalances } from "./tokens";

dotenv.config();

const TRANSACTION_GAS_LIMIT: Number = 30000000;

async function migrate(
  signer: Signer,
  chainId: number,
  ownerAddress: string,
  safeAddress: string,
  tokenAddresses: string[]
) {
  let balances = await getBalances(chainId, ownerAddress);
  if (tokenAddresses.length === 0) {
    // Migrate all tokens
    tokenAddresses = balances.map((b) => b.tokenAddress);
  } else {
    // Only migrate specified tokens
    const selected = balances.filter((b) =>
      tokenAddresses.includes(b.tokenAddress)
    );

    if (selected.length === 0) {
      throw new Error("No matching tokens found in balances");
    }

    balances = selected;
  }

  const transfers = [];
  for (let i = 0; i < balances.length; i++) {
    const balance = balances[i];

    if (balance.supportsErc.includes("erc721")) {
      const contract = new Contract(balance.tokenAddress, erc721ABI, signer);

      const nfts = balance.nftData ?? [];

      for (let i = 0; i < nfts.length; i++) {
        transfers.push(
          contract["safeTransferFrom(address,address,uint256)"](
            ownerAddress,
            safeAddress,
            Number(nfts[i].token_id)
          )
        );
      }
    } else if (balance.supportsErc.includes("erc20")) {
      const contract = new Contract(balance.tokenAddress, erc20ABI, signer);
      transfers.push(contract.transfer(safeAddress, balance.balance), {
        gasLimit: TRANSACTION_GAS_LIMIT,
      });
    }
  }
  return Promise.all(transfers);
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://goerli.infura.io/v3/120eaf67c29b4178bb1f898409a2112b"
  // );
  // await migrateETH(provider, signer, safeAddress);
  // const remainingEth = await provider.getBalance(ownerAddress);
  // const gasLimit = 21000;
  // // const ethbalance = ethers.utils.formatEther(remainingEth);
  // const gasPrice = await provider.getGasPrice();
  // console.log(gasPrice.mul(gasLimit));
  // const ethValueToBeSent = remainingEth.sub(gasPrice.mul(gasLimit));
  // console.log(remainingEth)
  // console.log(ethValueToBeSent)
  // await signer.sendTransaction({
  //   to: safeAddress,
  //   value: ethValueToBeSent,
  //   gasLimit,
  // });
}

const maxRetries = 5;
async function migrateETH(
  provider: ethers.providers.JsonRpcProvider,
  wallet: Signer,
  recipientAddress: string
) {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      // Get the current balance of the wallet
      const walletBalance = await wallet.getBalance();

      if (walletBalance.eq(ethers.BigNumber.from(0))) {
        console.log("Wallet balance is zero. No ETH to migrate.");
        return;
      }

      // Estimate the gas limit for the transaction
      const gasLimit = await wallet.estimateGas({
        to: recipientAddress,
        value: ethers.constants.Zero, // Initialize with zero value
      });

      // Get the current gas price from the Ethereum network
      const gasPrice = await provider.getGasPrice();

      // Calculate the amount to migrate (subtract gas cost)
      const gasCost = gasLimit.mul(gasPrice);
      const amountToMigrate = walletBalance.sub(gasCost.mul(10000));
      console.log(walletBalance);
      console.log(amountToMigrate);
      // Ensure the amount to migrate is positive
      if (amountToMigrate.lte(ethers.constants.Zero)) {
        console.log(
          "Insufficient balance to cover gas costs. No ETH to migrate."
        );
        return;
      }

      // Create a transaction object with gasLimit and gasPrice
      const tx = {
        to: recipientAddress,
        value: amountToMigrate, // Migrate the calculated amount
        gasLimit: gasLimit, // Set gas limit
      };

      // Send the transaction
      const txResponse = await wallet.sendTransaction(tx);

      // Wait for the transaction to be mined
      const receipt = await txResponse.wait();

      console.log(`ETH migrated: ${amountToMigrate.toString()} Wei`);
      console.log(`Transaction hash: ${txResponse.hash}`);
      console.log(`Gas used: ${receipt.gasUsed.toString()}`);

      // Transaction succeeded, exit the loop
      break;
    } catch (error) {
      console.error(
        `Error migrating ETH (Attempt ${retryCount + 1}/${maxRetries}):`,
        error
      );

      // Increment the retry count
      retryCount++;

      if (retryCount < maxRetries) {
        console.log("Retrying in 5 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
      } else {
        console.error(
          `Max retry attempts (${maxRetries}) reached. Transaction failed.`
        );
        break;
      }
    }
  }
}

module.exports = {
  migrate,
  getBalances,
};
