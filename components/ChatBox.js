import React, { useState, useEffect } from 'react';
import { connectWebSocket, sendMessage } from '../utils/websocket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (isJoined) {
      connectWebSocket((newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [isJoined]);

  const joinChat = () => {
    if (username.trim()) {
      const joinMessage = {
        sender: username,
        type: 'JOIN',
        content: `${username} has joined the chat!`,
      };

      sendMessage(joinMessage);
      setMessages((prevMessages) => [...prevMessages, joinMessage]);
      setIsJoined(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cyan-100">
      {!isJoined ? (
        <header className="text-white py-3 w-full">
          <h1 className="text-2xl  text-blue-500 font-semibold text-center">Welcome to Chat App</h1>
          <p className="text-center mt-1 text-sm text-blue-500">Enter your username to join the chat!</p>
        </header>
      ) : (
        <header className="bg-blue-500 text-white py-3 shadow-md w-full">
          <h1 className="text-2xl font-semibold text-center">You're now in the Chat Room</h1>
          <p className="text-center mt-1 text-sm">Chat with your friends in real-time!</p>
        </header>
      )}

      {!isJoined ? (
        <div className="p-4 bg-white rounded shadow-md space-y-4 mt-6">
          <h2 className="text-lg font-bold">Enter your username</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="p-2 border rounded w-full"
          />
          <button
            onClick={joinChat}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Join Chat
          </button>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-auto px-4 w-[70%] mx-auto mt-6">
            <MessageList messages={messages} username={username} />
          </div>
          <div className="p-4 w-[55%] mt-4">
            <MessageInput username={username} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;

