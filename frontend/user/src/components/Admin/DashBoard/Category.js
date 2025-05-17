import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import { useNavigate } from "react-router";
const CategoryList = () => {
    const [category, setcategory] = useState([]);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetchcategory();
    }, []);
    const fetchcategory = async () => {
        try {
            const response = await axiosInstanceadmin.get('/fetchcategory');
            setcategory(response.data.cat);
        }
        catch (error) {
            console.error('Failed to fetch Category', error);
        }
    };
    const handleToggle = async (catid, isBlocked) => {
        try {
            const updateStatus = !isBlocked;
            const response = await axiosInstanceadmin.patch(`/category/${catid}`, { isBlocked: updateStatus });
            console.log(response);
            setcategory((prevCategory) => prevCategory.map((cat) => cat._id === catid ? { ...cat, isBlocked: updateStatus } : cat));
        }
        catch (error) {
            console.error("Error toggling block status", error);
        }
    };
    const handleEdit = async (catid) => {
        navigate(`/admin/editcategory/${catid}`);
    };
    return (_jsx("div", { className: "flex-grow p-8", children: _jsxs("div", { className: "bg-white rounded-xl shadow p-6 overflow-x-auto", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-gray-700", children: "Tech List" }), loading ? (_jsx("div", { className: "text-center text-lg text-gray-500", children: "Loading..." })) : (_jsxs("table", { className: "min-w-full table-auto text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-gray-600 uppercase text-sm leading-normal", children: [_jsx("th", { className: "px-6 py-3", children: "Image" }), _jsx("th", { className: "px-6 py-3", children: "Name" }), _jsx("th", { className: "px-6 py-3", children: "Description" }), _jsx("th", { className: "px-6 py-3", children: "Action" })] }) }), _jsx("tbody", { className: "text-gray-700 text-sm font-light", children: category.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "text-center py-6", children: "No category Found" }) })) : (category.map((cat) => (_jsxs("tr", { className: "border-b border-gray-200 hover:bg-gray-100", children: [_jsx("td", { children: _jsx("img", { src: cat.image, alt: cat.name, className: "h-32 w-full object-cover rounded-md" }) }), _jsx("td", { className: "px-6 py-4", children: cat.name }), _jsx("td", { className: "px-6 py-4", children: cat.description }), _jsx("td", { className: "px-6 py-4", children: cat.isBlocked ? "Blocked" : "Active" }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex gap-x-2", children: [_jsx("button", { onClick: () => handleToggle(cat._id, cat.isBlocked), className: `px-4 py-2 rounded-md text-white ${cat.isBlocked ? "bg-green-500" : "bg-red-500"}`, children: cat.isBlocked ? "Unblock" : "Block" }), _jsx("button", { onClick: () => handleEdit(cat._id), className: "bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md", children: "Edit" })] }) })] }, cat._id)))) })] }))] }) }));
};
export default CategoryList;
