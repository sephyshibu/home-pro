import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import toast from "react-hot-toast";
import { uploadImageToCloudinary } from "../../../utils/cloudinaryUpload";
const AddCategory = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, seterror] = useState({});
    const [addcat, setaddcat] = useState({
        name: "",
        description: "",
        image: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const handleChange = (e) => {
        setaddcat({ ...addcat, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        const newErrors = {};
        if (!imageFile)
            newErrors.image = "Image is required";
        const validTextRegex = /^[A-Za-z0-9\s]+$/;
        if (!addcat.name.trim()) {
            newErrors.name = "Name is required";
        }
        else if (!validTextRegex.test(addcat.name.trim())) {
            newErrors.name = "Name must contain only letters, numbers, and spaces";
        }
        if (!addcat.description.trim()) {
            newErrors.description = "Description is required";
        }
        else if (!validTextRegex.test(addcat.description.trim())) {
            newErrors.description = "Description must contain only letters, numbers, and spaces";
        }
        seterror(newErrors);
        if (Object.keys(newErrors).length > 0)
            return;
        let imageurl = "";
        if (imageFile) {
            const uploadurl = await uploadImageToCloudinary(imageFile);
            if (!uploadurl)
                return;
            imageurl = uploadurl;
        }
        try {
            const sanitizedName = addcat.name.trim().toLowerCase();
            const sanitizedDescription = addcat.description.trim();
            const response = await axiosInstanceadmin.post('/addcategory', {
                name: sanitizedName,
                description: sanitizedDescription,
                image: imageurl
            });
            toast.success(response.data.message);
            setIsOpen(false);
            setaddcat({ name: "", description: "", image: "" });
            setImageFile(null);
        }
        catch (error) {
            console.error(error);
            if (error.response?.data?.message === "category already existed") {
                toast.error("This category already added.");
            }
            else {
                toast.error("Something went wrong. Try again.");
            }
            setaddcat({ name: "", description: "", image: "" });
            setImageFile(null);
        }
    };
    return (_jsxs("div", { className: "p-6", children: [_jsx("button", { onClick: () => setIsOpen(true), className: "bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md", children: "Add New Category" }), _jsxs(Dialog, { open: isOpen, onClose: () => setIsOpen(false), className: "relative z-50", children: [_jsx("div", { className: "fixed inset-0 bg-black/30", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(DialogPanel, { className: "w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl", children: [_jsx(DialogTitle, { className: "text-lg font-bold", children: "Add Category" }), _jsxs("div", { className: "mt-4 space-y-3", children: [_jsx("input", { name: "name", value: addcat.name, onChange: handleChange, placeholder: "Name", className: "w-full rounded-md border px-3 py-2 text-sm" }), error.name && _jsx("p", { className: "text-red-500 text-center text-sm", children: error.name }), _jsx("input", { name: "description", value: addcat.description, onChange: handleChange, placeholder: "Description", className: "w-full rounded-md border px-3 py-2 text-sm" }), error.description && _jsx("p", { className: "text-red-500 text-center text-sm", children: error.description }), _jsx("input", { name: "file", type: "file", accept: "image/*", onChange: (e) => setImageFile(e.target.files?.[0] || null), placeholder: "Password", className: "w-full rounded-md border px-3 py-2 text-sm" }), _jsx("button", { onClick: handleSubmit, className: "mt-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md", children: "Add Category" })] })] }) })] })] }));
};
export default AddCategory;
