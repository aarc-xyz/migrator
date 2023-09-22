import { erc20ABI, erc721ABI } from "wagmi";
import { Contract } from "ethers";
import dotenv from "dotenv";
import { getBalances } from "./tokens";

dotenv.config();

const TRANSACTION_GAS_LIMIT: Number = 100000;

async function migrate(
  signer: any,
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
            Number(nfts[i].token_id),
          )
        );
      }
    } else if (balance.supportsErc.includes("erc20")) {
      const contract = new Contract(balance.tokenAddress, erc20ABI, signer);
      transfers.push(
        contract.transfer(safeAddress, balance.balance, {
          gasLimit: TRANSACTION_GAS_LIMIT,
        })
      );
    }
  }
  await Promise.all(transfers);
}

module.exports = {
  migrate,
  getBalances
};
