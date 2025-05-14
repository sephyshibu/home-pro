import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchtransactions } from '../../api/Transactions/fetchtransaction';
import { Dialog } from '@headlessui/react';
import { fetchbooking } from '../../api/Transactions/fetchbooking';
interface Transaction {
    _id:string,
  type: 'Credit' | 'Debit';
  status: 'success' | 'failure';
  amount: number;
  Name: string;
  purpose: string;
  date:string;
  admincommission:number;
}
interface bookingdetals{
    username:string,
    techname:string,
    addressname:string,
    bookeddate:string,
    consultationpaymethod:string,
    userremark:string,
    techremark:string,
}
interface Balance{
  amount:number
}

const TransactionPage: React.FC = () => {
//   const platformEarnings = 9500;
    const adminId=localStorage.getItem("adminId")
    const navigate=useNavigate()
    const[transaction,settransaction]=useState<Transaction[]>([])
    const[balance,setbalance]=useState<Balance>()
    const [isOpen, setIsOpen] = useState(false);
    const [bookingdetails, setbookingdetails] = useState<bookingdetals | null>(null);
    useEffect(()=>{
        const fetchtrasnsaction=async()=>{

            if(!adminId){
                navigate('/')
                return
            }

            try {
                const transactionsdetail=await fetchtransactions()
                console.log("transactions", transactionsdetail)
                settransaction(transactionsdetail)
                const total=transactionsdetail.reduce((sum:number,tx:Transaction)=>sum+(tx.admincommission||0),0)
                setbalance({amount:total})
                

            } catch (error) {
                console.error('Failed to fetch Transactions', error);
            }
            
        }
        fetchtrasnsaction()
    },[])

    const handleClick=async(id:string)=>{
        try {
            const res=await fetchbooking(id)
            setIsOpen(true)
            setbookingdetails(res)
        } catch (err) {
            console.error("Error fetching booking details", err);
        }
      

    }
    console.log("balamce", balance)
    const closeModal = () => {
        setIsOpen(false);
        setbookingdetails(null);
      };

  return (
    <div className="min-h-screen bg-gray-100 text-sm">
      
      {/* Content */}
      <main className="p-6">
        {/* <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Platform Earnings : ₹{platformEarnings}</h2>
        </div> */}

        <div className="overflow-x-auto rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Platform Earnings : ₹{balance?.amount}</h2>

          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-green-900 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Transaction</th>
                <th className="py-3 px-4 text-left">Transaction Status</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Purpose</th>
                <th className="py-3 px-4 text-left">Admin commission</th>
                <th className="py-3 px-4 text-left">View Booking</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((tx) => (
                <tr key={tx._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{tx.type}</td>
                  <td className={`py-3 px-4 ${tx.status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.status}
                  </td>
                  <td className="py-3 px-4">{tx.date}</td>
                  <td className="py-3 px-4 text-green-700 font-semibold">{tx.amount}</td>
                  <td className="py-3 px-4">{tx.Name}</td>
                  <td className="py-3 px-4">{tx.purpose}</td>
                  <td className="py-3 px-4">{tx.admincommission}</td>
                  <td className="py-3 px-4">
                    <button className="bg-green-800 text-white px-3 py-1 rounded hover:bg-green-700" onClick={() => {
                        console.log("Clicked transaction ID:", tx._id);
                        handleClick(tx._id);
                        }}>
                      View Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4 border-b pb-2">Transaction Details</Dialog.Title>
            {bookingdetails && (
              <div className="space-y-2 text-gray-700">
                <p><strong>Username:</strong> {bookingdetails.username}</p>
                <p><strong>TechName:</strong> {bookingdetails.techname}</p>
                <p><strong>Address:</strong> {bookingdetails.addressname}</p>
                <p><strong>User Canecel Reason:</strong> {bookingdetails.userremark?bookingdetails.userremark:""}</p>
                <p><strong>Tech cancel Reason:</strong> {bookingdetails.techremark?bookingdetails.techremark:""}</p>
                <p><strong>Booked date:</strong> {bookingdetails.bookeddate}</p>
                <p><strong>Consultation Payment method:</strong> {bookingdetails.consultationpaymethod}</p>
              </div>
            )}
            <div className="mt-4 text-right">
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={closeModal}>
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      
    </div>
  );
};

export default TransactionPage;
