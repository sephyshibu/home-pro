import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchTechById } from "../../../api/UserApi/fetchtechbyid";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { persistor } from '../../../app/store';
const TechnicianProfile = () => {
    const location = useLocation();
    const { techid, categoryId, time, date, pincode } = location.state || null;
    const navigate = useNavigate();
    const [technician, settechnician] = useState({
        _id: '',
        name: '',
        email: '',
        phone: '',
        rateperhour: 0,
        serviceablepincode: [],
        noofworks: 0,
        profileimgurl: '',
        consulationFee: 0,
        categoryid: {
            _id: "",
            name: "",
            description: ""
        }
    });
    useEffect(() => {
        const fetchtech = async () => {
            try {
                const response = await fetchTechById(techid);
                settechnician(response);
            }
            catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchtech();
    }, []);
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
    const handleBook = async (techid) => {
        navigate('/proceedpayment', { state: { techid, bookingdetails: {
                    date: location.state?.date,
                    time: location.state?.time,
                    categoryId: location.state?.categoryId,
                    pinocde: location.state?.pincode
                } } });
    };
    return (_jsxs("div", { className: "bg-white min-h-screen", children: [_jsxs("div", { className: "bg-white shadow-md p-4 flex justify-between items-center", children: [_jsx(NavLink, { to: "/", className: "text-lg font-semibold text-sky-600 hover:underline", children: "\uD83C\uDFE0 Home" }), _jsx("button", { onClick: handleLoginLogout, className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium", children: "Logout" })] }), _jsx("div", { className: "max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6", children: _jsxs("div", { className: "col-span-6 bg-gray-100 p-4 rounded shadow", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Technician Profile" }), _jsxs("div", { className: "bg-white p-6 rounded flex flex-col md:flex-row justify-between items-start gap-6", children: [_jsxs("div", { className: "flex-1 space-y-3 text-base", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Personal Details" }), _jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", technician.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Number of Works:" }), " ", technician.noofworks] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone Number:" }), " ", technician.phone] }), _jsxs("p", { children: [_jsx("strong", { children: "Service Category:" }), " ", technician.categoryid.name.toUpperCase()] }), _jsxs("p", { children: [_jsx("strong", { children: "Consultation Fee:" }), " \u20B9", technician.consulationFee] }), _jsxs("p", { children: [_jsx("strong", { children: "Rate per Hour:" }), " \u20B9 ", technician.rateperhour, " / hr"] }), _jsxs("p", { children: [_jsx("strong", { children: "Service Districts:" }), " ", technician.serviceablepincode.join(", ")] })] }), _jsx("div", { className: "w-40 h-40 rounded-full overflow-hidden shadow-md border-2 border-gray-300", children: _jsx("img", { src: technician.profileimgurl, alt: "Technician Profile", className: "w-full h-full object-cover" }) })] })] }) }), _jsx("div", { className: "col-span-1 md:col-span-2", children: _jsx("div", { className: "flex justify-center mt-6", children: _jsx("button", { className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600", onClick: () => handleBook(techid), children: "Book Technician" }) }) }), _jsx("footer", { className: "bg-[#0F1A3C] text-white py-8 mt-10", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-xl font-bold mb-2", children: "HomePro" }), _jsx("p", { children: "Your Home. Our Priority" })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-semibold mb-2", children: "Help" }), _jsxs("ul", { className: "space-y-1 text-sm", children: [_jsx("li", { children: _jsx("a", { href: "#", children: "Shipping" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Returns" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Customer Support" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Warranty" }) })] })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-semibold mb-2", children: "More" }), _jsxs("ul", { className: "space-y-1 text-sm", children: [_jsx("li", { children: _jsx("a", { href: "#", children: "About Us" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Privacy Policy" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Terms of Use" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Careers" }) })] })] })] }) })] }));
};
export default TechnicianProfile;
