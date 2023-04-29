import React from "react";
import Link from "next/link";
import Logo from "./logo.jsx";
import ConnectIt from "@/web3stuff/Provider.jsx";

const HomePage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between absolute w-full z-10 px-8 py-6">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <div className="flex items-center">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-red-500 hover:to-yellow-500 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300">
            Pay Now
          </button>
          <ConnectIt></ConnectIt>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">
          Welcome to Celo Chat!
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-300 text-center mb-8">
          To access the chat, please buy some Celo Chat Tokens.
        </p>
        <Link
          href="/Chat"
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-red-500 hover:to-yellow-500 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-md transition duration-300"
        >
          Join Chat
        </Link>
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
