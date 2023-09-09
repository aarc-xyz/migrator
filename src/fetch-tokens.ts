import { TokenBalance } from "./types/tokens";
import axios from "axios";

export const fetchTokens = async (
  chainID: number, EOAAddress: string
  ): Promise< TokenBalance[] > =>  {

    const tokenBalances: TokenBalance[] = [];  
    try{
      const request = axios.get(
        `https://api.covalenthq.com/v1/${chainID}/address/${EOAAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=${process.env.COVALENT_KEY}`,
      )
      const response = await Promise.resolve(request);
      console.log(response.data.data.items);
      if (response.data?.data?.items && response.data.data.items.length >0){
        const data = response.data.data.items;
        data.forEach((item: { contract_address: any; contract_decimals: any; contract_name: any; contract_ticker_symbol: any; balance: any; type: any; }) => {
          if (item.type != "dust" && item.balance != 0 && (item.type === 'cryptocurrency' || item.type === 'stablecoin')){
            tokenBalances.push({
              "tokenAddress": item.contract_address,
              "tokenDecimals": item.contract_decimals,
              "tokenName": item.contract_name,
              "tokenSymbol": item.contract_ticker_symbol,
              "balance": item.balance
            }
            )
          }
        })
      }
    } catch(error) {
      console.log("Error in fetching the balance of the tokens");
    }

  return tokenBalances
};

export type Tokens = ReadonlyArray<{
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  supports_erc: ['erc20'];
  logo_url: string;
  last_transferred_at: string;
  native_token: false;
  type: string;
  balance: string;
  balance_24h: string;
  quote_rate: number;
  quote_rate_24h: number;
  quote: number;
  quote_24h: number;
  nft_data: null;
}>;

interface APIResponse {
  data: {
    address: '0xc0deaf6bd3f0c6574a6a625ef2f22f62a5150eab';
    updated_at: '2022-08-21T09:33:36.047609504Z';
    next_update_at: '2022-08-21T09:38:36.047609555Z';
    quote_currency: 'USD';
    chain_id: 1;
    items: [
      {
        contract_decimals: 18;
        contract_name: 'Up1.org';
        contract_ticker_symbol: 'Up1.org';
        contract_address: '0xf9d25eb4c75ed744596392cf89074afaa43614a8';
        supports_erc: ['erc20'];
        logo_url: 'https://logos.covalenthq.com/tokens/1/0xf9d25eb4c75ed744596392cf89074afaa43614a8.png';
        last_transferred_at: '2021-12-19T16:37:14Z';
        native_token: false;
        type: 'cryptocurrency';
        balance: '113054000000000000000000';
        balance_24h: '113054000000000000000000';
        quote_rate: 0.45499358;
        quote_rate_24h: null;
        quote: 51438.844;
        quote_24h: null;
        nft_data: null;
      },
    ]
  }
}
