import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { walletdetails } from '../../../api/UserApi/Wallet/fetchWallet';
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { Dialog } from '@headlessui/react';
import { fetchbooking } from '../../../api/UserApi/Transactions/Bookings';
export default function WalletPage() {
    const userId = localStorage.getItem('userId');
    const [walletlist, setwalletdetails] = useState([]);
    const [balance, setbalance] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [bookingdetails, setbookingdetails] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const balance = async () => {
            const response = await axiosInstanceuser.get(`/fetchwalletbalance/${userId}`);
            console.log("asf", response.data.balance);
            setbalance(response.data.balance);
        };
        balance();
        const fetchWallet = async () => {
            if (!userId) {
                navigate('/login');
                return;
            }
            try {
                const walletdetail = await walletdetails(userId);
                setwalletdetails(walletdetail);
            }
            catch (error) {
                console.error("Error fetching wallet:", error);
            }
        };
        fetchWallet();
    }, []);
    const handleClick = async (id) => {
        console.log("transactionId", id);
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
    return (_jsxs("div", { className: "min-h-screen bg-gray-100", children: [_jsx("main", { className: "flex", children: _jsx("section", { className: "flex-1 p-8", children: _jsxs("table", { className: "w-full bg-white shadow rounded-lg overflow-hidden", children: [_jsx("thead", { className: "bg-gray-200 text-gray-700", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left px-4 py-2", children: "Transaction" }), _jsx("th", { className: "text-left px-4 py-2", children: "Transaction Status" }), _jsx("th", { className: "text-left px-4 py-2", children: "Purpose" }), _jsx("th", { className: "text-left px-4 py-2", children: "Amount" })] }) }), _jsx("tbody", { children: walletlist && walletlist.map((txn, index) => (_jsxs("tr", { className: "border-t", children: [_jsx("td", { className: "px-4 py-2", children: txn.type }), _jsx("td", { className: `px-4 py-2 ${txn.status === 'success' ? 'text-green-600' : 'text-red-500'}`, children: txn.status }), _jsx("td", { className: "px-4 py-2", children: txn.purpose }), _jsxs("td", { className: "px-4 py-2", children: ["\u20B9 ", txn.amount] }), _jsx("td", { className: "py-3 px-4", children: _jsx("button", { className: "bg-green-800 text-white px-3 py-1 rounded hover:bg-green-700", onClick: () => {
                                                    console.log("Clicked transaction ID:", txn.id);
                                                    handleClick(txn.id);
                                                }, children: "View Details" }) })] }, index))) })] }) }) }), _jsx(Dialog, { open: isOpen, onClose: closeModal, className: "fixed z-50 inset-0 overflow-y-auto", children: _jsx("div", { className: "flex items-center justify-center min-h-screen px-4", children: _jsxs(Dialog.Panel, { className: "bg-white rounded-xl p-6 w-full max-w-md shadow-xl", children: [_jsx(Dialog.Title, { className: "text-lg font-bold mb-4 border-b pb-2", children: "Transaction Details" }), bookingdetails && (_jsxs("div", { className: "space-y-2 text-gray-700", children: [_jsxs("p", { children: [_jsx("strong", { children: "Username:" }), " ", bookingdetails.username] }), _jsxs("p", { children: [_jsx("strong", { children: "TechName:" }), " ", bookingdetails.techname] }), _jsxs("p", { children: [_jsx("strong", { children: "Address:" }), " ", bookingdetails.addressname] }), _jsxs("p", { children: [_jsx("strong", { children: "User Canecel Reason:" }), " ", bookingdetails.userremark ? bookingdetails.userremark : ""] }), _jsxs("p", { children: [_jsx("strong", { children: "Tech cancel Reason:" }), " ", bookingdetails.techremark ? bookingdetails.techremark : ""] }), _jsxs("p", { children: [_jsx("strong", { children: "Booked date:" }), " ", bookingdetails.bookeddate] }), _jsxs("p", { children: [_jsx("strong", { children: "Consultation Payment method:" }), " ", bookingdetails.consultationpaymethod] })] })), _jsx("div", { className: "mt-4 text-right", children: _jsx("button", { className: "bg-blue-600 text-white px-4 py-2 rounded", onClick: closeModal, children: "Close" }) })] }) }) })] }));
}
