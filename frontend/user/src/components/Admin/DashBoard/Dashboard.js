import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import User from "./User";
import Tech from './Tech';
import TransactionPage from "./Transactions";
import RefundRequest from "./RefundRequest.";
import TechList from './TechList';
import { useNavigate } from "react-router";
import Category from './Category';
import AddCategory from './AddCategory';
import { persistor } from "../../../app/store";
import logo from '../../../../public/images/Resized/Logo Landscape.png';
const tabs = ["Dashboard", "User List", "Technician List", "Category List", "Transactions", "RefundRequest"];
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const adminId = localStorage.getItem('adminId');
    const navigate = useNavigate();
    const handleLogOut = async () => {
        if (adminId) {
            localStorage.removeItem('adminId');
            await persistor.purge();
            navigate('/admin');
        }
        else {
            navigate('/admin/admindashboard');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-100 flex flex-col", children: [_jsxs("div", { className: "bg-[#8EB69B] text-white flex justify-between items-center px-6 py-4", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx("img", { src: logo, alt: "HomePro Logo", className: "h-10" }) }), _jsx("button", { type: "button", onClick: handleLogOut, className: "bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white", children: adminId ? "LogOut" : "LogIn" })] }), _jsx("div", { className: "bg-gray-200 flex justify-center space-x-6 py-3 mt-10", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), className: `px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === tab ? "bg-[#45ae66] text-white" : "text-gray-700 hover:bg-gray-300"}`, children: tab }, tab))) }), _jsxs("div", { className: "flex-grow p-8", children: [activeTab === "User List" && _jsx(User, {}), activeTab === "Technician List" &&
                        _jsxs("div", { children: [_jsx("div", { children: _jsx(Tech, {}) }), _jsx("div", { children: _jsx(TechList, {}) })] }), activeTab === "Category List" && _jsxs("div", { children: [_jsx("div", { children: _jsx(AddCategory, {}) }), _jsx("div", { children: _jsx(Category, {}) })] }), activeTab === "Transactions" && _jsx(TransactionPage, {}), activeTab === "RefundRequest" && _jsx(RefundRequest, {})] })] }));
};
export default AdminDashboard;
