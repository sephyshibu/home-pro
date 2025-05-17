import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginuser } from "../../../features/UserSlice";
import { addtoken } from "../../../features/tokenSlice";
import { useNavigate } from "react-router";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { jwtDecode } from "jwt-decode";
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import two from '../../../../public/images/two.png';
import one from '../../../../public/images/one.png';
import logo from '../../../../public/images/Resized/Logo Landscape white-01-01.png';
const Login = () => {
    const clientId = "699319272981-124dj113d9a2aqbmo2s756u6152bher2.apps.googleusercontent.com";
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
        const userId = localStorage.getItem("userId");
        if (userId) {
            navigate("/"); // Redirect to home if user is logged in
        }
    }, [navigate]);
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            });
        }
        gapi.load('client:auth2', start);
    }, []);
    const handleChange = (e) => {
        setformdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleGoogleLogin = async (credentialresponse) => {
        console.log("fdaa");
        if (credentialresponse?.credential) {
            try {
                console.log(credentialresponse);
                const credential = jwtDecode(credentialresponse.credential);
                console.log(credential);
                const { email, sub, name } = credential;
                console.log(email);
                const response = await axiosInstanceuser.post('/googlelogin', { email, sub, name });
                console.log(response?.data);
                const userId = response.data.user._id;
                localStorage.setItem("userId", userId);
                navigate('/');
            }
            catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    seterror(err.response.data.message); // Server's custom message
                }
                else {
                    seterror('Something went wrong. Please try again.');
                }
            }
        }
    };
    const handleforget = async () => {
        navigate('/forgetpassword');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        seterror(null);
        setloading(true);
        if (!formdata.email && !formdata.password) {
            seterror("email and password is required");
            return;
        }
        if (!formdata.email) {
            seterror("Email is required");
            return;
        }
        if (!formdata.password) {
            seterror("password is required");
            return;
        }
        try {
            const { email, password } = formdata;
            const response = await axiosInstanceuser.post('/login', { email, password });
            dispatch(loginuser(response.data.user));
            dispatch(addtoken({ token: response.data.token }));
            console.log(response);
            console.log("login data", response.data);
            const userId = response.data.user._id;
            localStorage.setItem("userId", userId);
            seterror('');
            navigate('/');
        }
        catch (error) {
            console.error("login errror", error);
            seterror(error.response?.data?.message || "Something went wrong");
        }
        finally {
            setloading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-[#0A1D56] relative overflow-hidden px-4", children: [_jsx("div", { className: "absolute -top-10 flex flex-col items-center z-10", children: _jsx("img", { src: logo, alt: "HomePro Logo", className: "w-80 h-39 mt-34" }) }), _jsxs("div", { className: "flex items-center justify-center gap-8 mt-32", children: [_jsx("div", { className: "hidden lg:block w-[280px] h-[380px] lg:w-[300px] lg:h-[400px]", children: _jsx("img", { src: one, alt: "Technician working", className: "rounded-lg shadow-lg object-cover w-full h-full" }) }), _jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-20 w-[400px] lg:w-[500px]", children: [_jsx("h2", { className: "text-2xl font-bold text-center text-[#0A1D56] mb-6", children: "USER LOGIN" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsx("input", { type: "email", name: "email", placeholder: "Enter Username", value: formdata.email, onChange: handleChange, className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]" }), _jsx("input", { type: "password", name: "password", placeholder: "Enter Password", value: formdata.password, onChange: handleChange, className: "w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]" }), error && _jsx("p", { className: "text-red-500 text-center text-sm", children: error }), _jsx("button", { type: "submit", disabled: loading, className: "w-full bg-[#00A9FF] hover:bg-[#008BD1] text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105", children: loading ? "Logging in..." : "LOGIN" }), _jsx(GoogleOAuthProvider, { clientId: clientId, children: _jsx("div", { children: _jsx(GoogleLogin, { onSuccess: handleGoogleLogin, onError: () => {
                                                    seterror("google login failed");
                                                } }) }) }), _jsxs("div", { className: "text-center text-sm text-gray-600 mt-3", children: [_jsx("a", { href: "/forgetpassword", onClick: handleforget, className: "hover:underline", children: "Forgot Password?" }), _jsx("br", {}), _jsx("a", { href: "/signup", className: "hover:underline", children: "Don't have an account?" })] })] })] }), _jsx("div", { className: "hidden lg:block w-[280px] h-[380px] lg:w-[300px] lg:h-[400px]", children: _jsx("img", { src: two, alt: "Technician working", className: "rounded-lg shadow-lg object-cover w-full h-full" }) })] }), _jsx("div", { className: "absolute bottom-0 mb-4 flex flex-col items-center text-white text-xs", children: _jsx("p", { children: "\u00A9 2025 HomePro" }) })] }));
};
export default Login;
