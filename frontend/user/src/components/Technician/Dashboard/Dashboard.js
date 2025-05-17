import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import TechnicianRequestPage from "../../../components/Technician/Request/Request";
import TechnicianUpcoming from "../../../components/Technician/Upcoming/upcomingevents";
// import TechList from './TechList'
import { useNavigate } from "react-router";
// import Category from './Category'
// import AddCategory from './AddCategory'
import logo from '../../../../public/images/Resized/Logo Portrait.png';
import { persistor } from "../../../app/store";
const tabs = ["Upcoming Events", "Request", "Dashboard"];
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("Upcoming Events");
    const techId = localStorage.getItem('techId');
    const navigate = useNavigate();
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
    const handleClick = () => {
        navigate('/tech/myprofile');
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-100 flex flex-col", children: [_jsxs("div", { className: "text-black flex justify-between items-center bg-yellow-400 p-4 ", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("img", { src: logo, alt: "HomePro Logo", className: "w-16" }) }), _jsx("button", { type: "button", onClick: handleClick, className: "bg-yellow-300 hover:bg-yellow-500 px-4 py-2 rounded-md text-black", children: techId ? "My Profile" : "" }), _jsx("button", { type: "button", onClick: handleLogOut, className: "bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-black", children: techId ? "LogOut" : "LogIn" })] }), _jsx("div", { className: "bg-gray-200 flex justify-center space-x-6 py-3 mt-10", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), className: `px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === tab ? "bg-[#FFDF00] text-black" : "text-gray-700 hover:bg-gray-300"}`, children: tab }, tab))) }), _jsxs("div", { className: "flex-grow p-8", children: [activeTab === "Upcoming Events" && _jsx(TechnicianUpcoming, {}), activeTab === "Request" && _jsx(TechnicianRequestPage, {})] }), _jsxs("footer", { className: "bg-[#0A1D56] text-white text-xs flex justify-between items-center px-6 py-4", children: [_jsx("p", { children: "\u00A9 2025 HomePro" }), _jsxs("div", { className: "flex space-x-4", children: [_jsx("a", { href: "#", children: "Shipping" }), _jsx("a", { href: "#", children: "Contact Us" }), _jsx("a", { href: "#", children: "Privacy Policy" })] })] })] }));
};
export default AdminDashboard;
