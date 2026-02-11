// ── Deployed Addresses (Sepolia Testnet) ──────────────────────────────
export const USDC_ADDRESS = "0x51cD6a98e8D29500d99798Ef95B18EcbA2CD31d3";
export const PRICE_FEED_ADDRESS = "0x0f610f492a9C8817C2fdb786C1b72217A6ff5fb2";
export const PKR_TOKEN_ADDRESS = "0xCA906d0Eaa9Af7EB71F4BF3f126868c4bED8954d";
export const REMITTANCE_PORTAL_ADDRESS = "0xeee44e9802Cd94Cc2D800D70532F72475aE2Cf7a";
export const ADMIN_ADDRESS = "0xCc624fFA5df1F3F4b30aa8abd30186a86254F406";

// ── Decimals ──────────────────────────────────────────────────────────
export const USDC_DECIMALS = 6;
export const PKR_DECIMALS = 18;
export const PRICE_FEED_DECIMALS = 8;

// ── ABIs ──────────────────────────────────────────────────────────────

export const mockUsdcAbi = [
  {
    type: "function",
    name: "mint",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_MINT",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
];

export const remittancePortalAbi = [
  {
    type: "function",
    name: "swapUSDCForPKR",
    inputs: [{ name: "usdcAmount", type: "uint256" }],
    outputs: [{ name: "mintAmount", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "previewSwap",
    inputs: [{ name: "usdcAmount", type: "uint256" }],
    outputs: [{ name: "pkrAmount", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "feeBps",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "vaultBalance",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "usdc",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pkrToken",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "oracle",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "oracleStalenessThreshold",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "BPS_DENOMINATOR",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_FEE_BPS",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdrawLiquidity",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFee",
    inputs: [{ name: "_feeBps", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setOracle",
    inputs: [{ name: "_oracle", type: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setStalenessThreshold",
    inputs: [{ name: "_threshold", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "SwapExecuted",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "usdcIn", type: "uint256", indexed: false },
      { name: "pkrOut", type: "uint256", indexed: false },
      { name: "rate", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "LiquidityWithdrawn",
    inputs: [
      { name: "to", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FeeUpdated",
    inputs: [{ name: "newFeeBps", type: "uint256", indexed: false }],
    anonymous: false,
  },
  {
    type: "event",
    name: "OracleUpdated",
    inputs: [{ name: "newOracle", type: "address", indexed: true }],
    anonymous: false,
  },
  {
    type: "event",
    name: "StalenessThresholdUpdated",
    inputs: [{ name: "newThreshold", type: "uint256", indexed: false }],
    anonymous: false,
  },
];

export const pkrTokenAbi = [
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
];

export const priceFeedAbi = [
  {
    type: "function",
    name: "latestRoundData",
    inputs: [],
    outputs: [
      { name: "roundId", type: "uint80" },
      { name: "answer", type: "int256" },
      { name: "startedAt", type: "uint256" },
      { name: "updatedAt", type: "uint256" },
      { name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decimals",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "description",
    inputs: [],
    outputs: [{ name: "", type: "string" }],
    stateMutability: "pure",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────

export function formatUsdcBalance(rawBalance) {
  if (!rawBalance) return "0.00";
  const value = Number(rawBalance) / 10 ** USDC_DECIMALS;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPkrBalance(rawBalance) {
  if (!rawBalance) return "0.00";
  const value = Number(rawBalance) / 10 ** PKR_DECIMALS;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseUsdcAmount(amount) {
  return BigInt(Math.floor(Number(amount) * 10 ** USDC_DECIMALS));
}

// Keep the old erc20Abi export for backwards compat with existing pages
export const erc20Abi = mockUsdcAbi;
