import "@rainbow-me/rainbowkit/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { config } from "./wagmi";
import WalletOnboarding from "./pages/WalletOnboarding";
import SwapDashboard from "./pages/SwapDashboard";
import WalletHistory from "./pages/WalletHistory";
import MintUSDC from "./pages/MintUSDC";
import ConnectGuard from "./components/ConnectGuard";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({ accentColor: "#19e66b", accentColorForeground: "#112117" })}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<WalletOnboarding />} />
              <Route path="/swap" element={<ConnectGuard><SwapDashboard /></ConnectGuard>} />
              <Route path="/wallet" element={<ConnectGuard><WalletHistory /></ConnectGuard>} />
              <Route path="/mint" element={<ConnectGuard><MintUSDC /></ConnectGuard>} />
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
