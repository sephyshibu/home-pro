import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import ChatBox from '../ChatBox';
import { useNavigate } from 'react-router';
import { fetchupcomingevents } from '../../../api/TechApi/Upcomingevents/upcomingevents';
// import { aceptRequest } from '../../api/AcceptRequest/acceptrequest';
// import toast, {  } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import axiosInstancetech from "../../../Axios/TechAxios/axios";
import toast from 'react-hot-toast';
const TechnicianUpcoming = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const techId = localStorage.getItem("techId");
    const [upcoming, setupcoming] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchupcomingevent = async () => {
            if (!techId) {
                navigate('/tech');
                return;
            }
            try {
                const upcomingeventsdetails = await fetchupcomingevents(techId);
                console.log(upcomingeventsdetails);
                setupcoming(upcomingeventsdetails);
            }
            catch (error) {
                console.error("Error fetching upcoming events:", error);
            }
        };
        fetchupcomingevent();
    }, []);
    const openModal = (req) => {
        console.log("req", req);
        setSelectedRequest(req);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setSelectedRequest(null);
    };
    const handleRequestSession = async (types) => {
        try {
            const bookingId = selectedRequest?._id;
            const result = await axiosInstancetech.post(`/requestsession/${bookingId}`, { types });
            console.log(result.data);
            toast.success(`${types} request is sent to the user`);
        }
        catch (error) {
            toast.error(`Failed to send ${types}request`);
        }
    };
    const getLatestStatusMap = (requests) => {
        const statusMap = {};
        // Loop through and override with latest status by type
        for (const req of requests) {
            statusMap[req.types] = req.status;
        }
        return statusMap;
    };
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-white", children: [_jsx("main", { className: "flex-grow flex justify-center items-start mt-8", children: _jsxs("div", { className: "bg-gray-100 p-6 rounded-xl w-full max-w-4xl shadow", children: [_jsxs("div", { className: "grid grid-cols-6 font-semibold text-gray-700 text-sm border-b pb-3", children: [_jsx("div", { className: "col-span-1", children: "User Name" }), _jsx("div", { className: "col-span-1", children: "Contact Number" }), _jsx("div", { className: "col-span-1", children: "Date of Work" }), _jsx("div", { className: "col-span-1", children: "Work Status" }), _jsx("div", { className: "col-span-1", children: "Action" })] }), _jsx("div", { className: "mt-4 space-y-4", children: upcoming && upcoming.map((req) => (_jsxs("div", { className: "grid grid-cols-6 items-center text-sm text-gray-800 bg-white rounded shadow px-4 py-3", children: [_jsx("div", { className: "col-span-1", children: req.username }), _jsx("div", { className: "col-span-1", children: req.userphone }), _jsx("div", { className: "col-span-1", children: req.date }), _jsx("div", { className: "col-span-1", children: req.workStatus }), _jsx("div", { className: "col-span-1 text-center", children: _jsx("button", { className: "bg-[#FFDF00] text-black px-3 py-1 rounded hover:bg-yellow-500", onClick: () => openModal(req), children: "View" }) })] }, req._id))) })] }) }), _jsx(Dialog, { open: isOpen, onClose: closeModal, className: "fixed z-50 inset-0 overflow-y-auto", children: _jsx("div", { className: "flex items-center justify-center min-h-screen px-4", children: _jsxs(Dialog.Panel, { className: "bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl", children: [_jsx(Dialog.Title, { className: "text-lg font-bold mb-4 border-b pb-2", children: "Request Details" }), selectedRequest && (_jsxs("div", { className: "space-y-2 text-gray-700", children: [_jsxs("p", { children: [_jsx("strong", { children: "Username:" }), " ", selectedRequest.username] }), _jsxs("p", { children: [_jsx("strong", { children: "Phone:" }), " ", selectedRequest.userphone] }), _jsxs("p", { children: [_jsx("strong", { children: "Category:" }), " ", selectedRequest.Category] }), _jsxs("p", { children: [_jsx("strong", { children: "Date:" }), " ", selectedRequest.date] }), _jsxs("p", { children: [_jsx("strong", { children: "Work Address:" }), " ", selectedRequest.workaddress] }), _jsxs("p", { children: [_jsx("strong", { children: "Rate/Hour:" }), " \u20B9", selectedRequest.rateperhour] }), _jsxs("p", { children: [_jsx("strong", { children: "Consultation Fee:" }), " \u20B9", selectedRequest.consultationFee] }), _jsxs("p", { children: [_jsx("strong", { children: "Consultation Payment Status:" }), " ", selectedRequest.consultationpaymentStatus] }), _jsxs("p", { children: [_jsx("strong", { children: "Final Payment Status:" }), " ", selectedRequest.finalpaymentStatus] }), _jsxs("p", { children: [_jsx("strong", { children: "Work Status:" }), " ", selectedRequest.workStatus] }), _jsxs("p", { children: [_jsx("strong", { children: "Technician Phone:" }), " ", selectedRequest.techphone] }), _jsx("a", { href: selectedRequest.locationUrl, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 underline", children: "View Location" })] })), selectedRequest && (_jsx(ChatBox, { bookingId: selectedRequest._id, userId: selectedRequest.userId, techId: techId })), selectedRequest && (() => {
                                const statusMap = getLatestStatusMap(selectedRequest.sessionrequest);
                                const isPauseAccepted = selectedRequest.isPauseAccept;
                                const isResumeAccepted = selectedRequest.isResumeAccept;
                                const isStartAccepted = statusMap["start"] === "accepted" || selectedRequest.workStatus === "InProgress" || selectedRequest.workStatus === "Resume";
                                const isEndAccepted = statusMap["end"] === "accepted" || selectedRequest.workStatus === "Completed";
                                const canPause = isStartAccepted && !isEndAccepted && !isPauseAccepted;
                                const canResume = isPauseAccepted && !isEndAccepted && !isResumeAccepted;
                                const canEnd = (isStartAccepted || isResumeAccepted) && !isEndAccepted;
                                return (_jsxs("div", { className: "mt-6 flex justify-center gap-4", children: [_jsx("button", { className: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50", onClick: () => handleRequestSession('start'), disabled: isStartAccepted || isEndAccepted, children: "Accept" }), _jsx("button", { className: "bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50", onClick: () => handleRequestSession('pause'), disabled: !canPause, children: "Pause" }), _jsx("button", { className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50", onClick: () => handleRequestSession('resume'), disabled: !canResume, children: "Resume" }), _jsx("button", { className: "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50", onClick: () => handleRequestSession('end'), disabled: !canEnd, children: "End" })] }));
                            })()] }) }) }), _jsx("footer", { className: "bg-black text-white text-sm py-6 mt-12", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-4", children: [_jsxs("div", { className: "mb-4 md:mb-0", children: [_jsx("h3", { className: "font-bold text-lg mb-2", children: "\uD83C\uDFE0 HomePro" }), _jsx("p", { children: "Your Home. Our Priority" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { children: "Privacy Policy" }), _jsx("p", { children: "Terms & Conditions" }), _jsx("p", { children: "Help Center" })] })] }) })] }));
};
export default TechnicianUpcoming;
