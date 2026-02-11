import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RemitLink",
  projectId: "2c08e3754f6181db1c605078964be359",
  chains: [sepolia],
});
