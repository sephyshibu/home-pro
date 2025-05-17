import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { BookingDetails } from "../../../api/UserApi/Service/fetchbooking";
import { useNavigate } from "react-router";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { updatecancelreason } from "../../../api/UserApi/cancelrequest/Cancelreason";
import toast from "react-hot-toast";
const getWorkStatusColor = (status) => {
    switch (status) {
        case "InProgress": return "text-yellow-600";
        case "Pending": return "text-orange-600";
        case "Paused": return "text-blue-600";
        case "Completed": return "text-green-600";
        default: return "";
    }
};
const getTechStatusColor = (status) => {
    return status === "Accepted" ? "text-green-600" : "text-red-600";
};
const MyServicesPage = () => {
    const userId = localStorage.getItem("userId");
    const [booking, setbooking] = useState([]);
    const [bookingid, setbookingid] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isopen, setisopen] = useState(false);
    const [form, setform] = useState({
        userremark: ""
    });
    const handleChange = (e) => {
        setform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate();
    useEffect(() => {
        const fetchbookvaLUES = async () => {
            if (!userId) {
                navigate('/login');
                return;
            }
            try {
                const bookingdetails = await BookingDetails(userId, currentPage);
                console.log(bookingdetails.bookings);
                setbooking(bookingdetails.bookings);
                setTotalPages(bookingdetails.totalPages);
            }
            catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchbookvaLUES();
    }, [currentPage]);
    const handleView = async (bookingdetails) => {
        navigate('/viewbookingddetails', { state: bookingdetails });
    };
    const handleAdduserremark = async (bookingId) => {
        const trimmedRemark = form.userremark.trim();
        // Check for empty input or only special characters
        const isValid = /^[a-zA-Z0-9 ]+$/.test(trimmedRemark); // Only letters, numbers, and spaces allowed
        if (!trimmedRemark || !isValid) {
            toast.error("Please enter a valid cancel reason (no special characters only)");
            return;
        }
        try {
            const response = await updatecancelreason(bookingId, trimmedRemark);
            setisopen(false);
            toast.success(response.message);
            setbooking((prev) => prev
                ? prev.map((item) => item._id === bookingId ? { ...item, userremark: trimmedRemark } : item)
                : []);
            setform({ userremark: "" });
        }
        catch (err) {
            console.error("Error updating cancel reason", err);
        }
    };
    const retryPayment = async (bookingId, amount) => {
        if (!userId) {
            toast.error("User not logged in");
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
                    await axiosInstanceuser.post("/confirm-payment-retry", {
                        userId,
                        razorpay_payment_id: response.razorpay_payment_id,
                        bookingId, // reusing the same booking
                    });
                    toast.success("Payment retried successfully!");
                    window.location.reload(); // optional: reload to reflect new status
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
            toast.error("Error initiating retry payment");
            console.error(error);
        }
    };
    const cancel = (id) => {
        setbookingid(id);
        setisopen(true);
    };
    return (_jsx("div", { className: "min-h-screen flex flex-col", children: _jsxs("div", { className: "flex flex-grow bg-gray-50", children: [_jsxs("main", { className: "flex-grow p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "My Bookings" }), _jsxs("div", { className: "overflow-x-auto", children: [_jsxs("table", { className: "min-w-full bg-white shadow-md rounded-lg overflow-hidden", children: [_jsx("thead", { className: "bg-[#0B1C42] text-white", children: _jsxs("tr", { children: [_jsx("th", { className: "py-3 px-4 text-left", children: "Technician" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Service" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Tech Status" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Work Status" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Scheduled Date" }), _jsx("th", { className: "py-3 px-4 text-center", children: "Action" })] }) }), _jsx("tbody", { children: booking && booking.map((bookingItem, idx) => (_jsxs("tr", { className: "border-b hover:bg-gray-100", children: [_jsxs("td", { className: "px-4 py-3 flex items-center space-x-2", children: [_jsx("img", { src: bookingItem.techimage, alt: "Technician", className: "w-8 h-8 rounded-full" }), _jsx("span", { children: bookingItem.technicianname })] }), _jsx("td", { className: "px-4 py-3", children: bookingItem.Category }), _jsx("td", { className: `px-4 py-3 font-medium ${getTechStatusColor(bookingItem.techStatus)}`, children: bookingItem.techStatus }), _jsxs("td", { className: "px-4 py-3", children: [(bookingItem.userremark == '') && (_jsx("span", { className: `block font-medium ${getWorkStatusColor(bookingItem.workStatus)}`, children: bookingItem.workStatus })), bookingItem.refundrequestAccept ? (_jsx("span", { className: "inline-block mt-1 text-xs text-yellow-600 bg-red-100 px-2 py-0.5 rounded-full", children: "Refunded" })) :
                                                                (bookingItem.userremark && (_jsx("span", { className: "inline-block mt-1 text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full", children: bookingItem.userremark })))] }), _jsx("td", { className: "px-4 py-3", children: bookingItem.date }), _jsx("td", { className: "px-4 py-3 text-center", children: bookingItem.consultationpayStatus === "completed" && _jsx("button", { className: "bg-[#00BFFF] hover:bg-[#009FCC] text-white px-4 py-1 rounded-md", onClick: () => handleView(bookingItem), children: "View" }) }), _jsx("td", { children: bookingItem.consultationpayStatus === "failed" && (_jsx("button", { onClick: () => retryPayment(bookingItem._id, bookingItem.consultationFee), className: "mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700", children: "Retry Payment" })) }), _jsx("td", { children: (bookingItem.techStatus.toLowerCase() == "pending" && bookingItem.userremark == '' && bookingItem.consultationpayStatus === 'completed') && (_jsx("button", { onClick: () => cancel(bookingItem._id), className: "mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700", children: "Cancel" })) })] }, idx))) })] }), _jsxs("div", { className: "flex justify-center mt-6 space-x-2", children: [_jsx("button", { onClick: () => setCurrentPage((prev) => Math.max(prev - 1, 1)), disabled: currentPage === 1, className: "px-4 py-2 bg-gray-200 rounded disabled:opacity-50", children: "Previous" }), Array.from({ length: totalPages }, (_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `px-4 py-2 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`, children: i + 1 }, i + 1))), _jsx("button", { onClick: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)), disabled: currentPage === totalPages, className: "px-4 py-2 bg-gray-200 rounded disabled:opacity-50", children: "Next" })] })] })] }), _jsxs(Dialog, { open: isopen, onClose: () => setisopen(false), className: "relative z-[999]", children: [_jsx("div", { className: "fixed inset-0 bg-black/30 z-[999]", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto", children: _jsxs(DialogPanel, { className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl  z-[1001]", children: [_jsx(DialogTitle, { className: "text-lg font-bold mb-4", children: "Add Cancel reason" }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { name: "userremark", value: form.userremark, onChange: handleChange, placeholder: "Cancel reason", className: "w-full border px-3 py-2 rounded" }), _jsx("button", { onClick: () => bookingid && handleAdduserremark(bookingid), className: "w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded", children: "Submit Cancel Reason" })] })] }) })] })] }) }));
};
export default MyServicesPage;
