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
exports.fetchBalances = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = "https://api.covalenthq.com/v1";
const API_KEY = "cqt_rQMjXBCXHkFgyGCrB3rxHChvx4wM";
const API_PARAMS = {
    key: API_KEY,
    'quote-currency': "USD",
    format: "JSON",
    nft: true,
    "no-nft-fetch": true,
};
function fetchBalances(chainId, address) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${API_URL}/${chainId}/address/${address}/balances_v2/`;
        const { data } = yield axios_1.default.get(url, { params: API_PARAMS });
        return data;
    });
}
exports.fetchBalances = fetchBalances;
