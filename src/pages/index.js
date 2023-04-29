import Image from "next/image";
import { Inter } from "next/font/google";
import HomePage from "./Homepage";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { celoAlfajores } from "wagmi/chains";

const inter = Inter({ subsets: ["latin"] });
const chains = [celoAlfajores];
const { provider, webSocketProvider } = configureChains(
  [celoAlfajores],
  [publicProvider()]
);

const client = createClient({
  provider,
  webSocketProvider,
});

export default function Home() {
  return (
    <WagmiConfig client={client}>
      <HomePage></HomePage>
    </WagmiConfig>
  );
}
