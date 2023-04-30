import "@/styles/globals.css";
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

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}
