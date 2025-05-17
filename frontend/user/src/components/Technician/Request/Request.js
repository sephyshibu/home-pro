import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// import { fetchrequest } from '../../api/RequestFetch/requestfetch';
import { fetchrequest } from '../../../api/TechApi/RequestFetch/requestfetch';
import { aceptRequest } from '../../../api/TechApi/AcceptRequest/acceptrequest';
import toast from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import { rejectRequest } from '../../../api/TechApi/RejectRequest/rejectrequest';
const TechnicianRequestPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [rejectingId, setRejectingId] = useState(null);
    const techId = localStorage.getItem("techId");
    const [request, setrequest] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fecthbookinghavereq = async () => {
            if (!techId) {
                navigate('/tech');
                return;
            }
            try {
                const requestdetails = await fetchrequest(techId);
                console.log(requestdetails);
                setrequest(requestdetails);
            }
            catch (error) {
                console.error("Error fetching request:", error);
            }
        };
        fecthbookinghavereq();
    }, []);
    const handleAccept = async (id) => {
        if (!techId)
            return;
        try {
            await aceptRequest(id);
            setrequest((prev) => prev ? prev.filter((r) => r._id !== id) : null);
            closeModal();
            toast.success("request accepted");
        }
        catch (error) {
            console.error("Error accepting request:", error);
        }
    };
    const handleReject = async () => {
        if (!rejectingId || !rejectReason.trim()) {
            toast.error("Please enter a reason.");
            return;
        }
        try {
            // Call backend API
            const response = await rejectRequest(rejectingId, rejectReason);
            // Update UI
            setrequest(prev => prev ? prev.filter(r => r._id !== rejectingId) : []);
            closeRejectModal();
            toast.success(response.message || "Request rejected successfully");
        }
        catch (error) {
            toast.error("Failed to reject request");
            console.error("Reject error:", error);
        }
    };
    const openRejectModal = (id) => {
        setRejectingId(id);
        setRejectReason('');
    };
    const closeRejectModal = () => {
        setRejectingId(null);
        setRejectReason('');
    };
    const openModal = (req) => {
        setSelectedRequest(req);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setSelectedRequest(null);
    };
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-white", children: [_jsx("main", { className: "flex-grow flex justify-center items-start mt-8", children: _jsxs("div", { className: "bg-gray-100 p-6 rounded-xl w-full max-w-4xl shadow", children: [_jsxs("div", { className: "grid grid-cols-6 font-semibold text-gray-700 text-sm border-b pb-3", children: [_jsx("div", { className: "col-span-1", children: "User Name" }), _jsx("div", { className: "col-span-1", children: "Contact Number" }), _jsx("div", { className: "col-span-1", children: "Date of Work" }), _jsx("div", { className: "col-span-1", children: "Action" })] }), _jsx("div", { className: "mt-4 space-y-4", children: request && request.map((req) => (_jsxs("div", { className: "grid grid-cols-6 items-center text-sm text-gray-800 bg-white rounded shadow px-4 py-3", children: [_jsx("div", { className: "col-span-1", children: req.username }), _jsx("div", { className: "col-span-1", children: req.userphone }), _jsx("div", { className: "col-span-1", children: req.pincode }), _jsx("div", { className: "col-span-1", children: req.date }), _jsxs("div", { className: "col-span-1 flex justify-center items-center gap-2", children: [_jsx("button", { className: "bg-blue-600 text-white px-3 py-1 rounded hover:bg-yellow-500", onClick: () => openModal(req), children: "View" }), _jsx("button", { className: "bg-green-600 text-white px-3 py-1 rounded hover:bg-yellow-500", onClick: () => handleAccept(req._id), children: "Accept" }), _jsx("button", { className: "bg-red-600 text-white px-3 py-1 rounded hover:bg-yellow-500", onClick: () => openRejectModal(req._id), children: "Reject" })] })] }, req._id))) })] }) }), _jsx(Dialog, { open: isOpen, onClose: closeModal, className: "fixed z-50 inset-0 overflow-y-auto", children: _jsx("div", { className: "flex items-center justify-center min-h-screen px-4", children: _jsxs(Dialog.Panel, { className: "bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl", children: [_jsx(Dialog.Title, { className: "text-lg font-bold mb-4 border-b pb-2", children: "Request Details" }), selectedRequest && (_jsxs("div", { className: "space-y-2 text-gray-700", children: [_jsxs("p", { children: [_jsx("strong", { children: "Username:" }), " ", selectedRequest.username] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone:" }), " ", selectedRequest.userphone] }), _jsxs("p", { children: [_jsx("strong", { children: "Category:" }), " ", selectedRequest.Category] }), _jsxs("p", { children: [_jsx("strong", { children: "Date:" }), " ", selectedRequest.date] }), _jsxs("p", { children: [_jsx("strong", { children: "Work Address:" }), " ", selectedRequest.workaddress] }), _jsxs("p", { children: [_jsx("strong", { children: "Rate/Hour:" }), " \u20B9", selectedRequest.rateperhour] }), _jsxs("p", { children: [_jsx("strong", { children: "Consultation Fee:" }), " \u20B9", selectedRequest.consultationFee] }), _jsxs("p", { children: [_jsx("strong", { children: "Consultation Payment Status:" }), " ", selectedRequest.consultationpaymentStatus] }), _jsxs("p", { children: [_jsx("strong", { children: "Final Payment Status:" }), " ", selectedRequest.finalpaymentStatus] }), _jsxs("p", { children: [_jsx("strong", { children: "Work Status:" }), " ", selectedRequest.workStatus] }), _jsxs("p", { children: [_jsx("strong", { children: "Technician Phone:" }), " ", selectedRequest.techphone] }), _jsx("a", { href: selectedRequest.locationUrl, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 underline", children: "View Location" })] })), _jsx("div", { className: "mt-4 text-right", children: _jsx("button", { className: "bg-blue-600 text-white px-4 py-2 rounded", onClick: closeModal, children: "Close" }) })] }) }) }), _jsx(Dialog, { open: !!rejectingId, onClose: closeRejectModal, className: "fixed z-50 inset-0 overflow-y-auto", children: _jsx("div", { className: "flex items-center justify-center min-h-screen px-4", children: _jsxs(Dialog.Panel, { className: "bg-white rounded-xl p-6 w-full max-w-md shadow-xl", children: [_jsx(Dialog.Title, { className: "text-lg font-bold mb-4", children: "Reject Request" }), _jsx("textarea", { placeholder: "Enter reason for rejection", className: "w-full p-2 border rounded mb-4", value: rejectReason, onChange: (e) => setRejectReason(e.target.value) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx("button", { className: "bg-gray-300 px-4 py-2 rounded", onClick: closeRejectModal, children: "Cancel" }), _jsx("button", { className: "bg-red-600 text-white px-4 py-2 rounded", onClick: handleReject, children: "Submit" })] })] }) }) }), _jsx("footer", { className: "bg-black text-white text-sm py-6 mt-12", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-4", children: [_jsxs("div", { className: "mb-4 md:mb-0", children: [_jsx("h3", { className: "font-bold text-lg mb-2", children: "\uD83C\uDFE0 HomePro" }), _jsx("p", { children: "Your Home. Our Priority" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { children: "Privacy Policy" }), _jsx("p", { children: "Terms & Conditions" }), _jsx("p", { children: "Help Center" })] })] }) })] }));
};
export default TechnicianRequestPage;
