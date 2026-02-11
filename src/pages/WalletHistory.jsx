import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Sidebar from "../components/layout/Sidebar";
import { formatNumber } from "../utils/mockData";
import { formatUsdcBalance, formatPkrBalance } from "../utils/contracts";
import { useUsdcBalance, usePkrBalance, useExchangeRate } from "../hooks/useContracts";

export default function WalletHistory() {
  const { address } = useAccount();
  const { raw: rawUsdcBalance, formatted: usdcBalanceNum } = useUsdcBalance();
  const { raw: rawPkrBalance, formatted: pkrBalanceNum } = usePkrBalance();
  const { rate: exchangeRate } = useExchangeRate();

  const usdcDisplay = formatUsdcBalance(rawUsdcBalance);
  const pkrDisplay = formatPkrBalance(rawPkrBalance);
  const pkrInUsdc = exchangeRate > 0 ? pkrBalanceNum / exchangeRate : 0;
  const usdcInPkr = usdcBalanceNum * exchangeRate;

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display flex">
      <Sidebar />

      <main className="flex-1 p-8 min-h-screen">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              Wallet Balances
            </h1>
            <p className="text-text-muted text-sm flex items-center gap-2">
              <span className="material-icons text-xs">account_balance_wallet</span>
              View your USDC and dPKR token balances
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/swap"
              className="bg-primary hover:bg-primary/90 text-background-dark font-bold px-6 py-2 rounded-lg transition-all shadow-lg shadow-primary/20"
            >
              New Swap
            </Link>
            <ConnectButton />
          </div>
        </header>

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
