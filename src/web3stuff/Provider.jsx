import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const { chains, provider } = configureChains(
  [celoAlfajores, celo],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
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
const ConnectIt = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          ...darkTheme.accentColors.purple,
        })}
      >
        <ConnectButton />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ConnectIt;
