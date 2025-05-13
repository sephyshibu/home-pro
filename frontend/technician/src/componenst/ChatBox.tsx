// components/ChatBox.tsx
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  isRead:boolean;
  timestamp: string;
  bookingId: string;
}

interface ChatBoxProps {
  bookingId: string;
  userId: string;
  techId: string;
}

const socket: Socket = io('http://localhost:3000'); // or your backend URL

const ChatBox: React.FC<ChatBoxProps> = ({ bookingId, userId, techId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [unreadMap, setUnreadMap] = useState<{ [bookingId: string]: number }>({});

  useEffect(() => {
    socket.emit('join-room', bookingId);


    // Fetch chat history
    socket.emit('fetch-messages', bookingId, (msgs: Message[]) => {
      setMessages(msgs);
    });

    // Listen for new messages
    const handleReceiveMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
    };
    
    
    socket.on('receive-message', handleReceiveMessage);
     socket.emit('chat-box-opened', bookingId);
      socket.emit('mark_as_read', { bookingId, userId });
    
      return () => {
        socket.off('receive-message', handleReceiveMessage);
      
      };
  }, [bookingId,userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const msg: Message = {
      senderId: techId,
      receiverId: userId,
      isRead:false,
      message: newMessage,
      timestamp: new Date().toISOString(),
      bookingId,
    };

    socket.emit('send-message', msg);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-96 bg-white border rounded shadow-md p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
      {messages.map((msg, i) => {
        const isTech = msg.senderId === techId;

        return (
            <div
            key={i}
            className={`flex ${isTech ? 'justify-end' : 'justify-start'}`}
            >
            <div
                className={`p-2 rounded-lg max-w-xs text-sm ${
                isTech ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'
                }`}
            >
                <div>{msg.message}</div>
                <div className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
                    {isTech && (
                        <span title={msg.isRead ? "Read" : "Unread"}>
                        {msg.isRead ? '✓✓' : '✓'}
                        </span>
                    )}
                </div>
            </div>
            </div>
        );
        })}

        <div ref={messagesEndRef} />
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          className="flex-1 border px-2 py-1 rounded-l"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded-r" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
