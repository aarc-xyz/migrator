"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBalances = void 0;
function formatBalances(response) {
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
    }));
}
exports.formatBalances = formatBalances;
