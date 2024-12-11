import { useState } from 'react';
import { sendMessage } from '../utils/websocket';

const MessageInput = ({ username }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: username,
        content: message,
        type: 'CHAT',
      };

      sendMessage(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="w-full flex justify-center p-4">  
      <div className="w-[100%] flex space-x-2"> 
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
