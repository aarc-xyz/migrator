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
exports.fetchTokens = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchTokens = (chainID, EOAAddress) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const tokenBalances = [];
    try {
        const request = axios_1.default.get(`https://api.covalenthq.com/v1/${chainID}/address/${EOAAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=cqt_rQMjXBCXHkFgyGCrB3rxHChvx4wM`);
        const response = yield Promise.resolve(request);
        console.log(response.data.data.items);
        if (((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.items) && response.data.data.items.length > 0) {
            const data = response.data.data.items;
            data.forEach((item) => {
                if (item.type != "dust" && item.balance != 0 && (item.type === 'cryptocurrency' || item.type === 'stablecoin')) {
                    tokenBalances.push({
                        "tokenAddress": item.contract_address,
                        "tokenDecimals": item.contract_decimals,
                        "tokenName": item.contract_name,
                        "tokenSymbol": item.contract_ticker_symbol,
                        "balance": item.balance
                    });
                }
            });
        }
    }
    catch (error) {
        console.log("Error in fetching the balance of the tokens");
    }
    return tokenBalances;
});
exports.fetchTokens = fetchTokens;
