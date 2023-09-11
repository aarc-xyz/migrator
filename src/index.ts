import { erc20ABI, useSigner } from "wagmi";
import { ethers } from "ethers";
import { TransferPending } from "./types/transfer-success";
import { fetchTokens } from "./fetch-tokens";

import dotenv from "dotenv";

dotenv.config();

async function migrate(
  signer: any,
  chainID: number,
  RPC_URL: string,
  EOAAddress: string,
  SAFEAddress: string,
  tokenAddresses: string[]
) {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const tokenBalances = await fetchTokens(chainID, EOAAddress);
  // const { data: signer } = useSigner();
  console.log(tokenBalances);
  if (tokenAddresses.length == 0) {
    tokenBalances.forEach(async (token) => {
      const erc20Contract = new ethers.Contract(
        token.tokenAddress,
        erc20ABI,
        signer as ethers.Signer
      );

      const transferFunction = erc20Contract.transfer as (
        destinationAddress: string,
        balance: string
      ) => Promise<TransferPending>;

      await transferFunction(SAFEAddress, token.balance);
    });
  }
}

module.exports = {
  migrate,
};

// migrate(
//   5,
//   process.env.RPC_URL || " ",
//   "0x6Ed66a9F6a2885f2E807ce36358819F54Ef43c90",
//   "0xFE9F5c37D394aDa800d6B76222C871aCbdA3d660",
//   []
// );
