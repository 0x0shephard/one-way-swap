export default function ProcessingModal({ isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card-dark rounded-xl overflow-hidden border border-border-dark">
        <div className="p-10 flex flex-col items-center text-center">
          {/* Animated Spinner */}
          <div className="relative mb-10 mt-4">
            <div className="w-32 h-32 rounded-full border-4 border-border-dark flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center">
                <span className="material-icons text-primary text-4xl">
                  sync
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-100 mb-3 tracking-tight">
            Processing Remittance...
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8 max-w-[280px]">
            Sending USDC to the portal. Please confirm the transaction in your
            connected wallet.
          </p>

          {/* Steps Indicator */}
          <div className="flex gap-2 mb-8">
            <div className="h-1.5 w-12 bg-primary rounded-full"></div>
            <div className="h-1.5 w-12 bg-border-dark rounded-full"></div>
            <div className="h-1.5 w-12 bg-border-dark rounded-full"></div>
          </div>

          {/* Warning */}
          <div className="bg-card-dark border border-border-dark rounded-lg p-3 w-full flex items-center gap-3 mb-6">
            <span className="material-icons text-primary text-sm">info</span>
            <p className="text-[13px] text-slate-400 font-medium">
              Do not close this window or refresh the page.
            </p>
          </div>

          {/* Explorer Link */}
          <div className="w-full pt-6 border-t border-border-dark flex flex-col items-center">
            <a
              href="#"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              <span>View on Blockchain Explorer</span>
              <span className="material-icons text-[16px]">
                open_in_new
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
