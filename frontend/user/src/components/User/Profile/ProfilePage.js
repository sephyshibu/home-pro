import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { useNavigate } from "react-router";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
const ProfilePage = () => {
    const [user, setUser] = useState({
        email: '',
        name: '',
        phone: ''
    });
    const [isOpen, setIsOpen] = useState(false); // Modal open/close state
    const [editData, setEditData] = useState({ email: "", name: "", phone: "" });
    const [errors, setErrors] = useState({});
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchparticularuser = async (userId) => {
            if (!userId) {
                navigate('/login');
                return;
            }
            try {
                const response = await axiosInstanceuser.get(`/fetchinguser/${userId}`);
                setUser(response.data.user);
            }
            catch (error) {
                console.error('Failed to fetch users', error);
            }
        };
        fetchparticularuser(userId);
    }, [navigate, userId]);
    const openModal = () => {
        setEditData(user); // Copy current user data into editData
        setIsOpen(true);
    };
    const handleChange = (e) => {
        setEditData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSave = async () => {
        if (!validateForm())
            return;
        try {
            const response = await axiosInstanceuser.put(`/updateuser/${userId}`, editData);
            setUser(editData); // Update the local state with new data
            setIsOpen(false);
        }
        catch (error) {
            console.error("Failed to update user", error);
        }
    };
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;
        // Validate name
        if (!editData.name.trim()) {
            formErrors.name = "Username is required";
            isValid = false;
        }
        else if (!/^[a-zA-Z0-9 ]+$/.test(editData.name.trim())) {
            formErrors.name = "Username can only contain letters, numbers, and spaces";
            isValid = false;
        }
        // Validate email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!editData.email.trim()) {
            formErrors.email = "Email is required";
            isValid = false;
        }
        else if (!emailPattern.test(editData.email.trim())) {
            formErrors.email = "Please enter a valid email address";
            isValid = false;
        }
        // Validate phone
        if (!editData.phone?.trim()) {
            formErrors.phone = "Phone number is required";
            isValid = false;
        }
        else if (!/^\d{10}$/.test(editData.phone.trim())) {
            formErrors.phone = "Phone number must be exactly 10 digits";
            isValid = false;
        }
        setErrors(formErrors);
        return isValid;
    };
    return (_jsxs("div", { className: "bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto", children: [_jsx("h3", { className: "text-2xl font-semibold mb-6", children: "My Profile" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Username" }), _jsx("input", { type: "text", value: user.name, readOnly: true, className: "w-full border border-gray-300 rounded-lg px-4 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Email ID" }), _jsx("input", { type: "email", value: user.email, readOnly: true, className: "w-full border border-gray-300 rounded-lg px-4 py-2" })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Phone Number" }), _jsx("input", { type: "tel", value: user.phone || "", readOnly: true, className: "w-full border border-gray-300 rounded-lg px-4 py-2" })] })] }), _jsx("div", { className: "mt-6 text-right", children: _jsx("button", { className: "bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg", onClick: openModal, children: "Edit Details" }) }), _jsxs(Dialog, { open: isOpen, onClose: () => setIsOpen(false), className: "relative z-50", children: [_jsx("div", { className: "fixed inset-0 bg-black/30", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(DialogPanel, { className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl", children: [_jsx(DialogTitle, { className: "text-lg font-bold mb-4", children: "Edit Profile" }), _jsxs("div", { className: "space-y-4", children: [_jsx("input", { name: "name", value: editData.name, onChange: handleChange, placeholder: "Username", className: "w-full rounded-md border px-3 py-2 text-sm" }), errors.name && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.name }), _jsx("input", { name: "email", value: editData.email, 
                                            // onChange={handleChange}
                                            placeholder: "Email ID", className: "w-full rounded-md border px-3 py-2 text-sm" }), errors.email && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.email }), _jsx("input", { name: "phone", value: editData.phone, onChange: handleChange, placeholder: "Phone Number", className: "w-full rounded-md border px-3 py-2 text-sm" }), errors.phone && _jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.phone })] }), _jsxs("div", { className: "mt-6 flex justify-end space-x-4", children: [_jsx("button", { className: "bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg", onClick: () => setIsOpen(false), children: "Cancel" }), _jsx("button", { className: "bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg", onClick: handleSave, children: "Save Changes" })] })] }) })] })] }));
};
export default ProfilePage;
