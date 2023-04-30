import { useState } from "react";
import Logo from "./logo";
import Link from "next/link";
import ConnectIt from "@/web3stuff/Provider";
import CeloChat from "./api/CeloChat.abi.json";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
} from "wagmi";

const contractAddress = "0x270338542f3430bC7d5b9bB4a498241356a47f81";
const contractABI = CeloChat;

const ChatLogic = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [lastActiveTime, setLastActiveTime] = useState(null);

  const { data: messages } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "getAllMessages",
    watch: true,
  });

  const { config: messageConfig, error: messageError } =
    usePrepareContractWrite({
      address: contractAddress,
      abi: contractABI,
      functionName: "sendMessage",
      args: [message],
    });

  const { address } = useAccount();

  const { isLoading: loadingMessage, write: sendMessage } =
    useContractWrite(messageConfig);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      try {
        await sendMessage?.();
      } catch (error) {}
    }
    const now = new Date();
    setMessage("");
    setLastActiveTime(now);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col overflow-hidden relative">
      {/* Navbar */}
      <nav className="flex items-center justify-between absolute w-full z-10 px-8 py-6 ">
        <div className="relative z-20 flex items-center">
          <Link href="/" className="flex items-center">
            <Logo className="h-8 mr-2" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-white">Chatroom</h1>
            <p className="text-gray-300 text-sm">
              {lastActiveTime
                ? `Room last active at ${lastActiveTime.toLocaleString()}`
                : ""}
            </p>
          </div>
        </div>
        <div className="relative z-20 flex items-center">
          <ConnectIt />
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex flex-col justify-between">
        <div className="h-80 overflow-y-scroll flex-grow mt-12">
          <div className="p-4">
            <div className="flex items-center mb-4"></div>
            {chat.map((chatMessage, index) => (
              <div
                key={index}
                className={`${
                  chatMessage.address === address
                    ? "text-green-400 justify-end"
                    : "text-white"
                } flex items-start mb-4`}
              >
                <div
                  className={`${
                    chatMessage.address === address
                      ? "bg-green-400"
                      : "bg-gray-700"
                  } rounded-xl p-4`}
                >
                  <p className="text-white">{chatMessage.message}</p>
                </div>
              </div>
            ))}
            {messages &&
              messages.map(({ sender, message }, index) => (
                <div key={index} className="flex justify-end mb-4">
                  <div className="bg-gray-900 rounded-xl p-4 max-w-xs break-all relative">
                    <p className="text-white text-sm">{message}</p>
                    <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                    <p className="text-gray-400 text-xs">{sender}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center">
            <input
              type="text"
              className="bg-gray-700 rounded-full w-full py-2 px-4 text-white"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-500 hover:to-black-300 rounded-full py-2 px-4 ml-4 text-white disabled:opacity-50"
              onClick={handleSendMessage}
              disabled={loadingMessage || message.trim() === ""}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatLogic;
