import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchtransactiondetails } from '../../../api/TechApi/Fetchtransaction/fetchtransaction';
export default function WalletPage() {
    const techId = localStorage.getItem('techId');
    const [transaction, settransaction] = useState([]);
    const [balance, setbalance] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        // const balance=async()=>{
        //          const response=await axiosInstancetech.get(`/fetchtransaction/${techId}`)
        //          console.log("asf",response.data)
        //          setbalance(response.data.balance)
        // }
        // balance()
        const fetchWallet = async () => {
            if (!techId) {
                navigate('/tech');
                return;
            }
            try {
                const walletdetail = await fetchtransactiondetails(techId);
                settransaction(walletdetail);
                const total = walletdetail.filter((tx) => tx.type === 'DEBIT')
                    .reduce((sum, tx) => sum + (tx.techniciancommision || 0), 0);
                setbalance({ amount: total });
            }
            catch (error) {
                console.error("Error fetching wallet:", error);
            }
        };
        fetchWallet();
    }, []);
    return (_jsx("div", { className: "min-h-screen bg-gray-100", children: _jsx("main", { className: "flex", children: _jsxs("section", { className: "flex-1 p-8", children: [_jsxs("h2", { className: "text-xl font-semibold mb-4", children: ["Wallet Balance : \u20B9", balance?.amount] }), _jsxs("table", { className: "w-full bg-white shadow rounded-lg overflow-hidden", children: [_jsx("thead", { className: "bg-gray-200 text-gray-700", children: _jsxs("tr", { children: [_jsx("th", { className: "text-left px-4 py-2", children: "Booking ID" }), _jsx("th", { className: "text-left px-4 py-2", children: "Status" }), _jsx("th", { className: "text-left px-4 py-2", children: "Total Amount of work " }), _jsx("th", { className: "text-left px-4 py-2", children: "Tech Amount" })] }) }), _jsx("tbody", { children: transaction && transaction.map((tx, index) => (_jsxs("tr", { className: index % 2 === 0 ? 'bg-gray-50' : 'bg-white', children: [_jsx("td", { className: "px-4 py-2", children: tx.referenceId }), _jsx("td", { className: `px-4 py-2 font-medium ${tx.status === 'Successful' ? 'text-green-600' : 'text-red-500'}`, children: tx.status }), _jsxs("td", { className: "px-4 py-2", children: ["\u20B9 ", tx.amount] }), _jsxs("td", { className: "px-4 py-2", children: ["\u20B9 ", tx.techniciancommision] })] }, index))) })] })] }) }) }));
}
