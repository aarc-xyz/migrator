"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const protocol_kit_1 = __importStar(require("@safe-global/protocol-kit"));
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    RPC_URL: process.env.RPC_URL,
    PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
};
function multiSendLottery() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(config.RPC_URL);
        console.log(config.RPC_URL);
        const wallet = new ethers_1.ethers.Wallet(config.PRIVATE_KEY, provider);
        const ethAdapter = new protocol_kit_1.EthersAdapter({
            ethers: ethers_1.ethers,
            signerOrProvider: wallet,
        });
        const safeAddress = process.env.SAFE_ADDRESS;
        const predictionPoolAddress = process.env.PREDICTION_POOL_ADDRESS;
        const tokenAddress = process.env.TOKEN_ADDRESS;
        const safeSdk = yield protocol_kit_1.default.create({ ethAdapter, safeAddress });
        //   const approveAmount = ethers.utils.parseUnits("1", "");
        const tokenABI = [
            { inputs: [], stateMutability: "nonpayable", type: "constructor" },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "owner",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "spender",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                    },
                ],
                name: "Approval",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                ],
                name: "Paused",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "bytes32",
                        name: "role",
                        type: "bytes32",
                    },
                    {
                        indexed: true,
                        internalType: "bytes32",
                        name: "previousAdminRole",
                        type: "bytes32",
                    },
                    {
                        indexed: true,
                        internalType: "bytes32",
                        name: "newAdminRole",
                        type: "bytes32",
                    },
                ],
                name: "RoleAdminChanged",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "bytes32",
                        name: "role",
                        type: "bytes32",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "sender",
                        type: "address",
                    },
                ],
                name: "RoleGranted",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "bytes32",
                        name: "role",
                        type: "bytes32",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "sender",
                        type: "address",
                    },
                ],
                name: "RoleRevoked",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    { indexed: true, internalType: "address", name: "to", type: "address" },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                    },
                ],
                name: "Transfer",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                ],
                name: "Unpaused",
                type: "event",
            },
            {
                inputs: [],
                name: "DEFAULT_ADMIN_ROLE",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "MINTER_ROLE",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "TRANSFER_ROLE",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "owner", type: "address" },
                    { internalType: "address", name: "spender", type: "address" },
                ],
                name: "allowance",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [{ internalType: "address", name: "_address", type: "address" }],
                name: "allowedToDrip",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "spender", type: "address" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "approve",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "address", name: "account", type: "address" }],
                name: "balanceOf",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
                name: "burn",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "account", type: "address" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "burnFrom",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "decimals",
                outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
                stateMutability: "pure",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "spender", type: "address" },
                    { internalType: "uint256", name: "subtractedValue", type: "uint256" },
                ],
                name: "decreaseAllowance",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "dripAmount",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "faucetDrip",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
                name: "getRoleAdmin",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [{ internalType: "address", name: "_minter", type: "address" }],
                name: "grantMinterRole",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "role", type: "bytes32" },
                    { internalType: "address", name: "account", type: "address" },
                ],
                name: "grantRole",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "_transferer", type: "address" },
                ],
                name: "grantTransferRole",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "role", type: "bytes32" },
                    { internalType: "address", name: "account", type: "address" },
                ],
                name: "hasRole",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "spender", type: "address" },
                    { internalType: "uint256", name: "addedValue", type: "uint256" },
                ],
                name: "increaseAllowance",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "_to", type: "address" },
                    { internalType: "uint256", name: "_amount", type: "uint256" },
                ],
                name: "mint",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "name",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "pause",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "paused",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "role", type: "bytes32" },
                    { internalType: "address", name: "account", type: "address" },
                ],
                name: "renounceRole",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "address", name: "_minter", type: "address" }],
                name: "revokeMinterRole",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "role", type: "bytes32" },
                    { internalType: "address", name: "account", type: "address" },
                ],
                name: "revokeRole",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "_transferer", type: "address" },
                ],
                name: "revokeTransferRole",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256", name: "_dripAmount", type: "uint256" },
                ],
                name: "setDripAmount",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "uint256", name: "_waitTime", type: "uint256" }],
                name: "setWaitTime",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
                name: "supportsInterface",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "symbol",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "totalSupply",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "transfer",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "from", type: "address" },
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "transferFrom",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "unpause",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "waitTime",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
        ];
        const predictionPoolABI = [
            {
                inputs: [
                    {
                        internalType: "contract IPriceFeed",
                        name: "priceFeed",
                        type: "address",
                    },
                    { internalType: "uint256", name: "feeRate", type: "uint256" },
                    { internalType: "address", name: "admin", type: "address" },
                    { internalType: "string", name: "tokenURI", type: "string" },
                    { internalType: "address", name: "trustedForwarder", type: "address" },
                ],
                stateMutability: "nonpayable",
                type: "constructor",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "lotteryId",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "AddProceeds",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "operator",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "bool",
                        name: "approved",
                        type: "bool",
                    },
                ],
                name: "ApprovalForAll",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "lotteryId",
                        type: "uint256",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "buyer",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "bucketLowerBound",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "ticketsBought",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "ticketsCost",
                        type: "uint256",
                    },
                ],
                name: "BoughtTickets",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "uint256[]",
                        name: "lotteryIds",
                        type: "uint256[]",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "claimer",
                        type: "address",
                    },
                ],
                name: "Claimed",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "newFeeRate",
                        type: "uint256",
                    },
                ],
                name: "FeeRateChanged",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                name: "FeeWithdrawn",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "lotteryId",
                        type: "uint256",
                    },
                    {
                        components: [
                            { internalType: "string", name: "token", type: "string" },
                            { internalType: "uint256", name: "bucketSize", type: "uint256" },
                            { internalType: "uint256", name: "openTimestamp", type: "uint256" },
                            {
                                internalType: "uint256",
                                name: "closeTimestamp",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "maturityTimestamp",
                                type: "uint256",
                            },
                            {
                                internalType: "contract IERC20",
                                name: "collateralToken",
                                type: "address",
                            },
                        ],
                        indexed: false,
                        internalType: "struct LotteryParams",
                        name: "params",
                        type: "tuple",
                    },
                ],
                name: "LotteryCreated",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "lotteryId",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "resolvedPrice",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "winningBucketLowerBound",
                        type: "uint256",
                    },
                ],
                name: "LotteryResolved",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                ],
                name: "Paused",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "bytes32",
                        name: "role",
                        type: "bytes32",
                    },
                    {
                        indexed: true,
                        internalType: "bytes32",
                        name: "previousAdminRole",
                        type: "bytes32",
                    },
                    {
                        indexed: true,
                        internalType: "bytes32",
                        name: "newAdminRole",
                        type: "bytes32",
                    },
                ],
                name: "RoleAdminChanged",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "bytes32",
                        name: "role",
                        type: "bytes32",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "sender",
                        type: "address",
                    },
                ],
                name: "RoleGranted",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "bytes32",
                        name: "role",
                        type: "bytes32",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "sender",
                        type: "address",
                    },
                ],
                name: "RoleRevoked",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "lotteryId",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "firstBucketLowerBound",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "minimumTicketPrice",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256[]",
                        name: "bucketTicketPrices",
                        type: "uint256[]",
                    },
                ],
                name: "SetLotteryPrices",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "operator",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    { indexed: true, internalType: "address", name: "to", type: "address" },
                    {
                        indexed: false,
                        internalType: "uint256[]",
                        name: "ids",
                        type: "uint256[]",
                    },
                    {
                        indexed: false,
                        internalType: "uint256[]",
                        name: "values",
                        type: "uint256[]",
                    },
                ],
                name: "TransferBatch",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "lotteryId",
                        type: "uint256",
                    },
                    {
                        indexed: true,
                        internalType: "uint256",
                        name: "newLotteryId",
                        type: "uint256",
                    },
                ],
                name: "TransferProceeds",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: "address",
                        name: "operator",
                        type: "address",
                    },
                    {
                        indexed: true,
                        internalType: "address",
                        name: "from",
                        type: "address",
                    },
                    { indexed: true, internalType: "address", name: "to", type: "address" },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                    },
                ],
                name: "TransferSingle",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "string",
                        name: "value",
                        type: "string",
                    },
                    { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
                ],
                name: "URI",
                type: "event",
            },
            {
                anonymous: false,
                inputs: [
                    {
                        indexed: false,
                        internalType: "address",
                        name: "account",
                        type: "address",
                    },
                ],
                name: "Unpaused",
                type: "event",
            },
            {
                inputs: [],
                name: "DEFAULT_ADMIN_ROLE",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "FEE_PRECISION",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "FEE_RECIPIENT_ROLE",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "LOTTERY_MANAGER_ROLE",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "MAX_FEE_RATE",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "PRICE_FEED",
                outputs: [
                    { internalType: "contract IPriceFeed", name: "", type: "address" },
                ],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "PRICE_SETTER_ROLE",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
                name: "_FEE_COLLECTED_",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "_FEE_RATE_",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "_LAST_LOTTERY_ID_",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256", name: "lotteryId", type: "uint256" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "addProceeds",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "account", type: "address" },
                    { internalType: "uint256", name: "id", type: "uint256" },
                ],
                name: "balanceOf",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address[]", name: "accounts", type: "address[]" },
                    { internalType: "uint256[]", name: "ids", type: "uint256[]" },
                ],
                name: "balanceOfBatch",
                outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256", name: "lotteryId", type: "uint256" },
                    { internalType: "uint256", name: "bucketLowerBound", type: "uint256" },
                    { internalType: "uint256", name: "buyTicketCount", type: "uint256" },
                ],
                name: "buyTickets",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256[]", name: "lotteryIds", type: "uint256[]" },
                ],
                name: "claim",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    {
                        components: [
                            { internalType: "string", name: "token", type: "string" },
                            { internalType: "uint256", name: "bucketSize", type: "uint256" },
                            { internalType: "uint256", name: "openTimestamp", type: "uint256" },
                            {
                                internalType: "uint256",
                                name: "closeTimestamp",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "maturityTimestamp",
                                type: "uint256",
                            },
                            {
                                internalType: "contract IERC20",
                                name: "collateralToken",
                                type: "address",
                            },
                        ],
                        internalType: "struct LotteryParams",
                        name: "lotteryParams",
                        type: "tuple",
                    },
                ],
                name: "createLottery",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "uint256", name: "lotteryId", type: "uint256" }],
                name: "exists",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
                name: "getRoleAdmin",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "role", type: "bytes32" },
                    { internalType: "address", name: "account", type: "address" },
                ],
                name: "grantRole",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "role", type: "bytes32" },
                    { internalType: "address", name: "account", type: "address" },
                ],
                name: "hasRole",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "account", type: "address" },
                    { internalType: "address", name: "operator", type: "address" },
                ],
                name: "isApprovedForAll",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [{ internalType: "address", name: "forwarder", type: "address" }],
                name: "isTrustedForwarder",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "pauseContract",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "paused",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "role", type: "bytes32" },
                    { internalType: "address", name: "account", type: "address" },
                ],
                name: "renounceRole",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "uint256", name: "lotteryId", type: "uint256" }],
                name: "resolveLottery",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "bytes32", name: "role", type: "bytes32" },
                    { internalType: "address", name: "account", type: "address" },
                ],
                name: "revokeRole",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "from", type: "address" },
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256[]", name: "ids", type: "uint256[]" },
                    { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
                    { internalType: "bytes", name: "data", type: "bytes" },
                ],
                name: "safeBatchTransferFrom",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "from", type: "address" },
                    { internalType: "address", name: "to", type: "address" },
                    { internalType: "uint256", name: "id", type: "uint256" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                    { internalType: "bytes", name: "data", type: "bytes" },
                ],
                name: "safeTransferFrom",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "operator", type: "address" },
                    { internalType: "bool", name: "approved", type: "bool" },
                ],
                name: "setApprovalForAll",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "uint256", name: "feeRate", type: "uint256" }],
                name: "setFeeRate",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256", name: "lotteryId", type: "uint256" },
                    {
                        internalType: "uint256",
                        name: "firstBucketLowerBound",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256[]",
                        name: "bucketTicketPrices",
                        type: "uint256[]",
                    },
                ],
                name: "setLotteryTicketsPrice",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
                name: "setTicketURI",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
                name: "supportsInterface",
                outputs: [{ internalType: "bool", name: "", type: "bool" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "account", type: "address" },
                    { internalType: "uint256", name: "lotteryId", type: "uint256" },
                    { internalType: "uint256", name: "bucketLowerBound", type: "uint256" },
                ],
                name: "ticketBalanceOf",
                outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "uint256", name: "prevLotteryId", type: "uint256" },
                    { internalType: "uint256", name: "forwardLotteryId", type: "uint256" },
                ],
                name: "transferProceeds",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "unpauseContract",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
                name: "uri",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    { internalType: "address", name: "recipient", type: "address" },
                    { internalType: "contract IERC20", name: "token", type: "address" },
                    { internalType: "uint256", name: "amount", type: "uint256" },
                ],
                name: "withdrawFees",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
        ];
        const tokenContract = new ethers_1.ethers.Contract(tokenAddress, tokenABI, wallet);
        const predictionPoolContract = new ethers_1.ethers.Contract(predictionPoolAddress, predictionPoolABI, wallet);
        const approveData = tokenContract.interface.encodeFunctionData("approve", [
            predictionPoolAddress,
            1000000000000,
        ]);
        const ticketData = predictionPoolContract.interface.encodeFunctionData("buyTickets", [2, 1500000000000, 3]);
        const transactions = [
            {
                to: tokenAddress,
                data: approveData,
                value: "0",
            },
            {
                to: predictionPoolAddress,
                data: ticketData,
                value: tokenAddress,
            },
        ];
        console.log("Going to create multisend");
        const multisendTx = yield safeSdk.createTransaction({
            safeTransactionData: transactions,
        });
        console.log("Multisend transaction created");
        const signedTx = yield safeSdk.signTransaction(multisendTx);
        console.log("Signed Transaction");
        const txResponse = yield safeSdk.executeTransaction(signedTx, {
            gasLimit: 30000000,
        });
        console.log(txResponse);
        console.log("Purchase successful:", (_a = txResponse === null || txResponse === void 0 ? void 0 : txResponse.transactionResponse) === null || _a === void 0 ? void 0 : _a.hash);
    });
}
multiSendLottery();
