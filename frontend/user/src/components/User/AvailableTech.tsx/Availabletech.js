import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchcategory } from '../../../api/UserApi/fetchcategory';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { persistor } from '../../../app/store';
const TechnicianList = () => {
    const location = useLocation();
    const { technicians, categoryId, date, time, pincode } = location.state || {};
    const [category, setcategory] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategory = async () => {
            const result = await fetchcategory(categoryId);
            setcategory(result);
        };
        if (categoryId) {
            fetchCategory();
        }
    }, [categoryId]);
    const userId = localStorage.getItem('userId');
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
    const handleViewProfile = async (techid) => {
        navigate('/viewprofile', { state: { techid, categoryId, date, time, pincode } });
    };
    return (_jsxs("div", { className: "min-h-screen bg-[#0b1444] text-white", children: [_jsxs("div", { className: "bg-white shadow-md p-4 flex justify-between items-center", children: [_jsx(NavLink, { to: "/", className: "text-lg font-semibold text-sky-600 hover:underline", children: "\uD83C\uDFE0 Home" }), _jsx("button", { onClick: handleLoginLogout, className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium", children: "Logout" })] }), _jsxs("header", { className: "bg-[#0b1444] text-center py-12", children: [_jsx("h1", { className: "text-3xl font-bold", children: category ? category.name : "Loading.." }), _jsx("p", { className: "mt-2 max-w-xl mx-auto text-gray-300 text-sm", children: category ? category.description : "Loading...." }), _jsxs("div", { className: "flex justify-center gap-4 mt-6 text-xs text-gray-400", children: [_jsx("span", { children: "\u2714 Satisfaction Guarantee" }), _jsx("span", { children: "\u2714 24x7 Availability" }), _jsx("span", { children: "\u2714 Local Professionals" }), _jsx("span", { children: "\u2714 Flexible Appointments" })] })] }), _jsxs("section", { className: "bg-white text-black py-8 rounded-t-3xl px-4 md:px-16", children: [_jsx("h2", { className: "text-xl font-bold text-center mb-6", children: "Select your technician" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full text-sm border rounded-lg overflow-hidden", children: [_jsx("thead", { className: "bg-gray-200 text-gray-600", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left", children: "Profile Picture" }), _jsx("th", { className: "px-4 py-3 text-left", children: "Technician Name" }), _jsx("th", { className: "px-4 py-3 text-left", children: "No of Works Completed" }), _jsx("th", { className: "px-4 py-3 text-left", children: "Consultation Fee" }), _jsx("th", { className: "px-4 py-3 text-left", children: "Rate per Hour" }), _jsx("th", { className: "px-4 py-3 text-left", children: "Action" })] }) }), _jsxs("tbody", { className: "divide-y", children: [technicians.map((tech) => (_jsxs("tr", { className: "hover:bg-gray-100", children: [_jsx("td", { className: "px-4 py-3", children: _jsx("img", { src: tech.profileimgurl || '/default-profile.png', alt: "profile", className: "h-10 w-10 rounded-full object-cover" }) }), _jsx("td", { className: "px-4 py-3", children: tech.name }), _jsx("td", { className: "px-4 py-3", children: tech.noofworks }), _jsxs("td", { className: "px-4 py-3", children: ["\u20B9 ", tech.consulationFee] }), _jsxs("td", { className: "px-4 py-3", children: ["\u20B9 ", tech.rateperhour, "/hr"] }), _jsx("td", { className: "px-4 py-3", children: _jsx("button", { className: "bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm", onClick: () => handleViewProfile(tech._id), children: "View profile" }) })] }, tech._id))), technicians.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "text-center py-6 text-gray-500", children: "No technicians found" }) }))] })] }) })] })] }));
};
export default TechnicianList;
