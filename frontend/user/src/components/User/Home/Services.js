import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { fetchTechnicianbasedonavailableSlot } from '../../../api/UserApi/fetchtechnician';
import { lookupKeralaPincode } from '../../../utils/lookedKeralapinocde';
const Services = () => {
    const navigate = useNavigate();
    const [isopen, setisOpen] = useState(false);
    const [error, seterror] = useState({});
    const [bokkslot, setisbpookslot] = useState({
        pincode: "",
        date: "",
        time: ""
    });
    const userId = localStorage.getItem("userId");
    const [categories, setcategories] = useState([]);
    const [selectedcat, setselectedcat] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);
    useEffect(() => {
        const fetchcategory = async () => {
            try {
                const response = await axiosInstanceuser.get('/fetchcategory');
                const categories = response.data.category.filter((cat) => cat.isBlocked === false);
                setcategories(categories);
            }
            catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchcategory();
    }, []);
    const handleClicked = (categoryId) => {
        setselectedcat(categoryId);
        setisOpen(true);
    };
    const toggleExpand = (id) => {
        setExpandedCard(prev => (prev === id ? null : id));
    };
    const validateKeralaPincode = async (pincode) => {
        try {
            const matched = lookupKeralaPincode(pincode);
            return matched.length > 0; // ✅ return true if match found
        }
        catch (error) {
            console.error('Error validating pincode:', error);
            return false;
        }
    };
    return (_jsxs("section", { className: "py-12 bg-gray-50", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h3", { className: "text-xl font-bold", children: "Our Services" }), _jsx("p", { className: "text-gray-500 mt-2", children: "All your home service needs in one place" })] }), _jsx("div", { className: "grid md:grid-cols-4 gap-6 px-6", children: categories.map((category) => {
                    const isExpanded = expandedCard === category._id;
                    const shortDesc = category.description.slice(0, 80) + (category.description.length > 80 ? "..." : "");
                    return (_jsxs("div", { className: "bg-white rounded-lg shadow-md p-4 text-center", onClick: () => handleClicked(category._id), children: [_jsx("img", { src: category.image, alt: category.name, className: "rounded-md h-24 mx-auto mb-2 object-cover" }), _jsx("h4", { className: 'font-semibold', children: category.name }), _jsx("p", { className: 'text-sm text-gray-500', children: isExpanded ? category.description : shortDesc }), category.description.length > 80 && (_jsx("button", { onClick: () => toggleExpand(category._id), className: "text-blue-500 text-sm mt-2", children: isExpanded ? "Show Less" : "Show More" }))] }, category._id));
                }) }), _jsxs(Dialog, { open: isopen, onClose: () => setisOpen(false), className: "relative z-50", children: [_jsx("div", { className: "fixed inset-0 bg-black/30", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(DialogPanel, { className: "w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl space-y-4", children: [_jsx(DialogTitle, { className: "text-lg font-bold", children: "Book Slot" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium", children: "Pincode" }), _jsx("input", { type: "text", className: "w-full mt-1 p-2 border rounded", value: bokkslot.pincode, onChange: (e) => setisbpookslot({ ...bokkslot, pincode: e.target.value }) }), error.pincode && _jsx("p", { className: "text-sm text-red-500", children: error.pincode })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium", children: "Date" }), _jsx("input", { type: "date", className: "w-full mt-1 p-2 border rounded", value: bokkslot.date, onChange: (e) => setisbpookslot({ ...bokkslot, date: e.target.value }) }), error.date && _jsx("p", { className: "text-sm text-red-500", children: error.date })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium", children: "Time" }), _jsx("input", { type: "time", className: "w-full mt-1 p-2 border rounded", value: bokkslot.time, onChange: (e) => setisbpookslot({ ...bokkslot, time: e.target.value }) }), error.time && _jsx("p", { className: "text-sm text-red-500", children: error.time })] }), _jsx("button", { className: "bg-blue-500 text-white px-4 py-2 rounded w-full", onClick: async () => {
                                        const errs = {};
                                        if (!bokkslot.pincode)
                                            errs.pincode = "Pincode is required";
                                        else {
                                            const isValid = await validateKeralaPincode(bokkslot.pincode);
                                            if (!isValid)
                                                errs.pincode = "Enter a valid Kerala pincode";
                                        }
                                        if (!bokkslot.date)
                                            errs.date = "Date is required";
                                        if (!bokkslot.time)
                                            errs.time = "Time is required";
                                        seterror(errs);
                                        if (Object.keys(errs).length === 0) {
                                            if (!userId) {
                                                toast.error("please login ");
                                            }
                                            if (selectedcat === null) {
                                                toast.error("Category is not selected");
                                                return;
                                            }
                                            try {
                                                const technicians = await fetchTechnicianbasedonavailableSlot(bokkslot.pincode, bokkslot.date, selectedcat // Make sure this is defined in your component state
                                                );
                                                if (technicians.length > 0) {
                                                    toast.success("Technicians found!");
                                                    setisOpen(false);
                                                    setisbpookslot({ pincode: "", date: "", time: "" });
                                                    seterror({});
                                                    navigate('/available-technicians', {
                                                        state: {
                                                            technicians,
                                                            date: bokkslot.date,
                                                            time: bokkslot.time,
                                                            categoryId: selectedcat,
                                                            pincode: bokkslot.pincode
                                                        }
                                                    });
                                                }
                                                else {
                                                    toast.error("No technicians available for the selected date and pincode.");
                                                }
                                            }
                                            catch (error) {
                                                toast.error(error.message || "Something went wrong.");
                                            }
                                        }
                                    }, children: "Search" })] }) })] })] }));
};
export default Services;
