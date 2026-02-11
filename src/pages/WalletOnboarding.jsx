import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const wallets = [
  {
    name: "MetaMask",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuC90m9U8nKTrdv_5149AYuwXUnNSQJU5bhNFjBl9xGAcwY9U23l6iEgTUIEQxoTfAg8Hex5wLV2zwIgT5C7XaNR_Q2e4p_4AuGfxIrd4ruN3vENRDiixzhj0Cgut4Irx7QQbR1SIgS88D0fju0s6kvR3Ww0VmRaPt9RUpjD9gXfq16tr9hXceHoF_BNYny3l2siQmDuj0Sdykm8XFyXxSdRyZqzwoSyFLpJo4IVbTLzzyALIwleXexk-zl2BJPDbUlj30xXOZhqJBE",
  },
  {
    name: "Coinbase Wallet",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5ZNHvxJzxER3RMxKlMkhaDuTv8orLJQUgkduFOp14oIf7ch9fHhY9wHMGW2Lhqqy5YYBVjAH2Qlxzx7qoupBNNl8QE5kLd1gFcn85dw5d6OAXlFcSM4Gx1iMoIscp7HaBrXs0QdWDKNq2PezVuTzgF2OaMXd9-_-Ey_lK6d4z9NgoggkBjbd0EDnLa9WLVtXI5QHskBO4zD1Vgtfw7tMvmE4ePQMDyIUZTDoam8eIx4y8HUSPeuvlelw5B_yBMme-ltbFIwlxx-s",
  },
  {
    name: "WalletConnect",
    icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8hRtsDBxkZJo8f5H-s82SlI-9c-0odjXRNovsu6_F6I4tI-ABsMEPdKOmQkZAK37Xb50aHt4Oai5W-kh8EoYOTj402UDrCZntuHPntR9oA6vGxOIS87WtscEBNViExvhNDt_bezB_Q3USQ4R0CGlIrb0IwokXgbpGKnAFNtENY23_MJj_-Rip3LmWX48PBg991HVivLwyQlP9WH1OYi1sVncKM8fR7pzdH9FOCWFVfzxx4TryU2csQ9A5h-z1Q15KXvbTB5zElXY",
  },
];

export default function WalletOnboarding() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  // Auto-navigate to swap when wallet connects
  useEffect(() => {
    if (isConnected) {
      navigate("/swap");
    }
  }, [isConnected, navigate]);

  const handleConnect = () => {
    openConnectModal?.();
  };

  return (
    <div className="bg-[#111111] text-slate-100 min-h-screen flex items-center justify-center p-6 font-display">
      {/* Main Content */}
      <main className="relative z-10 w-full max-w-[480px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1132d4] rounded-lg flex items-center justify-center">
              <span className="material-icons text-white">swap_horiz</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Remit<span className="text-[#1132d4]">Link</span>
            </span>
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-[#191919] rounded-xl p-8 md:p-10 border border-[#2a2a2a]">
          {/* Value Prop */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
              The Bridge to dPKR
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              Fast, secure USDC to Digital Rupee conversion. Seamlessly bridge
              your assets to the dPKR ecosystem.
            </p>

            {/* Bridge Visualizer */}
            <div className="flex items-center justify-center gap-4 py-4 px-6 bg-[#111111] rounded-xl border border-[#2a2a2a]">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                  <img
                    alt="USDC Logo"
                    className="w-7 h-7"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQbxse9VNFQ9tVuKHrwvbwvly1kdQCQFCacn_0WryGrv2I6a9O6dJ72XoZ-MMKHR2ACjUkSx4MUW2pmFDDghmG4nuYxDEK1ZZziVVpmfMi-L9pZuYVKT55002AtaXKKeY2AWh6uWd08fijH0xr02-DcMufswAQVhobMhjdh00AG_AJxhfntxe53dqyHp4f7FOwtMvlTOnUpVl-vLaTAbZLPfFRWlmtXaMQel_nHA78g_9ULIRbsJr8e03CB-lsdkhpBTXYEJprNVM"
                  />
                </div>
                <span className="text-xs font-semibold text-blue-400">
                  USDC
                </span>
              </div>

              <div className="flex flex-col items-center flex-1">
                <span className="material-icons text-[#1132d4] mb-1">
                  trending_flat
                </span>
                <div className="h-[1px] w-full bg-[#2a2a2a]"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-2">
                  <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    dPKR
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-500">
                  dPKR
                </span>
              </div>
            </div>
          </div>

          {/* Wallet List */}
          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 text-center">
              Connect your wallet to start
            </p>

            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={handleConnect}
                className="w-full flex items-center justify-between p-4 bg-[#111111] hover:bg-[#1132d4]/10 border border-[#2a2a2a] hover:border-[#1132d4]/40 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#222222] rounded-lg flex items-center justify-center">
                    <img
                      alt={wallet.name}
                      className="w-6 h-6"
                      src={wallet.icon}
                    />
                  </div>
                  <span className="font-medium">{wallet.name}</span>
                </div>
                <span className="material-icons text-slate-500 group-hover:text-[#1132d4] transition-colors">
                  chevron_right
                </span>
              </button>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
            <div className="flex gap-3 items-start opacity-60">
              <span className="material-icons text-xs mt-0.5">info</span>
              <p className="text-[11px] leading-relaxed text-slate-400">
                RemitLink is a one-way bridge. Swaps from USDC to dPKR are final
                and cannot be reversed via this interface. Ensure your receiving
                address is correct.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 mt-8">
          <a
            href="#"
            className="text-xs text-slate-500 hover:text-[#1132d4] transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-xs text-slate-500 hover:text-[#1132d4] transition-colors"
          >
            Documentation
          </a>
          <a
            href="#"
            className="text-xs text-slate-500 hover:text-[#1132d4] transition-colors"
          >
            Security Audit
          </a>
        </div>
      </main>
    </div>
  );
}
