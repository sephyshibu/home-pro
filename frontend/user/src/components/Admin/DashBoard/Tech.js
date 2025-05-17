import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import toast from "react-hot-toast";
const Tech = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, seterror] = useState({});
    const [techData, settechdata] = useState({
        email: "",
        password: "",
        phone: ""
    });
    const handleChange = (e) => {
        settechdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = {};
        let isValid = true;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!techData.email) {
            formErrors.email = "Email is required";
            isValid = false;
        }
        else if (!emailPattern.test(techData.email)) {
            formErrors.email = "Please enter valid email";
            isValid = false;
        }
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
        if (!techData.password) {
            formErrors.password = 'Password is required.';
            isValid = false;
        }
        else if (!passwordPattern.test(techData.password)) {
            formErrors.password = 'Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, and one special character.';
            isValid = false;
        }
        if (!techData.phone) {
            formErrors.phone = 'Phone number is required.';
            isValid = false;
        }
        else if (!/^\d{10}$/.test(techData.phone)) {
            formErrors.phone = 'Phone number must be exactly 10 digits.';
            isValid = false;
        }
        seterror(formErrors);
        // If any validation fails, return early
        if (!isValid) {
            return;
        }
        try {
            const response = await axiosInstanceadmin.post('/addtech', techData);
            toast.success(response.data.message);
            settechdata({ email: "", password: "", phone: "" }); // clear form even on error
            setIsOpen(false);
        }
        catch (error) {
            if (error.response?.data?.message === "email already existed") {
                toast.error("This email is already registered.");
            }
            else {
                toast.error("Something went wrong. Try again.");
            }
            settechdata({ email: "", password: "", phone: "" }); // clear form even on error
        }
    };
    return (_jsxs("div", { className: "p-6", children: [_jsx("button", { onClick: () => setIsOpen(true), className: "bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md", children: "Add New Technician" }), _jsxs(Dialog, { open: isOpen, onClose: () => setIsOpen(false), className: "relative z-50", children: [_jsx("div", { className: "fixed inset-0 bg-black/30", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(DialogPanel, { className: "w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl", children: [_jsx(DialogTitle, { className: "text-lg font-bold", children: "Add Technician" }), _jsxs("div", { className: "mt-4 space-y-3", children: [_jsx("input", { name: "email", value: techData.email, onChange: handleChange, placeholder: "Email ID", className: "w-full rounded-md border px-3 py-2 text-sm" }), error.email && _jsx("p", { className: "text-red-500 text-center text-sm", children: error.email }), _jsx("input", { name: "phone", value: techData.phone, onChange: handleChange, placeholder: "Phone Number", className: "w-full rounded-md border px-3 py-2 text-sm" }), error.phone && _jsx("p", { className: "text-red-500 text-center text-sm", children: error.phone }), _jsx("input", { name: "password", type: "password", value: techData.password, onChange: handleChange, placeholder: "Password", className: "w-full rounded-md border px-3 py-2 text-sm" }), error.password && _jsx("p", { className: "text-red-500 text-center text-sm", children: error.password }), _jsx("button", { onClick: handleSubmit, className: "mt-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md", children: "Add Technician" })] })] }) })] })] }));
};
export default Tech;
