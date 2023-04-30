import { useState } from "react";
import Logo from "./logo.jsx";
import ConnectIt from "@/web3stuff/Provider.jsx";
import Link from "next/link.js";
import CeloChat from "./api/CeloChat.abi.json";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
} from "wagmi";
import Head from "next/head";

const contractAddress = "0xd52cF44380CAF316DfF44A06B1c310BA2D78F716";
const contractABI = CeloChat;

const HomePage = () => {
  const { address } = useAccount();
  const [newFee, setMembershipFee] = useState(0);

  const { data: isMember } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "checkMembership",
    args: [address],
    watch: true,
  });

  const { data: membershipFee } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "getMembershipFee",
    onSuccess(membershipFee) {
      let newFee = membershipFee.toNumber();
      setMembershipFee(newFee);
    },
  });

  const { config: join, error: joinError } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "joinChatRoom",
    overrides: {
      value: membershipFee,
    },
  });

  const { isLoading: loadingJoin, write: joinChatRoom } =
    useContractWrite(join);

  const handleJoinChatClick = async () => {
    if (isMember) {
      // Redirect the user to the chat page if they are a member
      window.location.href = "/Chat";
    } else {
      try {
        await joinChatRoom?.();
      } catch (error) {}
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col">
      <Head>
        <title>Celo Chatroom</title>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {/* Navbar */}
      <nav className="flex items-center justify-between absolute w-full z-10 px-8 py-6">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <div className="flex items-center">
          <ConnectIt />
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">
          Welcome to Celo Chat!
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-300 text-center mb-8">
          {isMember
            ? "You are a member of Celo Chat. Click the button below to join the chat."
            : `To access the chat, please pay ${newFee} CELO wei. `}
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-500 hover:to-black-300 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300"
            onClick={handleJoinChatClick}
            disabled={loadingJoin || isMember}
          >
            {isMember
              ? "Fee Paid"
              : loadingJoin
              ? "Loading..."
              : "Pay Membership Fee"}
          </button>
          <button
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-500 hover:to-black-300 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300"
            onClick={handleJoinChatClick}
            disabled={loadingJoin || !isMember}
          >
            {loadingJoin ? "Loading..." : "Join Chat"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-gray-300 text-sm py-6 px-8 flex justify-end">
        <div>
          <a
            href="https://github.com/bezata"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Check my github: bezata
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
