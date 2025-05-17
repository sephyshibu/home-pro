import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logintech } from "../../../features/TechSlice";
import { addtechtoken } from "../../../features/TokenTechSlice";
import { useNavigate } from "react-router";
import axiosInstancetech from "../../../Axios/TechAxios/axios";
import logo from '../../../../public/images/Resized/Logo Landscape.png';
import one from '../../../../public/images/one.png';
import two from '../../../../public/images/two.png';
const LoginTech = () => {
    const [formdata, setformdata] = useState({
        email: "",
        password: ""
    });
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);
    // const [msg, setMsg] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const techId = localStorage.getItem('techId');
        if (techId) {
            navigate('/tech/techdashboard');
        }
    }, [navigate]);
    const handleChange = (e) => {
        setformdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        seterror(null);
        setloading(true);
        if (!formdata.email && !formdata.password) {
            seterror("email and password is required");
            setloading(false);
            return;
        }
        if (!formdata.email) {
            seterror("Email is required");
            setloading(false);
            return;
        }
        if (!formdata.password) {
            seterror("password is required");
            setloading(false);
            return;
        }
        try {
            const { email, password } = formdata;
            const response = await axiosInstancetech.post('/login', { email, password });
            dispatch(logintech(response.data.tech));
            dispatch(addtechtoken({ token: response.data.token }));
            console.log(response);
            console.log("login tech data", response.data);
            const techId = response.data.tech._id;
            localStorage.setItem("techId", techId);
            seterror('');
            navigate('/tech/techdashboard');
        }
        catch (error) {
            console.error("login errror", error);
            seterror(error.response?.data?.message || "Something went wrong");
        }
        finally {
            setloading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-[#FFDF00] relative overflow-hidden px-4", children: [_jsx("div", { className: "absolute top-8 z-10", children: _jsx("img", { src: logo, alt: "HomePro Logo", className: "w-72" }) }), _jsxs("div", { className: "flex items-center justify-center gap-10 mt-32 w-full max-w-6xl", children: [_jsx("div", { className: "hidden lg:block w-[300px] h-[400px]", children: _jsx("img", { src: one, alt: "Technician working", className: "rounded-lg shadow-lg object-cover w-full h-full" }) }), _jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-20 max-w-full", children: [_jsx("h2", { className: "text-2xl font-bold text-center text-[#0A1D56] mb-6" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsx("input", { type: "email", name: "email", placeholder: "Enter email", value: formdata.email, onChange: handleChange, className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]" }), _jsx("input", { type: "password", name: "password", placeholder: "Enter Password", value: formdata.password, onChange: handleChange, className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]" }), error && _jsx("p", { className: "text-red-500 text-center text-sm", children: error }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-[#00A9FF] hover:bg-[#008BD1] text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105", children: loading ? "Logging in..." : "LOGIN" })] })] }), _jsx("div", { className: "hidden lg:block w-[300px] h-[400px]", children: _jsx("img", { src: two, alt: "Technician working", className: "rounded-lg shadow-lg object-cover w-full h-full" }) })] }), _jsx("div", { className: "absolute bottom-0 mb-4 flex flex-col items-center text-white text-xs", children: _jsx("p", { children: "\u00A9 2025 HomePro" }) })] }));
};
export default LoginTech;
