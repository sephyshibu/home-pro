import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Changepasswordapi } from "../../../api/TechApi/PasswordChange/changepassword";
const ChangePasswords = () => {
    console.log("cdsihiwdhvi");
    const [formdata, setformdata] = useState({
        password: "",
        confirmpassword: "",
    });
    const techId = localStorage.getItem("techId");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        setformdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        seterror({});
        setloading(true);
        let formErrors = {};
        let isValid = true;
        // Password validation (at least 6 characters, one uppercase, one lowercase, one special character)
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
        if (!formdata.password) {
            formErrors.password = 'Password is required.';
            isValid = false;
        }
        else if (!passwordPattern.test(formdata.password)) {
            formErrors.password = 'Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, and one special character.';
            isValid = false;
        }
        // Confirm password validation
        if (formdata.confirmpassword !== formdata.password) {
            formErrors.confirmpassword = 'Passwords do not match.';
            isValid = false;
        }
        // If any validation fails, set error messages
        seterror(formErrors);
        // If any validation fails, return early
        if (!isValid) {
            setloading(false);
            return;
        }
        try {
            const { password } = formdata;
            if (!techId) {
                console.log("dwfh  no uerId");
                navigate('/tech');
                return;
            }
            console.log(password);
            const result = await Changepasswordapi(techId, password);
            toast.success(result);
        }
        catch (error) {
            console.error("password change", error);
            seterror(error.response?.data?.message || "Something went wrong");
        }
        finally {
            setloading(false);
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100", children: _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto", children: [_jsx("h3", { className: "text-2xl font-semibold mb-6", children: "Password Change" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsx("input", { type: "password", name: "password", placeholder: "Enter password", value: formdata.password, onChange: handleChange, className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]" }), error.password && _jsx("p", { className: "text-red-500 text-center text-sm", children: error.password }), _jsx("input", { type: "password", name: "confirmpassword", placeholder: "Enter Confirmpassword", value: formdata.confirmpassword, onChange: handleChange, className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]" }), error.confirmpassword && _jsx("p", { className: "text-red-500 text-center text-sm", children: error.confirmpassword }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-[#00A9FF] hover:bg-[#008BD1] text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105", children: loading ? "Changingg..." : "Change Password" })] }) })] }) }));
};
export default ChangePasswords;
