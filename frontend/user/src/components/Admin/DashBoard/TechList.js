import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
const TechList = () => {
    const [techs, settech] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        fetchtech();
    }, []);
    const fetchtech = async () => {
        try {
            const response = await axiosInstanceadmin.get('/fetchtech');
            settech(response.data?.tech);
        }
        catch (error) {
            console.error('Failed to fetch tech', error);
        }
    };
    const handleToggle = async (techId, isBlocked) => {
        try {
            const updatedStatus = !isBlocked;
            await axiosInstanceadmin.patch(`/tech/${techId}`, { isBlocked: updatedStatus });
            // Update the specific tech in local state
            settech((prevTechs) => prevTechs.map((tech) => tech._id === techId ? { ...tech, isBlocked: updatedStatus } : tech));
        }
        catch (error) {
            console.error("Error toggling block status", error);
        }
    };
    return (_jsx("div", { className: "flex-grow p-8", children: _jsxs("div", { className: "bg-white rounded-xl shadow p-6 overflow-x-auto", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-gray-700", children: "Tech List" }), loading ? (_jsx("div", { className: "text-center text-lg text-gray-500", children: "Loading..." })) : (_jsxs("table", { className: "min-w-full table-auto text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-gray-600 uppercase text-sm leading-normal", children: [_jsx("th", { className: "px-6 py-3", children: "Email" }), _jsx("th", { className: "px-6 py-3", children: "Phone Number" }), _jsx("th", { className: "px-6 py-3", children: "Status" }), _jsx("th", { className: "px-6 py-3", children: "Action" })] }) }), _jsx("tbody", { className: "text-gray-700 text-sm font-light", children: techs.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-6", children: "No tech Found" }) })) : (techs.map((tech) => (_jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-100", children: [_jsx("td", { className: "px-6 py-4", children: tech.email }), _jsx("td", { className: "px-6 py-4", children: tech.phone }), _jsx("td", { className: "px-6 py-4", children: tech.isBlocked ? "Blocked" : "Active" }), _jsx("td", { className: "px-6 py-4", children: _jsx("button", { onClick: () => handleToggle(tech._id, tech.isBlocked), className: `px-4 py-2 rounded-md text-white ${tech.isBlocked ? "bg-green-500" : "bg-red-500"}`, children: tech.isBlocked ? "Unblock" : "Block" }) })] }, tech._id)))) })] }))] }) }));
};
export default TechList;
