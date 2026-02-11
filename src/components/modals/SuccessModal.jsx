export default function SuccessModal({
  isOpen,
  sentAmount,
  receivedAmount,
  rate,
  txHash,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl overflow-hidden">
          {/* Success Icon & Header */}
          <div className="pt-10 pb-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-background-dark">
                <span className="material-icons text-4xl font-bold">check</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Success!
            </h2>
            <p className="text-gray-500 dark:text-slate-400 mt-2">
              Your remittance has been processed.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="px-8 pb-8">
            <div className="bg-background-light dark:bg-background-dark rounded-lg p-6 border border-gray-100 dark:border-border-dark">
              {/* Sent */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-slate-500 font-semibold">
                    Sent
                  </span>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {sentAmount} USDC
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">
                  USDC
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full border-t border-gray-200 dark:border-border-dark"></div>
                <div className="absolute bg-background-light dark:bg-card-dark px-2">
                  <span className="material-icons text-primary text-sm">
                    swap_vert
                  </span>
                </div>
              </div>

              {/* Received */}
              <div className="flex justify-between items-center mt-6">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-slate-500 font-semibold">
                    Received
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {receivedAmount} dPKR
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-xs">dPKR</span>
                </div>
              </div>

              {/* Rate */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-border-dark flex justify-between text-sm">
                <span className="text-gray-500 dark:text-slate-500">
                  Final Rate
                </span>
                <span className="text-gray-900 dark:text-gray-300 font-medium">
                  1 USD = {rate} PKR
                </span>
              </div>
            </div>

            {/* Transaction Hash */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-widest">
              <span>TX: {txHash}</span>
              <button className="hover:text-primary transition-colors">
                <span className="material-icons text-[12px]">
                  content_copy
                </span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <span>View on Block Explorer</span>
                <span className="material-icons text-sm">open_in_new</span>
              </button>
              <button
                onClick={onClose}
                className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-border-dark text-gray-600 dark:text-slate-400 font-semibold py-3 rounded-lg border border-slate-200 dark:border-border-dark transition-colors"
              >
                Done
              </button>
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-gray-50 dark:bg-background-dark py-4 px-8 flex items-center justify-center gap-2 border-t border-gray-100 dark:border-border-dark">
            <span className="material-icons text-slate-500 text-base">
              verified_user
            </span>
            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium uppercase tracking-[0.2em]">
              Secured by RemitLink Protocol
            </span>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500 dark:text-slate-500">
          Need help?{" "}
          <a
            href="#"
            className="text-primary hover:text-primary/80 underline transition-colors"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
