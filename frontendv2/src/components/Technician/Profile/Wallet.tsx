import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchtransactiondetails } from '../../../api/TechApi/Fetchtransaction/fetchtransaction';
import axiosInstancetech from "../../../Axios/TechAxios/axios";

interface Transaction{
    _id:string,
    ownerid:string,
    type:string,
    amount:number,
    referenceId:string,
    purpose:string,
    status:string,
    username?:string,
    techniciancommision:number
}

interface Walletbalance{
    amount:number
}

export default function WalletPage() {
    const techId=localStorage.getItem('techId')
    const [transaction,settransaction]=useState<Transaction[]|null>([])
    const[balance,setbalance]=useState<Walletbalance>()
    const navigate=useNavigate()
    useEffect(()=>{
        // const balance=async()=>{
        //          const response=await axiosInstancetech.get(`/fetchtransaction/${techId}`)
        //          console.log("asf",response.data)
        //          setbalance(response.data.balance)
        // }
        // balance()
       
        const fetchWallet=async()=>{
            if(!techId){
                navigate('/tech')
                return
            }

            try {
                const walletdetail=await fetchtransactiondetails(techId)
                settransaction(walletdetail)

                const total=walletdetail.filter((tx:Transaction)=>tx.type==='DEBIT')
                                        .reduce((sum:number,tx:Transaction)=>sum+(tx.techniciancommision||0),0)

                setbalance({amount:total})

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
          <h2 className="text-xl font-semibold mb-4">Wallet Balance : ₹{balance?.amount}</h2>

          {/* <div className="flex gap-2 mb-4">
            <input type="text" placeholder="Enter Amount" className="border px-4 py-2 rounded-md w-1/3" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Money</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Withdraw</button>
          </div> */}

         
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
            <tr>
                <th className="text-left px-4 py-2">Booking ID</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Total Amount of work </th>
                <th className="text-left px-4 py-2">Tech Amount</th>
            </tr>
            </thead>
            <tbody>
            {transaction && transaction.map((tx, index) => (
                <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                <td className="px-4 py-2">{tx.referenceId}</td>
        
                <td
                    className={`px-4 py-2 font-medium ${
                    tx.status === 'Successful' ? 'text-green-600' : 'text-red-500'
                    }`}
                >
                    {tx.status}
                </td>
                <td className="px-4 py-2">₹ {tx.amount}</td>
                <td className="px-4 py-2">₹ {tx.techniciancommision}</td>
                </tr>
                
            ))}
            </tbody>
        </table>
        </section>
      </main>

     
    </div>
  );
}
