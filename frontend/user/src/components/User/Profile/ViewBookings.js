import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import ChatBox from '../ChatBox';
import { finalamount } from "../../../api/UserApi/FinalAmount/finalamount";
import { persistor } from '../../../app/store';
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { acceptsessionrequest } from "../../../api/UserApi/AcceptSession/acceptsession";
import { fetchSessionRequests } from "../../../api/UserApi/Fetchsession/fetchsession";
import { toast } from "react-toastify";
const ViewBookingsProfile = () => {
    const location = useLocation();
    const bookingdetails = location.state;
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [isopen, setisopen] = useState(false);
    const [sessionRequests, setSessionRequests] = useState([]);
    const [amount, setamount] = useState(null);
    const [totalminutes, settotalminutes] = useState(null);
    const [rateperminute, setrateperminute] = useState(null);
    const [error, setError] = useState("");
    const [technician, settechnician] = useState(bookingdetails);
    const techId = technician._id;
    useEffect(() => {
        // Fetch session requests for this booking
        const fetchRequests = async () => {
            try {
                const response = await fetchSessionRequests(bookingdetails._id);
                setSessionRequests(response);
            }
            catch (err) {
                setError("Failed to fetch session requests.");
            }
        };
        fetchRequests();
    }, [bookingdetails._id]);
    const handleAccept = async (requestId) => {
        try {
            await acceptsessionrequest(bookingdetails._id, requestId, 'accepted');
            setSessionRequests((prev) => prev.map((request) => request._id === requestId ? { ...request, status: 'accepted' } : request));
        }
        catch (err) {
            setError("Failed to accept session request.");
        }
    };
    console.log("statttt", technician.techStatus);
    const handlePayment = async (bookingId) => {
        try {
            const result = await finalamount(bookingId);
            setamount(result.totalamount);
            settotalminutes(result.totalminutes);
            setrateperminute(result.rateperminute);
            setisopen(true);
        }
        catch (error) {
            console.error("Failed to fetch total amount", error);
        }
    };
    const handleRazorpay = async (bookingId, amount) => {
        if (!userId) {
            toast.error("user not logged in");
            return;
        }
        try {
            const res = await axiosInstanceuser.post(`/create-order/${userId}`, {
                amount,
            });
            const options = {
                key: "rzp_test_qp0MD1b9oAJB0i",
                amount: res.data.amount,
                currency: "INR",
                name: "HomePro",
                order_id: res.data.id,
                handler: async (response) => {
                    await axiosInstanceuser.post("/finalconfirmpayemnts", {
                        razorpay_payment_id: response.razorpay_payment_id,
                        bookingId,
                        // reusing the same booking
                    });
                    toast.success("Final Payment successfully!");
                    navigate('/thankyouservice');
                },
                prefill: {
                    name: "User HomePro",
                    email: "user@example.com",
                    contact: "9876543210",
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch (error) {
            toast.error("Error initiating final payment");
            console.error(error);
        }
    };
    const handleLoginLogout = async () => {
        if (userId) {
            localStorage.removeItem('userId');
            await persistor.purge();
            navigate('/');
        }
        else {
            navigate('/login');
        }
    };
    const shouldShowPaymentButton = technician.sessionrequest.some((req) => req.types === "end" && req.status === "accepted") && technician.finalpaymentStatus !== "completed";
    console.log("pad", shouldShowPaymentButton);
    return (_jsxs("div", { className: "bg-white min-h-screen", children: [_jsxs("div", { className: "bg-white shadow-md p-4 flex justify-between items-center", children: [_jsx(NavLink, { to: "/", className: "text-lg font-semibold text-sky-600 hover:underline", children: "\uD83C\uDFE0 Home" }), _jsx("button", { onClick: handleLoginLogout, className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium", children: "Logout" })] }), _jsx("div", { className: "max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6", children: _jsxs("div", { className: "col-span-6 bg-gray-100 p-4 rounded shadow", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Technician Profile" }), _jsxs("div", { className: "bg-white p-6 rounded flex flex-col md:flex-row justify-between items-start gap-6", children: [_jsxs("div", { className: "flex-1 space-y-3 text-base", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Personal Details" }), _jsxs("p", { children: [_jsx("strong", { children: "Name:" }), " ", technician.technicianname] }), _jsxs("p", { children: [_jsx("strong", { children: "PhoneNumber:" }), " ", technician.techphone] }), _jsxs("p", { children: [_jsx("strong", { children: "Address:" }), " ", technician.workaddress] }), _jsxs("p", { children: [_jsx("strong", { children: "Map url:" }), " ", technician.locationUrl] }), _jsxs("p", { children: [_jsx("strong", { children: "Service Category:" }), " ", technician.Category] }), _jsxs("p", { children: [_jsx("strong", { children: "Consultation Fee:" }), " \u20B9", technician.consultationFee] }), _jsxs("p", { children: [_jsx("strong", { children: "Rate per Hour:" }), " \u20B9 ", technician.rateperhour, " / hr"] }), _jsxs("p", { children: [_jsx("strong", { children: "Service Districts:" }), " ", technician.pincode] }), shouldShowPaymentButton && _jsx("button", { type: "button", className: "bg-red-500 text-white px-4 py-2 rounded-md", onClick: () => handlePayment(technician._id), children: "Payment" })] }), _jsx("div", { className: "w-40 h-40 rounded-full overflow-hidden shadow-md border-2 border-gray-300", children: _jsx("img", { src: technician.techimage, alt: "Technician Profile", className: "w-full h-full object-cover" }) })] })] }) }), _jsxs("div", { className: "max-w-6xl mx-auto py-10 px-4", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Pending Session Requests" }), !sessionRequests || sessionRequests.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center mt-6", children: "No session requests available." })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4", children: sessionRequests.map((request) => (_jsxs("div", { className: "bg-white shadow-lg rounded-2xl p-6 border border-gray-200", children: [_jsxs("h3", { className: "bg-white shadow-lg rounded-2xl p-6 border border-gray-200", children: ["Request: ", request.types] }), _jsxs("p", { className: "text-gray-600 mb-4", children: [_jsx("span", { className: "font-semibold", children: "Status:" }), " ", request.status] }), request.status === 'pending' && (_jsx("div", { className: "flex justify-end", children: _jsx("button", { onClick: () => handleAccept(request._id), className: "bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300", children: "Accept" }) }))] }, request._id))) })), technician.techStatus?.trim().toLowerCase() === "accepted" && technician.workStatus.trim().toLowerCase() != 'completed' && (_jsxs("div", { className: "col-span-6 mt-6", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Chat with Technician" }), _jsx(ChatBox, { bookingId: technician._id, userId: userId, techId: technician.techIds })] }))] }), _jsxs(Dialog, { open: isopen, onClose: () => setisopen(false), className: "relative z-[999]", children: [_jsx("div", { className: "fixed inset-0 bg-black/30 z-[999]", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto", children: _jsxs(DialogPanel, { className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl z-[1001]", children: [_jsx(DialogTitle, { className: "text-lg font-bold mb-4", children: "Confirm Payment" }), amount !== null ? (_jsxs(_Fragment, { children: [_jsxs("p", { children: [_jsx("strong", { children: "Total Minutes:" }), " ", totalminutes] }), _jsxs("p", { children: [_jsx("strong", { children: "Rate per Minute:" }), " ", rateperminute] }), _jsxs("p", { children: [_jsx("strong", { children: "Total Amount:" }), " \u20B9", amount] }), _jsx("button", { onClick: () => handleRazorpay(bookingdetails._id, amount), className: "mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded", children: "Pay Now" })] })) : (_jsx("p", { children: "Loading payment details..." }))] }) })] })] }));
};
export default ViewBookingsProfile;
