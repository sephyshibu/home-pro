import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
const User = () => {
    const [user, setuser] = useState([]);
    const [searchterm, setsearchterm] = useState('');
    const [loading, setloading] = useState(false);
    useEffect(() => {
        fetchuser();
    }, []);
    const fetchuser = async () => {
        try {
            const response = await axiosInstanceadmin.get('/fetchuser');
            setuser(response.data.user);
        }
        catch (error) {
            console.error('Failed to fetch users', error);
        }
    };
    const handleToggle = async (userId, isBlocked) => {
        try {
            const updatedStatus = !isBlocked;
            await axiosInstanceadmin.patch(`/user/${userId}`, { isBlocked: updatedStatus });
            // Update the specific user in local state
            setuser((prevUsers) => prevUsers.map((u) => u._id === userId ? { ...u, isBlocked: updatedStatus } : u));
        }
        catch (error) {
            console.error("Error toggling block status", error);
        }
    };
    const handleSearch = async () => {
    };
    return (_jsx("div", { className: "flex-grow p-8", children: _jsxs("div", { className: "bg-white rounded-xl shadow p-6 overflow-x-auto", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-gray-700", children: "User List" }), loading ? (_jsx("div", { className: "text-center text-lg text-gray-500", children: "Loading..." })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "search-options", children: _jsx("input", { type: "text", value: searchterm, onChange: handleSearch, placeholder: "Enter the search user", className: "search-input" }) }), _jsxs("table", { className: "min-w-full table-auto text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-gray-600 uppercase text-sm leading-normal", children: [_jsx("th", { className: "px-6 py-3", children: "Name" }), _jsx("th", { className: "px-6 py-3", children: "Email" }), _jsx("th", { className: "px-6 py-3", children: "Status" }), _jsx("th", { className: "px-6 py-3", children: "Action" })] }) }), _jsx("tbody", { className: "text-gray-700 text-sm font-light", children: user.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-6", children: "No Users Found" }) })) : (user.map((use) => (_jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-100", children: [_jsx("td", { className: "px-6 py-4", children: use.name }), _jsx("td", { className: "px-6 py-4", children: use.email }), _jsx("td", { className: "px-6 py-4", children: use.isBlocked ? "Blocked" : "Active" }), _jsx("td", { className: "px-6 py-4", children: _jsx("button", { onClick: () => handleToggle(use._id, use.isBlocked), className: `px-4 py-2 rounded-md text-white ${use.isBlocked ? "bg-green-500" : "bg-red-500"}`, children: use.isBlocked ? "Unblock" : "Block" }) })] }, use._id)))) })] })] }))] }) }));
};
export default User;
