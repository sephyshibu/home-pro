import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { walletdetails } from '../../api/Wallet/fetchWallet';

interface Wallet{
    _id:string,
    type:string,
    amount:number,
    referenceid:string,
    purpose:string,
    status:string,
}

export default function WalletPage() {
    const userId=localStorage.getItem('userId')
    const [walletlist,setwalletdetails]=useState<Wallet[]|null>([])
    const navigate=useNavigate()
    useEffect(()=>{
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


  return (
    <div className="min-h-screen bg-gray-100">
      
      <main className="flex">
        

        <section className="flex-1 p-8">
          <h2 className="text-xl font-semibold mb-4">Wallet Balance : ₹ 2,200</h2>

          <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Enter Amount" className="border px-4 py-2 rounded-md w-1/3" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Money</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Withdraw</button>
          </div>

          <table className="w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2">Transaction</th>
                <th className="text-left px-4 py-2">Transaction Status</th>
                <th className="text-left px-4 py-2">Purpose</th>
                <th className="text-left px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {walletlist && walletlist.map((txn, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{txn.type}</td>
                  <td className={`px-4 py-2 ${txn.status === 'Successful' ? 'text-green-600' : 'text-red-500'}`}>{txn.status}</td>
                  <td className="px-4 py-2">{txn.purpose}</td>
                  <td className="px-4 py-2">₹ {txn.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

     
    </div>
  );
}
