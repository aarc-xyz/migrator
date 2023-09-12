import { ApiResponse } from "./api";

export interface TokenBalance {
  tokenAddress: string;
  tokenDecimals: number;
  tokenName: string;
  tokenSymbol: string;
  balance: string;
  supportsErc: string[];
  nftData: any;
}

export function formatBalances(response: ApiResponse): TokenBalance[] {
  return response.data.items
    .filter((item) => item.type !== "dust" && item.balance !== "0")
    .map((item) => ({
      tokenAddress: item.contract_address,
      tokenDecimals: item.contract_decimals,
      tokenName: item.contract_name,
      tokenSymbol: item.contract_ticker_symbol,
      balance: item.balance,
      supportsErc: item.supports_erc,
      nftData: item.nft_data
    })) as TokenBalance[];
}
