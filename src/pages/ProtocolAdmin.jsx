import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ADMIN_ACTIONS, formatNumber } from "../utils/mockData";
import { USDC_DECIMALS } from "../utils/contracts";
import {
  useVaultBalance,
  useExchangeRate,
  useFeeBps,
  useOracleAddress,
  useStalenessThreshold,
  usePortalOwner,
  useWithdrawLiquidity,
  useSetFee,
  useSetOracle,
  useSetStalenessThreshold,
} from "../hooks/useContracts";

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function ProtocolAdmin() {
  const { address } = useAccount();

  // ── Read hooks ──────────────────────────────────────────────────────
  const { formatted: vaultBalance } = useVaultBalance();
  const { rate: exchangeRate } = useExchangeRate();
  const { data: feeBpsRaw } = useFeeBps();
  const { data: oracleAddr } = useOracleAddress();
  const { data: stalenessRaw } = useStalenessThreshold();
  const { data: portalOwner } = usePortalOwner();

  const currentFeeBps = feeBpsRaw ? Number(feeBpsRaw) : 0;
  const currentStaleness = stalenessRaw ? Number(stalenessRaw) : 3600;
  const isOwner = address && portalOwner && address.toLowerCase() === portalOwner.toLowerCase();

  // ── Form state ──────────────────────────────────────────────────────
  const [feeBps, setFeeBps] = useState(currentFeeBps);
  const [oracleInput, setOracleInput] = useState("");
  const [stalenessInput, setStalenessInput] = useState("");
  const [withdrawAddr, setWithdrawAddr] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Sync form when on-chain data loads
  useEffect(() => {
    if (feeBpsRaw !== undefined) setFeeBps(Number(feeBpsRaw));
  }, [feeBpsRaw]);

  useEffect(() => {
    if (oracleAddr) setOracleInput(oracleAddr);
  }, [oracleAddr]);

  useEffect(() => {
    if (stalenessRaw !== undefined) setStalenessInput(String(Number(stalenessRaw)));
  }, [stalenessRaw]);

  // ── Write hooks ─────────────────────────────────────────────────────
  const {
    withdraw,
    isPending: withdrawPending,
    isConfirming: withdrawConfirming,
    isSuccess: withdrawSuccess,
    error: withdrawError,
  } = useWithdrawLiquidity();

  const {
    setFee,
    isPending: feePending,
    isConfirming: feeConfirming,
    isSuccess: feeSuccess,
    error: feeError,
  } = useSetFee();

  const {
    setOracle,
    isPending: oraclePending,
    isConfirming: oracleConfirming,
    isSuccess: oracleSuccess,
    error: oracleError,
  } = useSetOracle();

  const {
    setThreshold,
    isPending: thresholdPending,
    isConfirming: thresholdConfirming,
    isSuccess: thresholdSuccess,
    error: thresholdError,
  } = useSetStalenessThreshold();

  const configPending = feePending || oraclePending || thresholdPending;
  const configConfirming = feeConfirming || oracleConfirming || thresholdConfirming;

  const handleWithdraw = () => {
    if (!withdrawAddr || !withdrawAmount) return;
    withdraw(withdrawAddr, parseFloat(withdrawAmount));
  };

  const handleUpdateConfig = () => {
    if (feeBps !== currentFeeBps) {
      setFee(feeBps);
    }
    if (oracleInput && oracleInput.toLowerCase() !== (oracleAddr || "").toLowerCase()) {
      setOracle(oracleInput);
    }
    if (stalenessInput && Number(stalenessInput) !== currentStaleness) {
      setThreshold(Number(stalenessInput));
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      {/* Top Nav */}
      <nav className="border-b border-primary/10 bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-icons text-background-dark text-xl font-bold">
                  swap_horiz
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Remit<span className="text-primary">Link</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-xs font-bold text-primary tracking-widest uppercase">
                  Admin Mode
                </span>
              </div>
              <div className="h-8 w-px bg-primary/10"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-slate-500 font-medium">
                    Connected {isOwner ? "Owner" : "Viewer"}
                  </p>
                  <p className="text-sm font-mono text-primary">
                    {truncateAddress(address)}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <span className="material-icons text-primary">
                    account_balance_wallet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {!isOwner && address && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-2">
            <span className="material-icons text-yellow-500 text-sm">warning</span>
            <p className="text-xs text-yellow-500 font-medium">
              You are not the protocol owner. Admin write operations will revert.
            </p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Protocol Dashboard</h1>
            <p className="text-slate-500 mt-1">
              Global administrative control for USDC/dPKR remittance bridge.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="px-4 py-2 rounded-lg bg-background-light dark:bg-slate-900 border border-primary/10 flex items-center gap-2">
              <span className="material-icons text-primary text-sm">
                sensors
              </span>
              <span className="text-sm font-medium">
                Sepolia Node:{" "}
                <span className="text-primary uppercase">Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-5 rounded-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Total Vault Balance
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {formatNumber(vaultBalance)}
              </span>
              <span className="text-sm text-primary font-mono font-medium">
                USDC
              </span>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Exchange Rate
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {exchangeRate > 0 ? exchangeRate.toFixed(2) : "—"}
              </span>
              <span className="text-sm text-slate-400 font-mono font-medium">
                dPKR/USDC
              </span>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Protocol Fee
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {(currentFeeBps / 100).toFixed(2)}%
              </span>
              <span className="text-sm text-slate-400 font-mono font-medium">
                {currentFeeBps} Bps
              </span>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-xl">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Staleness Threshold
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{currentStaleness}</span>
              <span className="text-sm text-slate-400 font-mono font-medium uppercase">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vault Management */}
          <div className="bg-background-light dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-danger/10 rounded-lg">
                  <span className="material-icons text-danger">
                    account_balance
                  </span>
                </div>
                <h2 className="text-xl font-bold">Vault Management</h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 bg-danger/10 text-danger rounded border border-danger/20 uppercase">
                High Risk
              </span>
            </div>
            <div className="p-6">
              <div className="mb-8 p-4 bg-background-light dark:bg-background-dark rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-500 font-medium">
                    Available Liquidity
                  </span>
                  <span className="text-xs text-slate-500 uppercase font-bold">
                    ERC-20 USDC
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">
                    U
                  </div>
                  <span className="text-3xl font-bold">
                    {formatNumber(vaultBalance)}
                  </span>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">
                    Recipient Wallet Address
                  </label>
                  <input
                    className="w-full bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-danger/50 focus:border-danger outline-none transition-all"
                    placeholder="0x..."
                    type="text"
                    value={withdrawAddr}
                    onChange={(e) => setWithdrawAddr(e.target.value)}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-semibold text-slate-400">
                      Withdrawal Amount
                    </label>
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(vaultBalance.toFixed(2))}
                      className="text-xs font-bold text-danger hover:underline"
                    >
                      Withdraw Max
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg pl-4 pr-16 py-3 text-sm font-mono focus:ring-2 focus:ring-danger/50 focus:border-danger outline-none transition-all"
                      placeholder="0.00"
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">
                      USDC
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-danger/5 border border-danger/20 rounded-lg flex gap-3">
                  <span className="material-icons text-danger text-xl">
                    warning
                  </span>
                  <p className="text-xs text-danger leading-relaxed">
                    <strong>Warning:</strong> Executing a withdrawal will
                    immediately move protocol liquidity to the specified address.
                    This action is irreversible on the blockchain.
                  </p>
                </div>
                {withdrawSuccess && (
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-xs text-primary font-medium">
                    Withdrawal executed successfully.
                  </div>
                )}
                {withdrawError && (
                  <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-xs text-danger font-medium">
                    Error: {withdrawError.message?.slice(0, 100)}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleWithdraw}
                  disabled={withdrawPending || withdrawConfirming || !withdrawAddr || !withdrawAmount}
                  className="w-full py-4 bg-danger hover:bg-danger/90 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-icons">file_download</span>
                  {withdrawPending
                    ? "Confirm in Wallet..."
                    : withdrawConfirming
                    ? "Withdrawing..."
                    : "Execute Liquidity Withdrawal"}
                </button>
              </form>
            </div>
          </div>

          {/* Protocol Configuration */}
          <div className="bg-background-light dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <span className="material-icons text-primary">
                    settings_input_component
                  </span>
                </div>
                <h2 className="text-xl font-bold">Protocol Configuration</h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20 uppercase">
                Core Settings
              </span>
            </div>
            <div className="p-6">
              <form
                className="space-y-8"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Fee Bps */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-400">
                        Fee Basis Points (Bps)
                      </label>
                      <p className="text-[11px] text-slate-500">
                        The cut taken from each remittance swap
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-primary">
                        {(feeBps / 100).toFixed(2)}%
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {feeBps} Bps
                      </p>
                    </div>
                  </div>
                  <input
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    type="range"
                    min="0"
                    max="500"
                    value={feeBps}
                    onChange={(e) => setFeeBps(Number(e.target.value))}
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    <span>0 Bps (0%)</span>
                    <span>500 Bps (5%)</span>
                  </div>
                </div>

                {/* Oracle Address */}
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <label className="block text-sm font-semibold text-slate-400">
                      Chainlink Oracle Address
                    </label>
                    <span
                      className="material-icons text-slate-500 text-sm cursor-help"
                      title="The price feed contract address for USDC/PKR"
                    >
                      info
                    </span>
                  </div>
                  <input
                    className="w-full bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-sm font-mono focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    type="text"
                    value={oracleInput}
                    onChange={(e) => setOracleInput(e.target.value)}
                  />
                </div>

                {/* Staleness Threshold */}
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <label className="block text-sm font-semibold text-slate-400">
                      Staleness Threshold (Seconds)
                    </label>
                    <span
                      className="material-icons text-slate-500 text-sm cursor-help"
                      title="Max time allowed since the last price update"
                    >
                      info
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg pl-4 pr-12 py-3 text-sm font-mono focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                      type="number"
                      value={stalenessInput}
                      onChange={(e) => setStalenessInput(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs uppercase">
                      SEC
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 italic">
                    Recommended: 3600s (1 hour) for low-volatility pairs.
                  </p>
                </div>

                {(feeSuccess || oracleSuccess || thresholdSuccess) && (
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-xs text-primary font-medium">
                    Configuration updated successfully.
                  </div>
                )}
                {(feeError || oracleError || thresholdError) && (
                  <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-xs text-danger font-medium">
                    Error: {(feeError || oracleError || thresholdError)?.message?.slice(0, 100)}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleUpdateConfig}
                    disabled={configPending || configConfirming}
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-background-dark font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-icons">save</span>
                    {configPending
                      ? "Confirm in Wallet..."
                      : configConfirming
                      ? "Updating..."
                      : "Update Protocol Config"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Admin Actions Table */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-slate-500 text-lg">
              history
            </span>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
              Recent Admin Actions
            </h3>
          </div>
          <div className="bg-background-light dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-500">
                    Action
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-500">
                    Parameters
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-500">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {ADMIN_ACTIONS.map((action, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`font-medium ${
                          action.action === "WithdrawLiquidity"
                            ? "text-yellow-500"
                            : ""
                        }`}
                      >
                        {action.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-primary">
                        <span className="material-icons text-[14px]">
                          check_circle
                        </span>
                        {action.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">
                      {action.params}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {action.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 font-medium">
            RemitLink Protocol v1.0 — Sepolia Testnet | Powered by Chainlink
            Price Feeds
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-primary transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-primary transition-colors"
            >
              Smart Contract Audit
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-primary transition-colors"
            >
              Emergency Halt Guide
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
