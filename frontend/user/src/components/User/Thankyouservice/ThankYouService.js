import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router";
const ThankYouPage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    return (_jsx("div", { className: "min-h-screen flex flex-col", children: _jsx("main", { className: "flex-grow flex items-center justify-center bg-gray-50 px-4 py-20", children: _jsxs("div", { className: "bg-white rounded-xl shadow-lg text-center p-8 max-w-md w-full", children: [_jsx("div", { className: "bg-[#0B1C42] text-white rounded-t-xl py-4 text-lg font-semibold", children: "Successful Order" }), _jsxs("div", { className: "py-10", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Thank you for the Service!!" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Your Payment is successfully Completed.Thank You!" }), _jsx("button", { onClick: handleClick, className: "bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full", children: "Home" })] })] }) }) }));
};
export default ThankYouPage;
