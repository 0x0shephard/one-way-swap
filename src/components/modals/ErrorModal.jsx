export default function ErrorModal({ isOpen, onRetry, onDismiss }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md rounded-xl overflow-hidden border border-red-900 bg-[#1a1111]">
        <div className="p-8 flex flex-col items-center text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="bg-red-600/10 w-20 h-20 rounded-full flex items-center justify-center border-2 border-red-600/30">
              <span className="material-icons text-red-500 text-5xl">
                report_problem
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
            Transaction Failed
          </h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            We encountered an issue while processing your remittance request. The
            funds have not been moved from your wallet.
          </p>

          {/* Error Reason */}
          <div className="w-full rounded-lg p-4 mb-6 text-left flex gap-3 bg-red-600/5 border border-red-600/20">
            <span className="material-icons text-red-500 text-xl">info</span>
            <div>
              <p className="text-sm font-semibold text-red-500 mb-1 uppercase tracking-wider">
                Reason
              </p>
              <p className="text-sm text-slate-200">
                Exchange rate is temporarily unavailable (Stale Oracle). Please
                wait a few moments and try again.
              </p>
            </div>
          </div>

          {/* Developer Log */}
          <details className="w-full group mb-8">
            <summary className="flex items-center justify-between cursor-pointer list-none py-2 px-3 bg-slate-800/40 rounded-lg border border-slate-700 hover:bg-slate-800/60 transition-colors">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                Developer Error Log
              </span>
              <span className="material-icons text-slate-500 text-sm group-open:rotate-180 transition-transform">
                expand_more
              </span>
            </summary>
            <div className="mt-2 p-3 bg-black/40 rounded-lg border border-slate-700 text-left">
              <code className="text-[11px] font-mono text-red-400/80 break-all leading-tight">
                Error: execution reverted: Price older than 3600s
                <br />
                at Contract.Swap (0x7a25...488d)
                <br />
                at RPC.Response (ChainID: 137)
                <br />
                Timestamp: 171542389201
              </code>
            </div>
          </details>

          {/* Action Buttons */}
          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onRetry}
              className="w-full py-3.5 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-icons text-lg">refresh</span>
              Try Again
            </button>
            <button
              onClick={onDismiss}
              className="w-full py-3.5 px-6 bg-transparent hover:bg-slate-800 text-slate-300 font-medium rounded-lg transition-colors border border-slate-700"
            >
              Dismiss
            </button>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Need help?{" "}
            <a href="#" className="text-red-400 hover:underline font-medium">
              Contact RemitLink Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
