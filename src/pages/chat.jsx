import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { celo, celoAlfajores, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import NonSSRWrapper from "./SSR";
import ChatLogic from "./ChatLogic";

const { chains, provider } = configureChains(
  [celoAlfajores, celo, sepolia],
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

const ChatApp = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <NonSSRWrapper>
        <ChatLogic></ChatLogic>
      </NonSSRWrapper>
    </WagmiConfig>
  );
};

export default ChatApp;
