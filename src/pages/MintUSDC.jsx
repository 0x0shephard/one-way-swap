import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Sidebar from "../components/layout/Sidebar";
import { formatUsdcBalance } from "../utils/contracts";
import { useUsdcBalance, useMintUsdc } from "../hooks/useContracts";

export default function MintUSDC() {
  const { address, isConnected } = useAccount();
  const { raw: rawUsdcBalance, formatted: usdcBalance, refetch: refetchBalance } = useUsdcBalance();
  const [customAmount, setCustomAmount] = useState("");

  const {
    mint,
    isPending: mintPending,
    isConfirming: mintConfirming,
    isSuccess: mintSuccess,
    error: mintError,
  } = useMintUsdc();

  // Refetch balance after successful mint
  useEffect(() => {
    if (mintSuccess) {
      refetchBalance();
      setCustomAmount("");
    }
  }, [mintSuccess, refetchBalance]);

  const handleMint = (amount) => {
    mint(amount);
  };

  const handleCustomMint = () => {
    const amount = parseFloat(customAmount);
    if (amount > 0) {
      mint(amount);
    }
  };

  const quickMintAmounts = [100, 500, 1000, 5000];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display flex">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
              Mint Test USDC
            </h1>
            <p className="text-text-muted text-sm flex items-center gap-2">
              <span className="material-icons text-xs">info</span>
              Sepolia Testnet Only - Get free test USDC for development
            </p>
          </div>
          <ConnectButton />
        </header>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {/* Alert Banner */}
          <div className="mb-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-4">
            <span className="material-icons text-blue-500 mt-0.5">info</span>
            <div>
              <h4 className="font-semibold text-blue-500 text-sm mb-1">
                Test Network Only
              </h4>
              <p className="text-text-muted text-sm leading-relaxed">
                This minting feature only works on Sepolia testnet. These tokens have no real value and are used for testing purposes only.
              </p>
            </div>
          </div>

          {/* Current Balance Card */}
          <div className="mb-8 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
                  Your Current USDC Balance
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">
                    {formatUsdcBalance(rawUsdcBalance)}
                  </span>
                  <span className="text-lg text-slate-500 dark:text-slate-400 font-semibold">
                    USDC
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-400">
                  U
                </div>
              </div>
            </div>
          </div>

          {/* Quick Mint Buttons */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Quick Mint</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickMintAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleMint(amount)}
                  disabled={!isConnected || mintPending || mintConfirming}
                  className="p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      USDC
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Custom Amount</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Enter custom amount
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 dark:text-white"
                      disabled={!isConnected || mintPending || mintConfirming}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-semibold text-sm">
                      USDC
                    </div>
                  </div>
                  <button
                    onClick={handleCustomMint}
                    disabled={!isConnected || mintPending || mintConfirming || !customAmount || parseFloat(customAmount) <= 0}
                    className="px-8 py-3 bg-primary hover:bg-primary/90 text-background-dark font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 flex items-center gap-2"
                  >
                    {mintPending ? (
                      <>
                        <span className="material-icons text-sm animate-spin">refresh</span>
                        Confirm...
                      </>
                    ) : mintConfirming ? (
                      <>
                        <span className="material-icons text-sm animate-spin">refresh</span>
                        Minting...
                      </>
                    ) : (
                      <>
                        <span className="material-icons text-sm">add_circle</span>
                        Mint
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status Messages */}
              {mintSuccess && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
                  <span className="material-icons text-primary">check_circle</span>
                  <div>
                    <p className="text-primary font-semibold text-sm">
                      USDC Minted Successfully!
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      Your balance has been updated
                    </p>
                  </div>
                </div>
              )}

              {mintError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                  <span className="material-icons text-red-500">error</span>
                  <div>
                    <p className="text-red-500 font-semibold text-sm">
                      Minting Failed
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      {mintError.message?.slice(0, 100)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-100 dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark">
              <div className="flex items-start gap-3">
                <span className="material-icons text-primary">security</span>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Safe & Free</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    These are test tokens with no real value. Mint as many as you need for testing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark">
              <div className="flex items-start gap-3">
                <span className="material-icons text-blue-500">speed</span>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Instant Minting</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Tokens appear in your wallet within seconds after transaction confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Not Connected State */}
          {!isConnected && (
            <div className="mt-8 p-8 bg-slate-100 dark:bg-card-dark border-2 border-dashed border-slate-300 dark:border-border-dark rounded-xl text-center">
              <span className="material-icons text-5xl text-slate-400 mb-4">
                account_balance_wallet
              </span>
              <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                You need to connect your wallet to mint test USDC
              </p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
