import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useBlockNumber, useReadContracts } from "wagmi";
import { useEffect, useState } from "react";
import { getContract, createPublicClient, http } from "viem";
import { sepolia } from "wagmi/chains";
import {
  USDC_ADDRESS,
  PKR_TOKEN_ADDRESS,
  REMITTANCE_PORTAL_ADDRESS,
  PRICE_FEED_ADDRESS,
  USDC_DECIMALS,
  PKR_DECIMALS,
  PRICE_FEED_DECIMALS,
  mockUsdcAbi,
  pkrTokenAbi,
  remittancePortalAbi,
  priceFeedAbi,
  parseUsdcAmount,
} from "../utils/contracts";

// ── Balance Hooks ─────────────────────────────────────────────────────

export function useUsdcBalance() {
  const { address } = useAccount();
  const result = useReadContract({
    abi: mockUsdcAbi,
    address: USDC_ADDRESS,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const raw = result.data;
  const formatted = raw ? Number(raw) / 10 ** USDC_DECIMALS : 0;

  return { raw, formatted, ...result };
}

export function usePkrBalance() {
  const { address } = useAccount();
  const result = useReadContract({
    abi: pkrTokenAbi,
    address: PKR_TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const raw = result.data;
  const formatted = raw ? Number(raw) / 10 ** PKR_DECIMALS : 0;

  return { raw, formatted, ...result };
}

// ── Price Feed ────────────────────────────────────────────────────────

export function useExchangeRate() {
  const result = useReadContract({
    abi: priceFeedAbi,
    address: PRICE_FEED_ADDRESS,
    functionName: "latestRoundData",
  });

  const roundData = result.data;
  // answer is int256 with 8 decimals (e.g. 27845000000 = 278.45)
  const rate = roundData ? Number(roundData[1]) / 10 ** PRICE_FEED_DECIMALS : 0;
  const updatedAt = roundData ? Number(roundData[3]) : 0;

  return { rate, updatedAt, ...result };
}

// ── Portal Read Hooks ─────────────────────────────────────────────────

export function useFeeBps() {
  return useReadContract({
    abi: remittancePortalAbi,
    address: REMITTANCE_PORTAL_ADDRESS,
    functionName: "feeBps",
  });
}

export function useVaultBalance() {
  const result = useReadContract({
    abi: remittancePortalAbi,
    address: REMITTANCE_PORTAL_ADDRESS,
    functionName: "vaultBalance",
  });

  const raw = result.data;
  const formatted = raw ? Number(raw) / 10 ** USDC_DECIMALS : 0;

  return { raw, formatted, ...result };
}

export function usePortalOwner() {
  return useReadContract({
    abi: remittancePortalAbi,
    address: REMITTANCE_PORTAL_ADDRESS,
    functionName: "owner",
  });
}

export function useOracleAddress() {
  return useReadContract({
    abi: remittancePortalAbi,
    address: REMITTANCE_PORTAL_ADDRESS,
    functionName: "oracle",
  });
}

export function useStalenessThreshold() {
  return useReadContract({
    abi: remittancePortalAbi,
    address: REMITTANCE_PORTAL_ADDRESS,
    functionName: "oracleStalenessThreshold",
  });
}

export function usePreviewSwap(usdcAmount) {
  const rawAmount = usdcAmount > 0 ? parseUsdcAmount(usdcAmount) : undefined;
  const result = useReadContract({
    abi: remittancePortalAbi,
    address: REMITTANCE_PORTAL_ADDRESS,
    functionName: "previewSwap",
    args: rawAmount ? [rawAmount] : undefined,
    query: { enabled: !!rawAmount && usdcAmount > 0 },
  });

  const raw = result.data;
  const formatted = raw ? Number(raw) / 10 ** PKR_DECIMALS : 0;

  return { raw, formatted, ...result };
}

// ── Allowance ─────────────────────────────────────────────────────────

export function useUsdcAllowance() {
  const { address } = useAccount();
  const result = useReadContract({
    abi: mockUsdcAbi,
    address: USDC_ADDRESS,
    functionName: "allowance",
    args: address ? [address, REMITTANCE_PORTAL_ADDRESS] : undefined,
    query: { enabled: !!address },
  });

  const raw = result.data;
  const formatted = raw ? Number(raw) / 10 ** USDC_DECIMALS : 0;

  return { raw, formatted, ...result };
}

// ── Write Hooks ───────────────────────────────────────────────────────

export function useApproveUsdc() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approve = (usdcAmount) => {
    writeContract({
      abi: mockUsdcAbi,
      address: USDC_ADDRESS,
      functionName: "approve",
      args: [REMITTANCE_PORTAL_ADDRESS, parseUsdcAmount(usdcAmount)],
    });
  };

  return { approve, hash, isPending, isConfirming, isSuccess, error };
}

export function useSwap() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const swap = (usdcAmount) => {
    writeContract({
      abi: remittancePortalAbi,
      address: REMITTANCE_PORTAL_ADDRESS,
      functionName: "swapUSDCForPKR",
      args: [parseUsdcAmount(usdcAmount)],
    });
  };

  return { swap, hash, isPending, isConfirming, isSuccess, error };
}

export function useMintUsdc() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const mint = (usdcAmount) => {
    writeContract({
      abi: mockUsdcAbi,
      address: USDC_ADDRESS,
      functionName: "mint",
      args: [parseUsdcAmount(usdcAmount)],
    });
  };

  return { mint, hash, isPending, isConfirming, isSuccess, error };
}

// ── Admin Write Hooks ─────────────────────────────────────────────────

export function useWithdrawLiquidity() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const withdraw = (toAddress, usdcAmount) => {
    writeContract({
      abi: remittancePortalAbi,
      address: REMITTANCE_PORTAL_ADDRESS,
      functionName: "withdrawLiquidity",
      args: [toAddress, parseUsdcAmount(usdcAmount)],
    });
  };

  return { withdraw, hash, isPending, isConfirming, isSuccess, error };
}

