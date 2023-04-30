import Image from "next/image";
import { Inter } from "next/font/google";
import HomePage from "./Homepage";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [celoAlfajores, celo],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "CeloChat",
  projectId: "6e18bca83b6d8c08562669f22a83ca97",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <WagmiConfig client={wagmiClient}>
      <HomePage />
    </WagmiConfig>
  );
}
