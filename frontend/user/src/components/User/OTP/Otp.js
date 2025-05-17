import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { useNavigate, useLocation } from "react-router";
import logo from '../../../../public/images/Resized/Logo Landscape white-01-01.png';
const Otp = () => {
    const [otp, setotp] = useState({ otp: "" });
    const [error, seterror] = useState('');
    const [msg, setmsg] = useState('');
    const [min, setmin] = useState(1);
    const [sec, setsec] = useState(0);
    const [timerActive, settimeractive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const details = location.state?.details;
    console.log(details);
    useEffect(() => {
        let interval;
        if (min > 0 || sec > 0) {
            interval = setInterval(() => {
                if (sec > 0) {
                    setsec((prev) => prev - 1);
                }
                else if (min > 0) {
                    setmin((prev) => prev - 1);
                    setsec(59);
                }
            }, 1000);
        }
        else {
            settimeractive(true);
        }
        return () => clearInterval(interval);
    }), [min, sec];
    const handleChange = (e) => {
        setotp({ ...otp, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstanceuser.post('/verifyotp', { otp: otp.otp, details });
            setmsg(response.data.message);
            seterror('');
            navigate('/login');
        }
        catch (err) {
            seterror(err.response?.data?.message || 'Something went wrong.');
            setmsg('');
        }
    };
    const handleResend = async () => {
        try {
            await axiosInstanceuser.post('/resendotp', { details });
            setmsg('OTP resent successfully!');
            seterror('');
            setmin(1);
            setsec(0);
            settimeractive(false);
        }
        catch (err) {
            seterror(err.response?.data?.message || 'Something went wrong.');
            setmsg('');
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-[#0A1D56] relative overflow-hidden px-4", children: [_jsx("div", { className: "absolute -top-10 flex flex-col items-center z-10", children: _jsx("img", { src: logo, alt: "HomePro Logo", className: "w-80 h-39 mt-34" }) }), _jsx("div", { className: "flex items-center justify-center gap-8 mt-32", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-20 max-w-full", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Verify OTP" }), _jsxs("form", { className: "flex flex-col space-y-4 w-80", onSubmit: handleSubmit, children: [_jsx("input", { type: "text", className: "border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400", placeholder: "Enter OTP", name: "otp", value: otp.otp, onChange: handleChange }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition", children: "Verify OTP" }), _jsx("div", { className: "text-center", children: _jsxs("p", { className: "text-gray-700", children: ["Time Remaining: ", _jsxs("span", { className: "font-semibold", children: [min, ":", sec < 10 ? `0${sec}` : sec] })] }) }), timerActive && (_jsx("button", { type: "button", onClick: handleResend, className: "text-red-600 underline", disabled: min > 0 || sec > 0, children: "Resend OTP" })), error && _jsx("p", { className: "text-red-500", children: error }), msg && _jsx("p", { className: "text-green-500", children: msg })] })] }) })] }));
};
export default Otp;
