import "@/styles/globals.css";
import Wagmi from "./CleanProvider";

export default function App({ Component, pageProps }) {
  return;
  <Wagmi>
    <Component {...pageProps} />
  </Wagmi>;
}
