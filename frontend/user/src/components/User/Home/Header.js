import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { persistor } from '../../../app/store';
import { useNavigate } from 'react-router';
import logo from '../../../../public/images/Resized/Logo Landscape white-01-01.png';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
const Header = () => {
    const [unreadCounts, setUnreadCounts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    useEffect(() => {
        if (userId) {
            socket.emit('get-unread-counts', userId, (data) => {
                setUnreadCounts(data);
            });
            // Listen for updates
            socket.on('new_unread', ({ bookingId, count }) => {
                setUnreadCounts((prev) => {
                    const existing = prev.find((item) => item.bookingId === bookingId);
                    if (existing) {
                        return prev.map((item) => item.bookingId === bookingId ? { ...item, count } : item);
                    }
                    return [...prev, { bookingId, count }];
                });
            });
            return () => {
                socket.off('new_unread');
            };
        }
    }, [userId]);
    const handleLoginLogout = async () => {
        if (userId) {
            localStorage.removeItem('userId');
            await persistor.purge();
            navigate('/');
        }
        else {
            navigate('/login');
        }
    };
    const handleclick = () => {
        navigate('/myaccount');
    };
    const handleChatRedirect = (bookingId) => {
        navigate('/myaccount/services');
        setShowDropdown(false);
    };
    return (_jsx("nav", { className: "bg-[#0A2342] text-white py-2 px-6 shadow-md", children: _jsxs("div", { className: "max-w-7xl mx-auto flex justify-between items-center", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("img", { src: logo, alt: "HomePro Logo", className: "w-52" }) }), _jsx("div", { className: "hidden md:flex space-x-8 text-lg" }), _jsxs("div", { className: "flex items-center space-x-6", children: [userId && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowDropdown(prev => !prev), children: ["\uD83D\uDD14", unreadCounts.length > 0 && (_jsx("span", { className: "absolute top-[-5px] right-[-5px] bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center", children: unreadCounts.reduce((acc, curr) => acc + curr.count, 0) }))] }), showDropdown && (_jsx("div", { className: "absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded", children: unreadCounts.length === 0 ? (_jsx("div", { className: "p-4 text-center text-sm", children: "No unread messages" })) : (unreadCounts.map(({ bookingId, count, technicianName }) => (_jsxs("div", { className: "p-3 hover:bg-gray-100 cursor-pointer border-b", onClick: () => handleChatRedirect(bookingId), children: [technicianName, " -TechName"] }, bookingId)))) }))] }), _jsx("button", { onClick: handleclick, children: "My Profile" })] })), _jsx("button", { type: 'button', onClick: handleLoginLogout, children: userId ? "LogOut" : "Login" })] })] }) }));
};
export default Header;
