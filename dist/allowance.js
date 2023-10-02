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
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.RPC_URL);
        const privateKey = process.env.WALLET_PRIVATE_KEY;
        const wallet = new ethers_1.ethers.Wallet(privateKey, provider);
        const tokenAddress = process.env.TOKEN_ADDRESS;
        const predictionPoolAddress = process.env.PREDICTION_POOL_ADDRESS;
        //   const polygonTokenAddress = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0";
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
        const aarcModuleABI = [
            {
                inputs: [{ internalType: "address", name: "_permit", type: "address" }],
                stateMutability: "nonpayable",
                type: "constructor",
            },
            {
                inputs: [],
                name: "DOMAIN_SEPARATOR",
                outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "NAME",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [],
                name: "VERSION",
                outputs: [{ internalType: "string", name: "", type: "string" }],
                stateMutability: "view",
                type: "function",
            },
            {
                inputs: [
                    {
                        components: [
                            {
                                components: [
                                    { internalType: "address", name: "token", type: "address" },
                                    { internalType: "uint256", name: "amount", type: "uint256" },
                                ],
                                internalType: "struct IPermit2.TokenPermissions[]",
                                name: "tokens",
                                type: "tuple[]",
                            },
                            { internalType: "uint256", name: "nonce", type: "uint256" },
                            { internalType: "uint256", name: "deadline", type: "uint256" },
                            { internalType: "bytes", name: "signature", type: "bytes" },
                        ],
                        internalType: "struct IAarcPermit2Safe.BatchPermit",
                        name: "_permit",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "targetContract",
                                type: "address",
                            },
                            { internalType: "address", name: "token", type: "address" },
                            { internalType: "uint256", name: "amount", type: "uint256" },
                        ],
                        internalType: "struct IAarcPermit2Safe.TargetContractToken[]",
                        name: "targetDetails",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "targetContract",
                                type: "address",
                            },
                            { internalType: "bytes", name: "data", type: "bytes" },
                            { internalType: "uint256", name: "value", type: "uint256" },
                        ],
                        internalType: "struct IAarcPermit2Safe.ContractCall[]",
                        name: "contractCalls",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            { internalType: "address", name: "token", type: "address" },
                            { internalType: "address", name: "receiver", type: "address" },
                        ],
                        internalType: "struct IAarcPermit2Safe.TokenDistribution[]",
                        name: "tokenDistribution",
                        type: "tuple[]",
                    },
                ],
                name: "executeBatchPermit",
                outputs: [],
                stateMutability: "payable",
                type: "function",
            },
            {
                inputs: [
                    {
                        components: [
                            {
                                components: [
                                    { internalType: "address", name: "token", type: "address" },
                                    { internalType: "uint256", name: "amount", type: "uint256" },
                                ],
                                internalType: "struct IPermit2.TokenPermissions",
                                name: "tokenPermission",
                                type: "tuple",
                            },
                            { internalType: "uint256", name: "nonce", type: "uint256" },
                            { internalType: "uint256", name: "deadline", type: "uint256" },
                            { internalType: "bytes", name: "signature", type: "bytes" },
                        ],
                        internalType: "struct IAarcPermit2Safe.SinglePermit",
                        name: "_permit",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "targetContract",
                                type: "address",
                            },
                            { internalType: "address", name: "token", type: "address" },
                            { internalType: "uint256", name: "amount", type: "uint256" },
                        ],
                        internalType: "struct IAarcPermit2Safe.TargetContractToken[]",
                        name: "targetDetails",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "targetContract",
                                type: "address",
                            },
                            { internalType: "bytes", name: "data", type: "bytes" },
                            { internalType: "uint256", name: "value", type: "uint256" },
                        ],
                        internalType: "struct IAarcPermit2Safe.ContractCall[]",
                        name: "contractCalls",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            { internalType: "address", name: "token", type: "address" },
                            { internalType: "address", name: "receiver", type: "address" },
                        ],
                        internalType: "struct IAarcPermit2Safe.TokenDistribution[]",
                        name: "tokenDistribution",
                        type: "tuple[]",
                    },
                ],
                name: "executeSinglePermit",
                outputs: [],
                stateMutability: "payable",
                type: "function",
            },
            {
                inputs: [],
                name: "permit",
                outputs: [
                    { internalType: "contract IPermit2", name: "", type: "address" },
                ],
                stateMutability: "view",
                type: "function",
            },
        ];
        const predictionPoolContract = new ethers_1.ethers.Contract(predictionPoolAddress, predictionPoolABI, wallet);
        const ticketsData = predictionPoolContract.interface.encodeFunctionData("buyTickets", [2, 1500000000000, 3]);
        const aarcModuleAddress = "0x4EccF8A993E3B339bF977a1d55799418855a6F97";
        const aarcModuleContract = new ethers_1.ethers.Contract(aarcModuleAddress, aarcModuleABI, wallet);
        console.log(aarcModuleContract);
        // try {
        const singlePermit = {
            tokenPermission: {
                token: tokenAddress,
                amount: 0.5,
            },
            nonce: 0,
            deadline: 100,
            signature: "",
        };
        const targetDetailsSingle = [
            {
                token: tokenAddress,
                targetContract: predictionPoolAddress,
                amount: 10,
            },
        ];
        const contractCallsSingle = [
            {
                targetContract: predictionPoolAddress,
                data: ticketsData,
                value: 0,
            },
        ];
        const tokenDistributionSingle = [
            {
                token: tokenAddress,
                receiver: "",
            },
        ];
        // const
        const feeData = yield provider.getFeeData();
        console.log("Going to execute signlePermit");
        // const txSingle = await aarcModuleContract.executeSinglePermit(
        //   [[tokenAddress, 100], 0, 100, ""],
        //   [[tokenAddress,predictionPoolAddress,100]],
        //   [[predictionPoolAddress, ticketsData, 0]],
        //   []
        // );
        const txSingle = yield aarcModuleContract.executeSinglePermit([[tokenAddress, 10], 0, 100, ""], [[tokenAddress, predictionPoolAddress, 100]], [[predictionPoolAddress, ticketsData, 0]], [[tokenAddress, "0xc5D15056Df341B47C3142efD5C0268AD3003c12c"]]);
        // console.log(typeof txSingle)
        console.log("Calling txSingle");
        // } catch (e) {
        //   console.log(e);
        // }
    });
}
main();
// import { BigNumber, ethers } from "ethers";
// import dotenv from "dotenv";
// import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
// dotenv.config();
// interface AllowanceTargetDetails {
//   targetContract: string;
//   token: string;
//   amount: BigNumber;
// }
// interface ContractCall {
//   targetContract: string;
//   data: string;
//   value: BigNumber;
// }
// interface ExecuteTransactionsOptions {
//   safe: string;
//   targetContractDetails: AllowanceTargetDetails[];
//   contractCalls: ContractCall[];
// }
// const config = {
//   RPC_URL: "https://goerli.infura.io/v3/120eaf67c29b4178bb1f898409a2112b",
//   PRIVATE_KEY:
//     "935c99e14fb83d8f2cc6c24bb403a7d2b819a2b8a2ad49bec9b91708bd2a16bf",
// };
// async function allowance() {
//   const provider = new ethers.providers.JsonRpcProvider(config.RPC_URL);
//   const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);
//   const ethAdapter = new EthersAdapter({
//     ethers,
//     signerOrProvider: wallet,
//   });
//   const safeAddress = "0xF53439F6ea9C7c78d80F01A584Cf4018b03Ed780";
//   const safeSdk = await Safe.create({ ethAdapter, safeAddress });
//   const allowanceTargetDetails: AllowanceTargetDetails[] = [
//     {
//       targetContract: "0x456",
//       token: "0x123",
//       amount: new ethers.BigNumber(10000000000, "0x12"),
//     },
//   ];
//   const contractCalls: ContractCall[] = [
//     {
//       targetContract: "0x456",
//       data: "probablySomeUniSwapContractMethod()",
//       value: new ethers.BigNumber(10000000000, "0x12"),
//     },
//   ];
//   const safeTransaction = {
//     safeAddress,
//     allowanceTargetDetails,
//     contractCalls,
//   };
//   const signature = await safeSdk.signTypedData(safeTransaction);
// }
