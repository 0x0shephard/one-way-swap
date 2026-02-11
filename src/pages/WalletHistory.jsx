import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Sidebar from "../components/layout/Sidebar";
import { formatNumber } from "../utils/mockData";
import { formatUsdcBalance, formatPkrBalance, USDC_DECIMALS, PKR_DECIMALS, PRICE_FEED_DECIMALS } from "../utils/contracts";
import { useUsdcBalance, usePkrBalance, useExchangeRate, useSwapHistory } from "../hooks/useContracts";

export default function WalletHistory() {
  const { address } = useAccount();
  const { raw: rawUsdcBalance, formatted: usdcBalanceNum } = useUsdcBalance();
  const { raw: rawPkrBalance, formatted: pkrBalanceNum } = usePkrBalance();
  const { rate: exchangeRate } = useExchangeRate();
  const { swaps, isLoading: swapsLoading } = useSwapHistory(address);

  const usdcDisplay = formatUsdcBalance(rawUsdcBalance);
  const pkrDisplay = formatPkrBalance(rawPkrBalance);
  const pkrInUsdc = exchangeRate > 0 ? pkrBalanceNum / exchangeRate : 0;
  const usdcInPkr = usdcBalanceNum * exchangeRate;

  // Format swap data for display
  const formatSwapForDisplay = (swap) => {
    const usdcSent = Number(swap.usdcIn) / 10 ** USDC_DECIMALS;
    const pkrReceived = Number(swap.pkrOut) / 10 ** PKR_DECIMALS;
    const rate = Number(swap.rate) / 10 ** PRICE_FEED_DECIMALS;
    
    return {
      usdcSent,
      dpkrReceived: pkrReceived,
      chainlinkRate: rate,
      status: "Success",
      txHash: swap.transactionHash,
      date: new Date().toLocaleDateString(), // You could fetch block timestamp for accurate date
      time: new Date().toLocaleTimeString(),
    };
  };

  const formattedSwaps = swaps.map(formatSwapForDisplay);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display flex">
      <Sidebar />

      <main className="flex-1 p-8 min-h-screen">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              Wallet & History
            </h1>
            <p className="text-text-muted text-sm flex items-center gap-2">
              <span className="material-icons text-xs">schedule</span>
              Last updated: {new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-dark bg-card-dark text-white hover:bg-slate-800 transition-all">
              <span className="material-icons text-sm">download</span>
              <span>Export CSV</span>
            </button>
            <Link
              to="/swap"
              className="bg-primary hover:bg-primary/90 text-background-dark font-bold px-6 py-2 rounded-lg transition-all shadow-lg shadow-primary/20"
            >
              New Swap
            </Link>
            <ConnectButton />
          </div>
        </header>

        {/* Alert Banner */}
        <div className="mb-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-4">
          <span className="material-icons text-primary mt-0.5">info</span>
          <div>
            <h4 className="font-semibold text-primary text-sm">
              One-Way Remittance Policy
            </h4>
            <p className="text-text-muted text-sm leading-relaxed">
              RemitLink currently operates as a one-way bridge for migrant
              workers and remitters. You can swap USDC to dPKR, but reverse
              swaps (dPKR to USDC) are restricted to authorized liquidity
              providers only.
            </p>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* USDC Card */}
          <div className="bg-card-dark border border-border-dark rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-icons text-[120px] text-white">
                monetization_on
              </span>
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">
                    U
                  </div>
                </div>
                <div>
                  <p className="text-text-muted text-xs font-bold uppercase tracking-widest">
                    Available Balance
                  </p>
                  <h3 className="text-xl font-bold text-white uppercase">
                    USDC
                  </h3>
                </div>
              </div>
              <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded">
                ERC-20
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-white tracking-tight">
                {usdcDisplay}
              </span>
              <span className="text-text-muted mt-1">
                ≈ {formatNumber(usdcInPkr)} dPKR
              </span>
            </div>
          </div>

          {/* dPKR Card */}
          <div className="bg-card-dark border border-border-dark rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-all shadow-xl shadow-primary/5">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
              <span className="material-icons text-[120px]">
                account_balance
              </span>
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="material-icons text-primary">
                    currency_rupee
                  </span>
                </div>
                <div>
                  <p className="text-text-muted text-xs font-bold uppercase tracking-widest">
                    Current Balance
                  </p>
                  <h3 className="text-xl font-bold text-white uppercase">
                    dPKR
                  </h3>
                </div>
              </div>
              <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded">
                ERC-20
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-primary tracking-tight">
                {pkrDisplay}
              </span>
              <span className="text-text-muted mt-1">
                ≈ {formatNumber(pkrInUsdc)} USDC
              </span>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="bg-card-dark border border-border-dark rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-border-dark flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-icons text-text-muted">
                receipt_long
              </span>
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted flex items-center gap-1">
                <span className="material-icons text-[14px]">bolt</span>
                Powered by Chainlink Data Feeds
              </span>
            </div>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background-dark/30">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted text-right">
                    USDC Sent
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted text-right">
                    dPKR Received
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted text-center">
                    Chainlink Rate
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-text-muted text-right">
                    Tx ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark">
                {swapsLoading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="material-icons animate-spin text-primary">refresh</span>
                        <span className="text-text-muted">Loading transaction history...</span>
                      </div>
                    </td>
                  </tr>
                ) : formattedSwaps.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="material-icons text-4xl text-text-muted opacity-50">receipt_long</span>
                        <span className="text-text-muted">No transactions yet</span>
                        <Link to="/swap" className="text-primary text-sm hover:underline">
                          Make your first swap →
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  formattedSwaps.map((tx, i) => (
                    <tr
                      key={i}
                      className="hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-white">
                          {tx.date}
                        </p>
                        <p className="text-xs text-text-muted">{tx.time}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-sm font-bold text-white">
                          -{formatNumber(tx.usdcSent)}
                        </p>
                        <p className="text-[10px] text-text-muted">USDC</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-sm font-bold text-primary">
                          +{formatNumber(tx.dpkrReceived)}
                        </p>
                        <p className="text-[10px] text-text-muted">dPKR</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs font-mono bg-background-dark px-2 py-1 rounded text-text-muted">
                          1:{tx.chainlinkRate.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-primary">
                          <span className="material-icons text-sm">
                            check_circle
                          </span>
                          <span className="text-xs font-bold">{tx.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary/70 hover:text-primary transition-colors"
                          title="View on Etherscan"
                        >
                          <span className="material-icons text-sm">
                            open_in_new
                          </span>
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-border-dark flex items-center justify-between">
            <span className="text-xs text-text-muted">
              Showing {formattedSwaps.length} of {formattedSwaps.length} transactions
            </span>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-border-dark bg-background-dark/30 text-text-muted cursor-not-allowed">
                <span className="material-icons text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-border-dark bg-card-dark text-white hover:border-primary">
                <span className="material-icons text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <footer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
          <div className="flex items-center gap-3">
            <span className="material-icons text-primary/80">hub</span>
            <div>
              <p className="text-[10px] font-bold uppercase text-text-muted">
                Oracle Method
              </p>
              <p className="text-sm font-medium">Chainlink Price Feed</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-icons text-primary/80">security</span>
            <div>
              <p className="text-[10px] font-bold uppercase text-text-muted">
                Bridge Security
              </p>
              <p className="text-sm font-medium">Fully Collateralized</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-icons text-primary/80">public</span>
            <div>
              <p className="text-[10px] font-bold uppercase text-text-muted">
                Infrastructure
              </p>
              <p className="text-sm font-medium">Smart Contracts Audited</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
