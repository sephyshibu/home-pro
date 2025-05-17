import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/ChatBox.tsx
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000'); // or your backend URL
const ChatBox = ({ bookingId, userId, techId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    console.log("details", bookingId, userId, techId);
    useEffect(() => {
        socket.emit('join-room', bookingId);
        // Fetch chat history
        socket.emit('fetch-messages', bookingId, (msgs) => {
            setMessages(msgs);
        });
        // Listen for new messages
        const handleReceiveMessage = (msg) => {
            setMessages((prev) => [...prev, msg]);
        };
        socket.on('receive-message', handleReceiveMessage);
        socket.emit('chat-box-opened', bookingId);
        socket.emit('mark_as_read', { bookingId, userId });
        // Cleanup to prevent duplicate listeners
        return () => {
            socket.off('receive-message', handleReceiveMessage);
        };
    }, [bookingId]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const sendMessage = () => {
        if (newMessage.trim() === '')
            return;
        const msg = {
            senderId: userId,
            receiverId: techId,
            isRead: false,
            message: newMessage,
            timestamp: new Date().toISOString(),
            bookingId,
        };
        socket.emit('send-message', msg);
        setNewMessage('');
    };
    return (_jsxs("div", { className: "flex flex-col h-96 bg-white border rounded shadow-md p-4", children: [_jsxs("div", { className: "flex-1 overflow-y-auto space-y-2", children: [messages.map((msg, i) => {
                        const isUser = msg.senderId === userId;
                        return (_jsx("div", { className: `flex ${isUser ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `p-2 rounded-lg max-w-xs text-sm ${isUser ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`, children: [_jsx("div", { children: msg.message }), _jsxs("div", { className: "text-xs text-gray-500", children: [new Date(msg.timestamp).toLocaleTimeString(), isUser && (_jsx("span", { title: msg.isRead ? "Read" : "Unread", children: msg.isRead ? '✓✓' : '✓' }))] })] }) }, i));
                    }), _jsx("div", { ref: messagesEndRef })] }), _jsxs("div", { className: "flex mt-2", children: [_jsx("input", { type: "text", className: "flex-1 border px-2 py-1 rounded-l", value: newMessage, onChange: (e) => setNewMessage(e.target.value), placeholder: "Type message..." }), _jsx("button", { className: "bg-blue-600 text-white px-4 py-1 rounded-r", onClick: sendMessage, children: "Send" })] })] }));
};
export default ChatBox;
