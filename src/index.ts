import { erc20ABI } from "wagmi";
import { ethers } from "ethers";
import { fetchTokens } from "./fetch-tokens";

import dotenv from "dotenv";

dotenv.config();

async function migrate(
  signer: any,
  chainId: number,
  ownerAddress: string,
  safeAddress: string,
  tokenAddresses: string[]
) {

  let balances = await fetchTokens(chainId, ownerAddress);
  if (tokenAddresses.length === 0) {
    // Migrate all tokens
    tokenAddresses = balances.map(b => b.tokenAddress)

  } else {
    // Only migrate specified tokens
    const selected = balances.filter(b => 
      tokenAddresses.includes(b.tokenAddress)
    )

    if (selected.length === 0) {
      throw new Error('No matching tokens found in balances')
    }

    balances = selected
  }

  const transfers = balances.map(async balance => {
    const contract = new ethers.Contract(balance.tokenAddress, erc20ABI, signer)
    return contract.transfer(safeAddress, balance.balance)
  })

  await Promise.all(transfers)
}

module.exports = {
  migrate,
};
