import React, { useState, useEffect } from 'react';

const getRandomColor = () => {
  const colors = [
    'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400',
    'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-teal-400',
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const MessageList = ({ messages, username }) => {
  const [userColors, setUserColors] = useState({});

  useEffect(() => {
    messages.forEach((message) => {
      if (message.sender && !userColors[message.sender]) {
        setUserColors((prevColors) => ({
          ...prevColors,
          [message.sender]: getRandomColor(),
        }));
      }
    });
  }, [messages, userColors]);

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.sender === username ? 'justify-end' : 'justify-start'} max-w-[70%] mx-auto mb-4`}
        >
          {message.type === 'JOIN' ? (
            <div className="w-full text-center text-blue-500 font-semibold text-sm italic">
              {message.content}
            </div>
          ) : (
            <div className={`flex ${message.sender === username ? 'justify-end' : 'justify-start'} items-center`}>
              {message.sender !== username && (
                <div
                  className={`w-10 h-10 text-white flex items-center justify-center rounded-full text-sm mr-2 ${userColors[message.sender]} flex-shrink-0`}
                >
                  {message.sender.charAt(0).toUpperCase()}
                </div>
              )}

              <div> 
                <div className={`text-xs text-gray-500 ${message.sender === username ? 'text-right mr-1' : 'text-left ml-1'}`}>
                  <strong>{message.sender}</strong>
                </div>
                <div className={`p-2 rounded-xl ${message.sender === username ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                  {message.content}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;