export function useSetFee() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const setFee = (feeBps) => {
    writeContract({
      abi: remittancePortalAbi,
      address: REMITTANCE_PORTAL_ADDRESS,
      functionName: "setFee",
      args: [BigInt(feeBps)],
    });
  };

  return { setFee, hash, isPending, isConfirming, isSuccess, error };
}

export function useSetOracle() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const setOracle = (oracleAddress) => {
    writeContract({
      abi: remittancePortalAbi,
      address: REMITTANCE_PORTAL_ADDRESS,
      functionName: "setOracle",
      args: [oracleAddress],
    });
  };

  return { setOracle, hash, isPending, isConfirming, isSuccess, error };
}

export function useSetStalenessThreshold() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const setThreshold = (seconds) => {
    writeContract({
      abi: remittancePortalAbi,
      address: REMITTANCE_PORTAL_ADDRESS,
      functionName: "setStalenessThreshold",
      args: [BigInt(seconds)],
    });
  };

  return { setThreshold, hash, isPending, isConfirming, isSuccess, error };
}

// ── Event Hooks ───────────────────────────────────────────────────────

export function useSwapHistory(userAddress) {
  const [swaps, setSwaps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: blockNumber } = useBlockNumber({ watch: true });

  useEffect(() => {
    if (!userAddress) {
      setSwaps([]);
      return;
    }

    const fetchSwaps = async () => {
      setIsLoading(true);
      try {
        const publicClient = createPublicClient({
          chain: sepolia,
          transport: http(),
        });

        const logs = await publicClient.getContractEvents({
          address: REMITTANCE_PORTAL_ADDRESS,
          abi: remittancePortalAbi,
          eventName: "SwapExecuted",
          args: {
            user: userAddress,
          },
          fromBlock: BigInt(0),
          toBlock: "latest",
        });

        const formattedSwaps = logs.map((log) => ({
          user: log.args.user,
          usdcIn: log.args.usdcIn,
          pkrOut: log.args.pkrOut,
          rate: log.args.rate,
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash,
        }));

        setSwaps(formattedSwaps.reverse()); // Most recent first
      } catch (error) {
        console.error("Error fetching swap history:", error);
        setSwaps([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSwaps();
  }, [userAddress, blockNumber]);

  return { swaps, isLoading };
}
