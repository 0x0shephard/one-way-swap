export const WALLET_ADDRESS = "0x4F8a...9B2a";
export const USDC_BALANCE = 2450.0;
export const DPKR_BALANCE = 350000.0;
export const EXCHANGE_RATE = 278.45;
export const PROTOCOL_FEE_BPS = 10; // 0.10%
export const ESTIMATED_GAS_USD = 0.45;

export const ORACLE_ADDRESS =
  "0xfE4A8cc5b5B2366C1B58Bea3858e81130067101c";

export const TRANSACTIONS = [
  {
    date: "Oct 22, 2023",
    time: "09:45 AM",
    usdcSent: 500.0,
    dpkrReceived: 140250.0,
    chainlinkRate: 280.5,
    status: "Success",
    txId: "0x8f2...1a3b",
  },
  {
    date: "Oct 20, 2023",
    time: "02:30 PM",
    usdcSent: 250.0,
    dpkrReceived: 69612.5,
    chainlinkRate: 278.45,
    status: "Success",
    txId: "0x3d1...8c4e",
  },
  {
    date: "Oct 19, 2023",
    time: "11:15 AM",
    usdcSent: 1000.0,
    dpkrReceived: 278300.0,
    chainlinkRate: 278.3,
    status: "Success",
    txId: "0xa7c...2f5d",
  },
  {
    date: "Oct 15, 2023",
    time: "04:20 PM",
    usdcSent: 100.0,
    dpkrReceived: 28150.0,
    chainlinkRate: 281.5,
    status: "Success",
    txId: "0x1b9...6e7a",
  },
];

export const ADMIN_ACTIONS = [
  {
    action: "UpdateFeeBps",
    status: "Confirmed",
    params: "10 → 15",
    timestamp: "3 hours ago",
  },
  {
    action: "UpdateOracleAddress",
    status: "Confirmed",
    params: "0xfE4...01c",
    timestamp: "5 hours ago",
  },
  {
    action: "WithdrawLiquidity",
    status: "Confirmed",
    params: "5,000 USDC",
    timestamp: "1 day ago",
  },
];

export const VAULT_BALANCE = 1250000;
export const VOLUME_24H = 42890;
export const ACTIVE_ORACLES = "3/3";

export function calculateSwap(usdcAmount) {
  const fee = (usdcAmount * PROTOCOL_FEE_BPS) / 10000;
  const received = usdcAmount * EXCHANGE_RATE;
  const expected = (usdcAmount - fee) * EXCHANGE_RATE;
  return {
    received: received.toFixed(2),
    fee: fee.toFixed(2),
    gas: ESTIMATED_GAS_USD,
    expected: expected.toFixed(2),
  };
}

export function formatNumber(num) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
