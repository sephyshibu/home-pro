import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { fetchrefunndallreq } from '../../../api/AdminApi/Refund/fetchrefundrequest';
import { acceptrefundrequest } from '../../../api/AdminApi/Refund/Acceptrefund';
const RefundRequest = () => {
    const [refundreq, setrefundreq] = useState([]);
    const navigate = useNavigate();
    const adminId = localStorage.getItem('adminId');
    useEffect(() => {
        const fetchrefundreq = async () => {
            if (!adminId) {
                navigate('/');
                return;
            }
            try {
                const refundreqdetails = await fetchrefunndallreq();
                const filtered = refundreqdetails.filter((req) => !req.refundrequestAccept);
                setrefundreq(filtered);
            }
            catch (error) {
                console.error('Error fetching refund request:', error);
            }
        };
        fetchrefundreq();
    }, []);
    const AcceptRefund = async (id) => {
        try {
            const response = await acceptrefundrequest(id);
            toast.success(response.message);
            setrefundreq(prev => prev ? prev.filter(req => req._id !== id) : []);
        }
        catch (error) {
            console.error('Error accepting refund request:', error);
        }
    };
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-gray-50", children: [_jsx("main", { className: "flex-grow flex justify-center items-start p-8", children: _jsxs("div", { className: "bg-white p-6 rounded-xl w-full max-w-7xl shadow-md", children: [_jsx("h1", { className: "text-xl font-semibold mb-6 text-center text-gray-800", children: "Refund Requests" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full table-auto text-sm text-gray-800", children: [_jsx("thead", { className: "bg-gray-200 text-gray-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-3 py-2 text-left", children: "User Name" }), _jsx("th", { className: "px-3 py-2 text-left", children: "Contact" }), _jsx("th", { className: "px-3 py-2 text-left", children: "Technician" }), _jsx("th", { className: "px-3 py-2 text-left", children: "Consultation Fee" }), _jsx("th", { className: "px-3 py-2 text-left", children: "Tech Status" }), _jsx("th", { className: "px-3 py-2 text-left", children: "Date" }), _jsx("th", { className: "px-3 py-2 text-left", children: "User Remark" }), _jsx("th", { className: "px-3 py-2 text-left", children: "Payment Status" }), _jsx("th", { className: "px-3 py-2 text-center", children: "Action" })] }) }), _jsx("tbody", { children: refundreq && refundreq.length > 0 ? (refundreq.map((req) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "px-3 py-2", children: req.username }), _jsx("td", { className: "px-3 py-2", children: req.userphone }), _jsx("td", { className: "px-3 py-2", children: req.techname }), _jsxs("td", { className: "px-3 py-2", children: ["\u20B9", req.consultationFee] }), _jsx("td", { className: "px-3 py-2", children: req.techStatus }), _jsx("td", { className: "px-3 py-2", children: req.date }), _jsx("td", { className: "px-3 py-2", children: req.userremark }), _jsx("td", { className: "px-3 py-2", children: req.consultationpaymentStatus }), _jsx("td", { className: "px-3 py-2 text-center", children: _jsx("button", { className: "bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 transition", onClick: () => AcceptRefund(req._id), children: "Accept" }) })] }, req._id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 9, className: "text-center py-4 text-gray-500", children: "No refund requests found." }) })) })] }) })] }) }), _jsx("footer", { className: "bg-black text-white text-sm py-6 mt-10", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-4", children: [_jsxs("div", { className: "mb-4 md:mb-0", children: [_jsx("h3", { className: "font-bold text-lg mb-2", children: "\uD83C\uDFE0 HomePro" }), _jsx("p", { children: "Your Home. Our Priority" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { children: "Privacy Policy" }), _jsx("p", { children: "Terms & Conditions" }), _jsx("p", { children: "Help Center" })] })] }) })] }));
};
export default RefundRequest;
