import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { celo, celoAlfajores } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  omniWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Valora, CeloWallet, CeloDance } from "@celo/rainbowkit-celo/wallets";

const { chains, provider } = configureChains(
  [celoAlfajores],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains }),
      CeloWallet({ chains }),
      CeloDance({ chains }),
      omniWallet({ chains }),
      walletConnectWallet({ chains }),
      Valora({ chains }),
    ],
  },
]);

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
