import { Link, useLocation } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const navItems = [
  { path: "/swap", icon: "swap_calls", label: "Swap" },
  { path: "/wallet", icon: "account_balance_wallet", label: "Wallet" },
  { path: "/mint", icon: "add_circle", label: "Mint USDC" },
];

function truncateAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function Sidebar() {
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-border-dark flex flex-col h-screen sticky top-0 bg-white dark:bg-background-dark">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-icons text-background-dark font-bold">
            swap_horiz
          </span>
        </div>
        <span className="text-xl font-bold tracking-tight">RemitLink</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-slate-100 dark:hover:bg-card-dark text-slate-500 dark:text-slate-400"
              }`}
            >
              <span className="material-icons">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-3">
        {/* Wallet Connection */}
        {isConnected ? (
          <div className="space-y-2">
            <div className="bg-slate-100 dark:bg-card-dark p-3 rounded-xl">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                Connected Wallet
              </div>
              <div className="text-sm font-mono font-semibold text-slate-900 dark:text-white">
                {truncateAddress(address)}
              </div>
            </div>
            <button
              onClick={() => disconnect()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition-colors text-sm font-medium"
            >
              <span className="material-icons text-sm">logout</span>
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={openConnectModal}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-background-dark rounded-lg transition-colors font-semibold"
          >
            <span className="material-icons text-sm">account_balance_wallet</span>
            Connect Wallet
          </button>
        )}

        {/* Network Status */}
        <div className="bg-slate-100 dark:bg-card-dark p-4 rounded-xl border-t border-slate-200 dark:border-border-dark">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 uppercase font-semibold">
              Network
            </span>
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
          </div>
          <div className="text-sm font-medium">Sepolia Testnet</div>
        </div>
      </div>
    </aside>
  );
}
