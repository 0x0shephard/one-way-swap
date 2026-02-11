import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Sidebar from "../components/layout/Sidebar";
import ProcessingModal from "../components/modals/ProcessingModal";
import SuccessModal from "../components/modals/SuccessModal";
import ErrorModal from "../components/modals/ErrorModal";
import { formatNumber } from "../utils/mockData";
import { formatUsdcBalance, formatPkrBalance, USDC_DECIMALS, PKR_DECIMALS } from "../utils/contracts";
import {
  useUsdcBalance,
  useExchangeRate,
  usePreviewSwap,
  useFeeBps,
  useUsdcAllowance,
  useApproveUsdc,
  useSwap,
} from "../hooks/useContracts";

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function SwapDashboard() {
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const [modal, setModal] = useState(null); // null | "processing" | "success" | "error"
  const [lastSwapData, setLastSwapData] = useState({ sent: "0", received: "0", hash: "" });

  const numAmount = parseFloat(amount) || 0;

  // ── Read hooks ──────────────────────────────────────────────────────
  const { raw: rawUsdcBalance, formatted: usdcBalance, refetch: refetchUsdcBalance } = useUsdcBalance();
  const { rate: exchangeRate } = useExchangeRate();
  const { data: feeBpsRaw } = useFeeBps();
  const { formatted: previewPkr } = usePreviewSwap(numAmount);
  const { formatted: allowance, refetch: refetchAllowance } = useUsdcAllowance();

  const feeBps = feeBpsRaw ? Number(feeBpsRaw) : 0;
  const feePercent = feeBps / 100;
  const feeAmount = numAmount > 0 ? (numAmount * feeBps) / 10000 : 0;
  const needsApproval = numAmount > 0 && allowance < numAmount;

  // ── Write hooks ─────────────────────────────────────────────────────
  const {
    approve,
    isPending: approvePending,
    isConfirming: approveConfirming,
    isSuccess: approveSuccess,
    error: approveError,
  } = useApproveUsdc();

  const {
    swap,
    hash: swapHash,
    isPending: swapPending,
    isConfirming: swapConfirming,
    isSuccess: swapSuccess,
    error: swapError,
  } = useSwap();

  // Refetch allowance after successful approve
  useEffect(() => {
    if (approveSuccess) {
      refetchAllowance();
    }
  }, [approveSuccess, refetchAllowance]);

  // Handle swap lifecycle
  useEffect(() => {
    if (swapPending || swapConfirming) {
      setModal("processing");
    }
  }, [swapPending, swapConfirming]);

  useEffect(() => {
    if (swapSuccess && swapHash) {
      setLastSwapData({
        sent: numAmount.toFixed(2),
        received: formatNumber(previewPkr),
        hash: swapHash,
      });
      setModal("success");
      setAmount("");
    }
  }, [swapSuccess, swapHash]);

  useEffect(() => {
    if (swapError) {
      setModal("error");
    }
  }, [swapError]);

  const handleApprove = () => {
    approve(numAmount);
  };

  const handleSwap = () => {
    swap(numAmount);
  };

  const handleMax = () => {
    setAmount(usdcBalance.toFixed(2));
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -z-10"></div>

        {/* Header - Wallet Address */}
        <div className="absolute top-8 right-8">
          <ConnectButton />
        </div>

        {/* Swap Card */}
        <div className="w-full max-w-lg relative z-10">
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold">Swap</h1>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-border-dark rounded-lg transition-colors">
                <span className="material-icons text-slate-400">settings</span>
              </button>
            </div>

            {/* You Pay */}
            <div className="space-y-2 mb-2">
              <div className="flex justify-between text-sm">
                <label className="text-slate-500 dark:text-slate-400 font-medium">
                  You Pay
                </label>
                <span className="text-slate-500 dark:text-slate-400">
                  Balance:{" "}
                  <span className="text-slate-900 dark:text-slate-100 font-semibold">
                    {formatUsdcBalance(rawUsdcBalance)} USDC
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-border-dark rounded-xl swap-input-focus transition-all">
                <input
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-2xl font-bold w-full p-0 text-slate-900 dark:text-white"
                  placeholder="0.0"
                  type="number"
                  step="any"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  autoComplete="off"
                />
                <div className="flex items-center gap-2 bg-white dark:bg-card-dark px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border-dark shrink-0">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[8px] font-bold text-blue-400">
                    U
                  </div>
                  <span className="font-bold">USDC</span>
                </div>
                <button
                  type="button"
                  onClick={handleMax}
                  className="text-xs font-bold text-primary hover:text-primary/80 uppercase shrink-0"
                >
                  Max
                </button>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center -my-4 relative z-10">
              <div className="w-10 h-10 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-full flex items-center justify-center shadow-lg text-primary">
                <span className="material-icons">arrow_downward</span>
              </div>
            </div>

            {/* You Receive */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <label className="text-slate-500 dark:text-slate-400 font-medium">
                  You Receive
                </label>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-background-dark/80 border border-slate-200 dark:border-border-dark rounded-xl opacity-90">
                <input
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-2xl font-bold w-full p-0 text-primary"
                  placeholder="0.0"
                  readOnly
                  type="text"
                  value={numAmount > 0 ? formatNumber(previewPkr) : "0.0"}
                />
                <div className="flex items-center gap-2 bg-white dark:bg-card-dark px-3 py-1.5 rounded-lg border border-slate-200 dark:border-border-dark">
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    PKR
                  </div>
                  <span className="font-bold">dPKR</span>
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-slate-50 dark:bg-background-dark/30 rounded-xl p-4 space-y-3 mb-6 border border-slate-100 dark:border-border-dark/30">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span>Exchange Rate</span>
                  <span className="material-icons text-[14px]">
                    info_outline
                  </span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span>1 USDC = {exchangeRate > 0 ? exchangeRate.toFixed(2) : "—"} dPKR</span>
                  <span className="flex items-center gap-1 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Live
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Protocol Fee ({feePercent.toFixed(2)}%)
                </span>
                <span className="font-medium">{feeAmount.toFixed(2)} USDC</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-border-dark/50 flex justify-between items-center">
                <span className="font-semibold">Expected Output</span>
                <span className="text-primary font-bold">
                  {numAmount > 0 ? formatNumber(previewPkr) : "0.00"} dPKR
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-3">
              {needsApproval ? (
                <button
                  onClick={handleApprove}
                  disabled={approvePending || approveConfirming || numAmount <= 0}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-icons text-sm">lock_open</span>
                  {approvePending
                    ? "Confirm in Wallet..."
                    : approveConfirming
                    ? "Approving..."
                    : `Approve ${numAmount > 0 ? numAmount.toFixed(2) : ""} USDC`}
                </button>
              ) : (
                <button className="w-full py-4 bg-slate-200 dark:bg-border-dark text-slate-500 dark:text-slate-400 font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                  <span className="material-icons text-sm">check_circle</span>
                  USDC Approved
                </button>
              )}
              <button
                onClick={handleSwap}
                disabled={needsApproval || swapPending || swapConfirming || numAmount <= 0 || numAmount > usdcBalance}
                className="w-full py-4 bg-primary hover:bg-primary/90 text-background-dark font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(25,230,107,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {swapPending
                  ? "Confirm in Wallet..."
                  : swapConfirming
                  ? "Swapping..."
                  : "Swap USDC for dPKR"}
              </button>
            </div>

            {/* Insufficient balance warning */}
            {numAmount > usdcBalance && numAmount > 0 && (
              <p className="mt-3 text-center text-xs text-danger font-medium">
                Insufficient USDC balance
              </p>
            )}
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400 px-4 leading-relaxed">
            Prices are fetched directly from{" "}
            <span className="text-blue-400 font-semibold">
              Chainlink Price Feeds
            </span>
            . RemitLink provides a secure, non-custodial bridge for instant
            digital PKR settlements.
          </p>
        </div>
      </main>

      {/* Modals */}
      <ProcessingModal isOpen={modal === "processing"} />
      <SuccessModal
        isOpen={modal === "success"}
        sentAmount={lastSwapData.sent}
        receivedAmount={lastSwapData.received}
        rate={exchangeRate > 0 ? exchangeRate.toFixed(2) : "—"}
        txHash={lastSwapData.hash ? `${lastSwapData.hash.slice(0, 6)}...${lastSwapData.hash.slice(-4)}` : ""}
        onClose={() => setModal(null)}
      />
      <ErrorModal
        isOpen={modal === "error"}
        onRetry={() => {
          setModal(null);
          handleSwap();
        }}
        onDismiss={() => setModal(null)}
      />
    </div>
  );
}
