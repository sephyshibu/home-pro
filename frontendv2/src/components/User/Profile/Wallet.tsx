import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { walletdetails } from '../../../api/UserApi/Wallet/fetchWallet';
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { Dialog } from '@headlessui/react';
import { fetchbooking } from '../../../api/UserApi/Transactions/Bookings';

interface Wallet {
  id:string,
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

export default function WalletPage() {
    const userId=localStorage.getItem('userId')
    const [walletlist,setwalletdetails]=useState<Wallet[]>([])
    const[balance,setbalance]=useState<number>(0)
     const [isOpen, setIsOpen] = useState(false);
    const [bookingdetails, setbookingdetails] = useState<bookingdetals | null>(null);
    const navigate=useNavigate()

    useEffect(()=>{
        const balance=async()=>{
                 const response=await axiosInstanceuser.get(`/fetchwalletbalance/${userId}`)
                 console.log("asf",response.data.balance)
                 setbalance(response.data.balance)
        }
        balance()
       
        const fetchWallet=async()=>{
            if(!userId){
                navigate('/login')
                return
            }

            try {
                const walletdetail=await walletdetails(userId)
                setwalletdetails(walletdetail)

            } catch (error) {
                console.error("Error fetching wallet:", error);
            }

        }
        fetchWallet()
    },[])

     const handleClick=async(id:string)=>{
      console.log("transactionId",id)
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
    <div className="min-h-screen bg-gray-100">
      
      <main className="flex">
        

        <section className="flex-1 p-8">
          <h2 className="text-xl font-semibold mb-4"> Wallet Balance : ₹{balance}</h2>

          {/* <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Enter Amount" className="border px-4 py-2 rounded-md w-1/3" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Money</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Withdraw</button>
          </div> */}

          <table className="w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2">Transaction</th>
                <th className="text-left px-4 py-2">Transaction Status</th>
                <th className="text-left px-4 py-2">Purpose</th>
                <th className="text-left px-4 py-2">Amount</th>
                <th className="text-left px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {walletlist && walletlist.map((txn, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{txn.type}</td>
                  <td className={`px-4 py-2 ${txn.status === 'success' ? 'text-green-600' : 'text-red-500'}`}>{txn.status}</td>
                  <td className="px-4 py-2">{txn.purpose}</td>
                  <td className="px-4 py-2">₹ {txn.amount}</td>
                  <td className="py-3 px-4">
                    <button className="bg-green-800 text-white px-3 py-1 rounded hover:bg-green-700" onClick={() => {
                        console.log("Clicked transaction ID:", txn.id);
                        handleClick(txn.id);
                        }}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
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
}
