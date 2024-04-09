import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:4000";

export default function Chat() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#fce006");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socketRef = useRef();

  const chineseCharacters = [
    "伟",
    "芳",
    "秀英",
    "敏",
    "静",
    "丽",
    "强",
    "磊",
    "洋",
    "勇",
    "艳",
    "杰",
    "娟",
    "涛",
    "明",
    "超",
    "秀兰",
    "霞",
    "平",
    "刚",
    "桂英",
  ];

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const joinChat = (e) => {
    e.preventDefault();
    if (name !== "") {
      socketRef.current.emit("joinChat", { name, color });
      setHasJoined(true);
    } else {
      alert("Please enter a name to join the chat.");
    }
  };

  const resetAvatar = () => {
    setHasJoined(false);
  };

  const sendMessage = (e) => {
    if (e.key === "Enter" && message !== "") {
      const messageToSend = { name, text: message, color };
      socketRef.current.emit("sendMessage", messageToSend);
      setMessage("");
      scrollToBottom();
    }
  };

  const generateRandomColorAndName = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(randomColor);

    const nameLength = Math.floor(Math.random() * 3) + 1; // Generate names of 1-3 characters
    let randomName = "";
    for (let i = 0; i < nameLength; i++) {
      randomName +=
        chineseCharacters[Math.floor(Math.random() * chineseCharacters.length)];
    }
    setName(randomName);
  };

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      const isScrolledToBottom =
        messagesContainer.scrollHeight - messagesContainer.clientHeight <=
        messagesContainer.scrollTop + 1;
      if (isScrolledToBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  

  return (
    <div className="flex max-md:max-h-[720px] md:h-full flex-col justify-end">
      <div id="messages-container" className="mb-4 flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-soft-secondary">
        {messages.map((msg, index) => (
          <p className="w-80 text-sm mb-6" key={index} style={{ color: msg.color }}>
            <span className="font-semibold text-x">{msg.name}</span><span className="font-semibold text-success text-xs"> {msg.time} </span><span className="font-normal text-text">: {msg.text}</span>
          </p>
        ))}
      </div>
      {!hasJoined ? (
        <form
          onSubmit={joinChat}
          className="flex flex-col items-center gap-4 border-t border-soft-secondary py-3"
        >
          <div className="flex justify-between px-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="colorPicker" className="font-medium text-light">
                Color
              </label>
              <div className="relative flex flex-nowrap items-center gap-2">
                <input
                  type="color"
                  id="colorPicker"
                  className="absolute h-full w-full cursor-pointer opacity-0"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{ top: 0, left: 0 }}
                />
                <div
                  className="h-10 w-10 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="w-28 text-sm font-light text-white">
                  {color}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium text-light">
                Nickname
              </label>
              <input
                className="appearance-none border-b border-light bg-transparent pb-1 text-sm font-light text-white placeholder-light focus:outline-none"
                type="text"
                name="name"
                placeholder="中国菜"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={generateRandomColorAndName}
                className="self-end text-xs text-success uppercase font-semibold"
              >
                Randomize
              </button>
            </div>
          </div>
          <button type="submit" className="text-center text-xs text-white">
            Click here or press 'Enter' to join chat
          </button>
        </form>
      ) : (
        <div className="border-t border-soft-secondary py-3 ">
          <div className="flex flex-col justify-end gap-2 px-6">
            <input
              className="w-full appearance-none border-b border-light bg-transparent pb-1 text-sm font-light text-white placeholder-light focus:outline-none"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={sendMessage}
            />
            <button
              type="button"
              onClick={resetAvatar}
              className="self-end text-xs uppercase text-success font-semibold"
            >
              Edit avatar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
