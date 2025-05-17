import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { persistor } from '../../../app/store';
const TechnicianLayout = () => {
    const navigate = useNavigate();
    const techId = localStorage.getItem('techId');
    const handleLogOut = async () => {
        if (techId) {
            console.log(techId);
            localStorage.removeItem('techId');
            await persistor.purge();
            navigate('/tech');
        }
        else {
            navigate('/tech/techdashboard');
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsxs("div", { className: "bg-yellow-400 p-4 flex justify-between items-center", children: [_jsx("div", { className: "text-xl font-bold text-blue-900", children: "HomePro" }), _jsx(NavLink, { to: "/tech/techdashboard", className: "text-lg font-semibold text-sky-600 hover:underline", children: "\uD83C\uDFE0 Home" }), _jsx("div", { className: "font-medium cursor-pointer", children: _jsx("button", { type: "button", onClick: handleLogOut, className: "bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-black", children: techId ? "LogOut" : "LogIn" }) })] }), _jsxs("div", { className: "flex flex-1", children: [_jsxs("div", { className: "bg-black text-white w-48 p-4 rounded-tr-2xl rounded-br-2xl space-y-4", children: [_jsx(NavLink, { to: "/tech/myprofile", className: ({ isActive }) => isActive ?
                                    'bg-white text-black px-4 py-2 rounded-full block' :
                                    'px-4 py-2 block', children: "My Profile" }), _jsx(NavLink, { to: "/tech/myprofile/password", className: ({ isActive }) => isActive ?
                                    'bg-white text-black px-4 py-2 rounded-full block' :
                                    'px-4 py-2 block', children: "Password" }), _jsx(NavLink, { to: "/tech/myprofile/services", className: ({ isActive }) => isActive ?
                                    'bg-white text-black px-4 py-2 rounded-full block' :
                                    'px-4 py-2 block', children: "Services" }), _jsx(NavLink, { to: "/tech/myprofile/wallet", className: ({ isActive }) => isActive ?
                                    'bg-white text-black px-4 py-2 rounded-full block' :
                                    'px-4 py-2 block', children: "Wallet" })] }), _jsxs("div", { className: "flex-1 bg-gray-100 p-6", children: [_jsx(Outlet, {}), " "] })] })] }));
};
export default TechnicianLayout;
