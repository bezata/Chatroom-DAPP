import { useState } from "react";
import Logo from "./logo.jsx";
import ConnectIt from "@/web3stuff/Provider.jsx";
import Link from "next/link.js";
import CeloChat from "./api/CeloChat.abi.json";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";

const contractAddress = "0xFCA26B09189D65B2d95772F8a31d538Bc3b936D3";
const contractABI = CeloChat;

const HomePage = () => {
  const [isMember, setIsMember] = useState(false);

  const { data } = useContractRead({
    address: contractAddress,
    abi: CeloChat,
    functionName: "checkMembership",
  });

  const handleJoinChatClick = () => {
    console.log(data);
  };

  const handlePayNowClick = async () => {};

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col">
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
            : "To access the chat, please buy some Celo Chat Tokens."}
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-red-500 hover:to-yellow-500 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300"
            onClick={handleJoinChatClick}
          >
            Join Chat
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-gray-300 text-sm py-6 px-8 flex justify-end">
        <p className="mr-4">Check out my GitHub:</p>
        <a
          href="https://github.com/bezata"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          bezata
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
