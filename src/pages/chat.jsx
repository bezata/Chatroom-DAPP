import React, { useState, useEffect } from "react";
import Logo from "./logo";
import Link from "next/link";
import ConnectIt from "@/web3stuff/Provider";

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [lastActiveTime, setLastActiveTime] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_BASE_URL}/stream`
    );
    eventSource.onmessage = (event) => {
      const { data } = event;
      const message = JSON.parse(data);
      setChat((prevChat) => [...prevChat, message]);
      setLastActiveTime(new Date());
    };
    return () => {
      eventSource.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const now = new Date();
      const newMessage = {
        id: chat.length + 1,
        sender: "You",
        message: message,
      };
      setChat([...chat, newMessage]);
      setMessage("");
      setLastActiveTime(now);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between absolute w-full z-10 px-8 py-6 ">
        <div className="flex items-center"></div>
        <div className="flex items-center space-x-4"></div>
        <ConnectIt></ConnectIt>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex flex-col justify-between">
        <div className="h-80 overflow-y-scroll flex-grow">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div>
                <Link href="/" className="flex items-center">
                  <Logo />
                </Link>
              </div>
              <div>
                <Link
                  href="/Homepage"
                  className="text-lg font-semibold text-white"
                >
                  Chatroom
                </Link>
                <p className="text-gray-300 text-sm">
                  {lastActiveTime &&
                    `Last active at ${lastActiveTime.toLocaleString()}`}
                </p>
              </div>
            </div>
            {chat.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.sender === "You"
                    ? "bg-purple-500 ml-auto w-max"
                    : "bg-white"
                } px-4 py-2 rounded-xl mb-2`}
              >
                <p
                  className={`${
                    message.sender === "You" ? "text-white" : "text-black"
                  } text-sm font-medium`}
                >
                  <span className="text-gray-400 mr-2">{message.sender}:</span>
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 p-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message"
              className="rounded-full py-2 px-4 w-full bg-gray-900 text-white border-none focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-full ml-4 hover:bg-purple-600 transition duration-300"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
