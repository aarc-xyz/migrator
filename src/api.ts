import axios from 'axios';

const API_URL: string = "https://api.covalenthq.com/v1";
const API_KEY: string = "cqt_rQMjXBCXHkFgyGCrB3rxHChvx4wM";

interface ApiParams {
  key: string;
  'quote-currency': string;
  format: string;
  nft: boolean;
  'no-nft-fetch': boolean;
}

export interface ApiResponse {
  data: {
    address: string;
    updated_at: string;
    next_update_at: string;
    quote_currency: string;
    chain_id: number;
    items: {
      contract_decimals: number;
      contract_name: string;
      contract_ticker_symbol: string;
      contract_address: string;
      supports_erc: string[];
      logo_url: string;
      last_transferred_at: string;
      native_token: boolean;
      type: string;
      balance: string;
      balance_24h: string;
      quote_rate: number;
      quote_rate_24h: number | null;
      quote: number;
      quote_24h: number | null;
      nft_data: null;
    }[];
  };
}

const API_PARAMS: ApiParams = {
  key: API_KEY,
  'quote-currency': "USD",
  format: "JSON",
  nft: true,
  "no-nft-fetch": true,
};

export async function fetchBalances(
  chainId: number,
  address: string
): Promise<ApiResponse> {
  const url = `${API_URL}/${chainId}/address/${address}/balances_v2/`;

  const { data } = await axios.get(url, { params: API_PARAMS });

  return data;
}
