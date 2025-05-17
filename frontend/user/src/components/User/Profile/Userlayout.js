import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../../app/store';
const UserLayout = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
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
    return (_jsxs("div", { className: "flex min-h-screen bg-gray-100", children: [_jsxs("div", { className: "w-64 bg-sky-600 text-white p-6 rounded-tr-3xl rounded-br-3xl", children: [_jsx("h2", { className: "text-2xl font-bold mb-10", children: "HomePro" }), _jsxs("nav", { className: "space-y-4", children: [_jsx(NavLink, { to: "profile", className: ({ isActive }) => isActive ? 'block bg-white text-sky-600 py-2 px-4 rounded-lg font-semibold' :
                                    'block hover:bg-sky-700 py-2 px-4 rounded-lg', children: "My Profile" }), _jsx(NavLink, { to: "passwordchange", className: "block hover:bg-sky-700 py-2 px-4 rounded-lg", children: "Password" }), _jsx(NavLink, { to: "services", className: "block hover:bg-sky-700 py-2 px-4 rounded-lg", children: "My Services" }), _jsx(NavLink, { to: "addressmanagment", className: "block hover:bg-sky-700 py-2 px-4 rounded-lg", children: "Addresses" }), _jsx(NavLink, { to: "wallet", className: "block hover:bg-sky-700 py-2 px-4 rounded-lg", children: "Wallet" })] })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("div", { className: "bg-white shadow-md p-4 flex justify-between items-center", children: [_jsx(NavLink, { to: "/", className: "text-lg font-semibold text-sky-600 hover:underline", children: "\uD83C\uDFE0 Home" }), _jsx("button", { onClick: handleLoginLogout, className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium", children: "Logout" })] }), _jsx("div", { className: "p-10 flex-1", children: _jsx(Outlet, {}) })] })] }));
};
export default UserLayout;
