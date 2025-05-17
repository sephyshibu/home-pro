import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { useNavigate, useLocation } from "react-router";
import logo from '../../../../public/images/Resized/Logo Landscape white-01-01.png';
const ChangePassword = () => {
    const [formdata, setformdata] = useState({
        password: "",
        confirmpassword: "",
    });
    const location = useLocation();
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState({});
    const navigate = useNavigate();
    const email = location.state.details;
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
            const response = await axiosInstanceuser.post('/chnagepasswords', { password, email });
            navigate('/login');
            console.log(response?.data?.message);
        }
        catch (error) {
            console.error("signup errror", error);
            seterror(error.response?.data?.message || "Something went wrong");
        }
        finally {
            setloading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-[#0A1D56] relative overflow-hidden px-4", children: [_jsx("div", { className: "absolute -top-10 flex flex-col items-center z-10", children: _jsx("img", { src: logo, alt: "HomePro Logo", className: "w-80 h-39 mt-34" }) }), _jsx("div", { className: "flex items-center justify-center gap-8 mt-32", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-20 max-w-full", children: [_jsx("h2", { className: "text-2xl font-bold text-center text-[#0A1D56] mb-6", children: "USER SIGNUP" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsx("input", { type: "password", name: "password", placeholder: "Enter password", value: formdata.password, onChange: handleChange, className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]" }), error.password && _jsx("p", { className: "text-red-500 text-center text-sm", children: error.password }), _jsx("input", { type: "password", name: "confirmpassword", placeholder: "Enter Confirmpassword", value: formdata.confirmpassword, onChange: handleChange, className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]" }), error.confirmpassword && _jsx("p", { className: "text-red-500 text-center text-sm", children: error.confirmpassword }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-[#00A9FF] hover:bg-[#008BD1] text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105", children: loading ? "Changingg..." : "Change Password" })] })] }) }), _jsx("div", { className: "absolute bottom-0 mb-4 flex flex-col items-center text-white text-xs", children: _jsx("p", { children: "\u00A9 2025 HomePro" }) })] }));
};
export default ChangePassword;
