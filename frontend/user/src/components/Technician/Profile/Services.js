import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { BookingDetails } from "../../../api/TechApi/FetchBookings/fetchcompletedandrejected";
import { useNavigate } from "react-router";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
const getWorkStatusColor = (status) => {
    switch (status) {
        case "InProgress": return "text-yellow-600";
        case "Pending": return "text-orange-600";
        case "Paused": return "text-blue-600";
        case "Completed": return "text-green-600";
        default: return "";
    }
};
const MyServicesPage = () => {
    const techId = localStorage.getItem("techId");
    const [booking, setbooking] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isopen, setisopen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchbookvaLUES = async () => {
            if (!techId) {
                navigate('/tech');
                return;
            }
            try {
                const bookingdetails = await BookingDetails(techId);
                console.log(bookingdetails);
                setbooking(bookingdetails);
            }
            catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchbookvaLUES();
    }, []);
    const handleView = async (bookingdetails) => {
        setSelectedBooking(bookingdetails);
        setisopen(true);
    };
    console.log("booking", booking);
    return (_jsx("div", { className: "min-h-screen flex flex-col", children: _jsxs("div", { className: "flex flex-grow bg-gray-50", children: [_jsxs("main", { className: "flex-grow p-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "My Bookings" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full bg-white shadow-md rounded-lg overflow-hidden", children: [_jsx("thead", { className: "bg-[#0B1C42] text-white", children: _jsxs("tr", { children: [_jsx("th", { className: "py-3 px-4 text-left", children: "UserName" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Contact Number" }), _jsx("th", { className: "py-3 px-4 text-left", children: "User/Tech Remark" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Work Status" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Scheduled Date" }), _jsx("th", { className: "py-3 px-4 text-center", children: "Action" })] }) }), _jsx("tbody", { children: booking && booking.map((bookingItem, idx) => (_jsxs("tr", { className: "border-b hover:bg-gray-100", children: [_jsx("td", { className: "px-4 py-3 flex items-center space-x-2", children: bookingItem.userId.name }), _jsx("td", { className: "px-4 py-3", children: bookingItem.userId.phone }), _jsx("td", { className: "px-4 py-3", children: bookingItem.userremark ? bookingItem.userremark : bookingItem.techremark }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `block font-medium ${getWorkStatusColor(bookingItem.workstatus)}`, children: bookingItem.workstatus }) }), _jsx("td", { className: "px-4 py-3", children: bookingItem.booked_date }), _jsx("td", { className: "px-4 py-3 text-center", children: _jsx("button", { className: "bg-[#00BFFF] hover:bg-[#009FCC] text-white px-4 py-1 rounded-md", onClick: () => handleView(bookingItem), children: "View" }) })] }, idx))) })] }) })] }), _jsxs(Dialog, { open: isopen, onClose: () => setisopen(false), className: "relative z-[999]", children: [_jsx("div", { className: "fixed inset-0 bg-black/30 z-[999]", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto", children: _jsxs(DialogPanel, { className: "w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl z-[1001]", children: [_jsx(DialogTitle, { className: "text-xl font-bold mb-4", children: "Booking Details" }), selectedBooking && (_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("strong", { children: "User Name:" }), " ", selectedBooking.userId.name] }), _jsxs("div", { children: [_jsx("strong", { children: "User Phone:" }), " ", selectedBooking.userId.phone] }), _jsxs("div", { children: [_jsx("strong", { children: "Category:" }), " ", selectedBooking.technicianId.categoryid.name] }), _jsxs("div", { children: [_jsx("strong", { children: "Technician Status:" }), " ", selectedBooking.isconfirmedbyTech] }), _jsxs("div", { children: [_jsx("strong", { children: "Work Status:" }), " ", selectedBooking.workstatus] }), _jsxs("div", { children: [_jsx("strong", { children: "Scheduled Date:" }), " ", selectedBooking.booked_date] }), _jsxs("div", { children: [_jsx("strong", { children: "Rate per Hour:" }), " \u20B9", selectedBooking.rateperhour] }), _jsxs("div", { children: [_jsx("strong", { children: "Consultation Fee:" }), " \u20B9", selectedBooking.consultationFee] }), _jsxs("div", { children: [_jsx("strong", { children: "Consultation Pay Status:" }), " ", selectedBooking.consultationpayStatus] }), _jsxs("div", { children: [_jsx("strong", { children: "Final Payment Status:" }), " ", selectedBooking.finalpayStatus] }), _jsxs("div", { children: [_jsx("strong", { children: "Work Address:" }), " ", selectedBooking.addressId.addressname] }), _jsxs("div", { children: [_jsx("strong", { children: "User Remark:" }), " ", selectedBooking.userremark] }), _jsxs("div", { children: [_jsx("strong", { children: "Technician Remark:" }), " ", selectedBooking.techremark] }), _jsxs("div", { children: [_jsx("strong", { children: "Total Amount:" }), " \u20B9", selectedBooking.totalFinalAmount] }), _jsxs("div", { children: [_jsx("strong", { children: "Technician Commission:" }), " \u20B9", selectedBooking.techcommision] }), _jsxs("div", { children: [_jsx("strong", { children: "Refund Accepted:" }), " ", selectedBooking.refundrequestAccept ? "Yes" : "No"] })] })), _jsx("div", { className: "mt-6 flex justify-end", children: _jsx("button", { onClick: () => setisopen(false), className: "px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded", children: "Close" }) })] }) })] })] }) }));
};
export default MyServicesPage;
