import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import toast from "react-hot-toast";
import { uploadImageToCloudinary } from "../../../utils/cloudinaryUpload"; // <-- Make sure this exists
const EditCategory = () => {
    const { catid } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchCategory = async () => {
            if (!catid)
                return;
            try {
                const res = await axiosInstanceadmin.get(`/category/${catid}`);
                setFormData(res.data.category);
            }
            catch (error) {
                toast.error("Failed to load category data");
            }
        };
        fetchCategory();
    }, [catid]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        if (!catid)
            return;
        setLoading(true);
        try {
            let imageUrl = formData.image;
            if (imageFile) {
                const uploaded = await uploadImageToCloudinary(imageFile);
                if (!uploaded) {
                    toast.error("Image upload failed");
                    setLoading(false);
                    return;
                }
                imageUrl = uploaded;
            }
            await axiosInstanceadmin.patch(`/editcategory/${catid}`, {
                name: formData.name.trim().toLowerCase(),
                description: formData.description.trim(),
                image: imageUrl
            });
            toast.success("Category updated successfully");
            navigate("/admin/admindashboard");
        }
        catch (error) {
            console.error(error);
            toast.error("Update failed");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Edit Category" }), _jsx("input", { name: "name", value: formData.name, onChange: handleChange, className: "w-full border p-2 mb-4 rounded", placeholder: "Name" }), _jsx("input", { name: "description", value: formData.description, onChange: handleChange, className: "w-full border p-2 mb-4 rounded", placeholder: "Description" }), formData.image && !imageFile && (_jsx("img", { src: formData.image, alt: "Current", className: "mb-4 w-full h-48 object-cover rounded" })), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => setImageFile(e.target.files?.[0] || null), className: "w-full border p-2 mb-4 rounded" }), _jsx("button", { onClick: handleSubmit, disabled: loading, className: "w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded disabled:opacity-50", children: loading ? "Saving..." : "Save Changes" })] }));
};
export default EditCategory;
