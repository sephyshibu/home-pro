import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import axiosInstancetech from "../../../Axios/TechAxios/axios";
import { useNavigate } from 'react-router';
import { uploadImageToCloudinary } from '../../../utils/cloudinaryUpload';
import toast from 'react-hot-toast';
const MyProfilePage = () => {
    const [categories, setCategories] = useState([]);
    const [technician, setTechnician] = useState({
        name: '',
        email: '',
        phone: '',
        rateperhour: 0,
        serviceablepincode: [],
        noofworks: 0,
        profileimgurl: '',
        consulationFee: 0,
        workphotos: [],
        categoryid: ""
    });
    const [editData, setEditData] = useState({ ...technician });
    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [pincodeInput, setPincodeInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const techId = localStorage.getItem('techId');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchTechnician = async (techId) => {
            if (!techId) {
                navigate('/tech');
                return;
            }
            setLoading(true);
            try {
                const response = await axiosInstancetech.get(`/fetchtechprofile/${techId}`);
                if (response.data.tech?.isBlocked) {
                    // If technician is blocked, log them out and redirect to login
                    localStorage.removeItem('techId');
                    navigate('/tech');
                }
                else {
                    setTechnician(response.data.tech);
                }
            }
            catch (error) {
                console.error('Failed to fetch technician:', error);
            }
            finally {
                setLoading(false);
            }
        };
        const fetchCategories = async () => {
            try {
                const res = await axiosInstancetech.get('/fetchcategories');
                const categories = res.data.category.filter((cat) => !cat.isBlocked); // Filter out blocked categories
                console.log(res.data); // You get { category: [...] }
                // const categories = res.data.category; // <<== important
                setCategories(categories);
            }
            catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchTechnician(techId);
        fetchCategories();
    }, [navigate, techId]);
    const openModal = () => {
        setEditData(technician);
        setIsOpen(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: name === 'rateperhour' || name === 'consulationFee' ? Number(value) : value,
        }));
    };
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const validateKeralaPincode = async (pincode) => {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();
            return data[0]?.Status === 'Success' && data[0]?.PostOffice[0]?.State.toLowerCase() === 'kerala';
        }
        catch (error) {
            console.error('Error validating pincode:', error);
            return false;
        }
    };
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };
    const handleAddPincode = async () => {
        if (!pincodeInput.trim())
            return;
        if (editData.serviceablepincode.includes(pincodeInput)) {
            toast.error('Pincode already added');
            return;
        }
        const isValid = await validateKeralaPincode(pincodeInput);
        if (!isValid) {
            toast.error('Invalid or non-Kerala pincode');
            return;
        }
        setEditData(prev => ({
            ...prev,
            serviceablepincode: [...prev.serviceablepincode, pincodeInput],
        }));
        setPincodeInput('');
    };
    const handleRemovePincode = (pin) => {
        setEditData(prev => ({
            ...prev,
            serviceablepincode: prev.serviceablepincode.filter(p => p !== pin),
        }));
    };
    const validateForm = async () => {
        let formErrors = {};
        let isValid = true;
        if (!editData.name?.trim()) {
            formErrors.name = 'Name is required';
            isValid = false;
        }
        if (!editData.email.trim()) {
            formErrors.email = 'Email is required';
            isValid = false;
        }
        else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(editData.email)) {
            formErrors.email = 'Enter a valid email';
            isValid = false;
        }
        if (!editData.phone.trim()) {
            formErrors.phone = 'Phone number is required';
            isValid = false;
        }
        else if (!/^\d{10}$/.test(editData.phone)) {
            formErrors.phone = 'Phone number must be exactly 10 digits';
            isValid = false;
        }
        if (editData.rateperhour <= 0) {
            formErrors.rateperhour = 'Rate per hour must be greater than 0';
            isValid = false;
        }
        if (editData.consulationFee <= 0) {
            formErrors.consulationFee = 'Consultation fee must be greater than 0';
            isValid = false;
        }
        if (!editData.serviceablepincode.length) {
            formErrors.serviceablepincode = 'At least one serviceable pincode required';
            isValid = false;
        }
        if (!editData.profileimgurl && !imageFile) {
            formErrors.profileimgurl = 'Profile image is required';
            isValid = false;
        }
        setErrors(formErrors);
        return isValid;
    };
    const handleSave = async () => {
        if (!(await validateForm()))
            return;
        try {
            setSaving(true);
            let imageurl = editData.profileimgurl;
            if (imageFile) {
                const uploadedUrl = await uploadImageToCloudinary(imageFile);
                if (!uploadedUrl) {
                    toast.error('Image upload failed');
                    return;
                }
                imageurl = uploadedUrl;
            }
            const updatedData = { ...editData, profileimgurl: imageurl };
            await axiosInstancetech.put(`/updatetech/${techId}`, updatedData);
            setTechnician(updatedData);
            setIsOpen(false);
            toast.success('Profile updated successfully!');
        }
        catch (error) {
            console.error('Failed to update technician:', error);
        }
        finally {
            setSaving(false);
        }
    };
    if (loading)
        return _jsx("div", { className: "text-center py-10", children: "Loading..." });
    return (_jsxs("div", { className: "bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto", children: [_jsx("h3", { className: "text-2xl font-semibold mb-6", children: "My Profile" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(ProfileField, { label: "Email", value: technician.email }), _jsx(ProfileField, { label: "Phone", value: technician.phone }), _jsx(ProfileField, { label: "Rate Per Hour", value: technician.rateperhour }), _jsx(ProfileField, { label: "Consultation Fee", value: technician.consulationFee }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Profile Image" }), technician.profileimgurl && (_jsx("img", { src: technician.profileimgurl, alt: "Profile", className: "w-24 h-24 object-cover rounded-full" }))] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Serviceable Pincodes" }), _jsx("div", { className: "border p-2 rounded min-h-[50px]", children: technician.serviceablepincode.join(', ') })] })] }), _jsx("div", { className: "mt-6 text-right", children: _jsx("button", { className: "bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg", onClick: openModal, children: "Edit Profile" }) }), _jsxs(Dialog, { open: isOpen, onClose: () => setIsOpen(false), className: "relative z-50", children: [_jsx("div", { className: "fixed inset-0 bg-black/30", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(DialogPanel, { className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-6", children: [_jsx(DialogTitle, { className: "text-lg font-bold text-center", children: "Edit Profile" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(ProfileEditInput, { label: "Name", name: "name", value: editData.name, onChange: handleChange, error: errors.name }), _jsx(ProfileEditInput, { label: "Email", name: "email", value: editData.email }), _jsx(ProfileEditInput, { label: "Phone", name: "phone", value: editData.phone }), _jsx(ProfileEditInput, { label: "Rate Per Hour", name: "rateperhour", type: "number", value: editData.rateperhour, onChange: handleChange, error: errors.rateperhour }), _jsx(ProfileEditInput, { label: "Consultation Fee", name: "consulationFee", type: "number", value: editData.consulationFee, onChange: handleChange, error: errors.consulationFee }), _jsxs("div", { className: "col-span-1", children: [_jsx("label", { className: "block mb-1 font-medium", children: "Category" }), _jsxs("select", { name: "categoryid", value: editData.categoryid, onChange: handleSelectChange, className: "w-full rounded-md border px-4 py-2 text-sm", children: [_jsx("option", { value: "", children: "Select Category" }), categories?.length > 0 && categories.map((cat) => (_jsx("option", { value: cat._id, children: cat.name }, cat._id)))] })] }), _jsxs("div", { className: "col-span-1", children: [_jsx("label", { className: "block mb-1 font-medium", children: "Profile Image" }), _jsx("input", { type: "file", accept: "image/*", onChange: handleImageChange, className: "w-full rounded-md border px-4 py-2 text-sm" }), errors.profileimgurl && _jsx("p", { className: "text-red-500 text-xs", children: errors.profileimgurl })] }), _jsxs("div", { className: "col-span-1", children: [_jsx("label", { className: "block mb-1 font-medium", children: "Serviceable Pincodes" }), _jsx("div", { className: "flex space-x-2 mb-2", children: _jsx("input", { type: "text", value: pincodeInput, onChange: (e) => setPincodeInput(e.target.value), className: "flex-1 rounded-md border px-4 py-2 text-sm", placeholder: "Add Pincode" }) }), _jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: editData.serviceablepincode.map((pin) => (_jsxs("div", { className: "bg-gray-200 px-3 py-1 rounded-full flex items-center space-x-1", children: [_jsx("span", { children: pin }), _jsx("button", { onClick: () => handleRemovePincode(pin), className: "text-red-500 text-xs", children: "\u2715" })] }, pin))) }), _jsx("button", { onClick: handleAddPincode, className: "px-4 py-2 bg-green-500 text-white rounded-md", children: "Add" }), errors.serviceablepincode && _jsx("p", { className: "text-red-500 text-xs", children: errors.serviceablepincode })] })] }), _jsxs("div", { className: "flex justify-between space-x-4 pt-6", children: [_jsx("button", { className: "bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg", onClick: () => setIsOpen(false), disabled: saving, children: "Cancel" }), _jsx("button", { className: "bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg", onClick: handleSave, disabled: saving, children: saving ? 'Saving...' : 'Save Changes' })] })] }) })] })] }));
};
// Reusable Components
const ProfileField = ({ label, value }) => (_jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: label }), _jsx("input", { type: "text", value: value, readOnly: true, className: "w-full border border-gray-300 rounded-lg px-4 py-2" })] }));
const ProfileEditInput = ({ label, name, type = 'text', value, onChange, error }) => (_jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: label }), _jsx("input", { name: name, type: type, value: value, onChange: onChange, placeholder: label, className: "w-full rounded-md border px-3 py-2 text-sm" }), error && _jsx("p", { className: "text-red-500 text-xs", children: error })] }));
export default MyProfilePage;
