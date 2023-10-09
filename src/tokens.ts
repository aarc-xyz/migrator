import { fetchBalances } from "./api";
import { formatBalances, TokenBalance } from "./utils";

export async function getBalances(
  chainId: number,
  address: string
): Promise<TokenBalance[]> {
  const response = await fetchBalances(chainId, address);
  return formatBalances(response);
}
