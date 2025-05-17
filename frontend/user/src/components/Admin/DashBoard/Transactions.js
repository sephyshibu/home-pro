import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchtransactions } from '../../../api/AdminApi/Transactions/fetchtransaction';
import { Dialog } from '@headlessui/react';
import { fetchbooking } from '../../../api/AdminApi/Transactions/fetchbooking';
const TransactionPage = () => {
    //   const platformEarnings = 9500;
    const adminId = localStorage.getItem("adminId");
    const navigate = useNavigate();
    const [transaction, settransaction] = useState([]);
    const [balance, setbalance] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [bookingdetails, setbookingdetails] = useState(null);
    useEffect(() => {
        const fetchtrasnsaction = async () => {
            if (!adminId) {
                navigate('/');
                return;
            }
            try {
                const transactionsdetail = await fetchtransactions();
                console.log("transactions", transactionsdetail);
                settransaction(transactionsdetail);
                const total = transactionsdetail.reduce((sum, tx) => sum + (tx.admincommission || 0), 0);
                setbalance({ amount: total });
            }
            catch (error) {
                console.error('Failed to fetch Transactions', error);
            }
        };
        fetchtrasnsaction();
    }, []);
    const handleClick = async (id) => {
        try {
            const res = await fetchbooking(id);
            setIsOpen(true);
            setbookingdetails(res);
        }
        catch (err) {
            console.error("Error fetching booking details", err);
        }
    };
    console.log("balamce", balance);
    const closeModal = () => {
        setIsOpen(false);
        setbookingdetails(null);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-100 text-sm", children: [_jsx("main", { className: "p-6", children: _jsxs("div", { className: "overflow-x-auto rounded-lg shadow", children: [_jsxs("h2", { className: "text-xl font-semibold mb-4", children: ["Platform Earnings : \u20B9", balance?.amount] }), _jsxs("table", { className: "min-w-full bg-white rounded-lg", children: [_jsx("thead", { className: "bg-green-900 text-white", children: _jsxs("tr", { children: [_jsx("th", { className: "py-3 px-4 text-left", children: "Transaction" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Transaction Status" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Date" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Amount" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Name" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Purpose" }), _jsx("th", { className: "py-3 px-4 text-left", children: "Admin commission" }), _jsx("th", { className: "py-3 px-4 text-left", children: "View Booking" })] }) }), _jsx("tbody", { children: transaction.map((tx) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: tx.type }), _jsx("td", { className: `py-3 px-4 ${tx.status === 'success' ? 'text-green-600' : 'text-red-500'}`, children: tx.status }), _jsx("td", { className: "py-3 px-4", children: tx.date }), _jsx("td", { className: "py-3 px-4 text-green-700 font-semibold", children: tx.amount }), _jsx("td", { className: "py-3 px-4", children: tx.Name }), _jsx("td", { className: "py-3 px-4", children: tx.purpose }), _jsx("td", { className: "py-3 px-4", children: tx.admincommission }), _jsx("td", { className: "py-3 px-4", children: _jsx("button", { className: "bg-green-800 text-white px-3 py-1 rounded hover:bg-green-700", onClick: () => {
                                                        console.log("Clicked transaction ID:", tx._id);
                                                        handleClick(tx._id);
                                                    }, children: "View Booking" }) })] }, tx._id))) })] })] }) }), _jsx(Dialog, { open: isOpen, onClose: closeModal, className: "fixed z-50 inset-0 overflow-y-auto", children: _jsx("div", { className: "flex items-center justify-center min-h-screen px-4", children: _jsxs(Dialog.Panel, { className: "bg-white rounded-xl p-6 w-full max-w-md shadow-xl", children: [_jsx(Dialog.Title, { className: "text-lg font-bold mb-4 border-b pb-2", children: "Transaction Details" }), bookingdetails && (_jsxs("div", { className: "space-y-2 text-gray-700", children: [_jsxs("p", { children: [_jsx("strong", { children: "Username:" }), " ", bookingdetails.username] }), _jsxs("p", { children: [_jsx("strong", { children: "TechName:" }), " ", bookingdetails.techname] }), _jsxs("p", { children: [_jsx("strong", { children: "Address:" }), " ", bookingdetails.addressname] }), _jsxs("p", { children: [_jsx("strong", { children: "User Canecel Reason:" }), " ", bookingdetails.userremark ? bookingdetails.userremark : ""] }), _jsxs("p", { children: [_jsx("strong", { children: "Tech cancel Reason:" }), " ", bookingdetails.techremark ? bookingdetails.techremark : ""] }), _jsxs("p", { children: [_jsx("strong", { children: "Booked date:" }), " ", bookingdetails.bookeddate] }), _jsxs("p", { children: [_jsx("strong", { children: "Consultation Payment method:" }), " ", bookingdetails.consultationpaymethod] })] })), _jsx("div", { className: "mt-4 text-right", children: _jsx("button", { className: "bg-blue-600 text-white px-4 py-2 rounded", onClick: closeModal, children: "Close" }) })] }) }) })] }));
};
export default TransactionPage;
