// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
// import { fetchtransactions } from '../../../api/AdminApi/Transactions/fetchtransaction';
// import { Dialog } from '@headlessui/react';
// import { searchtransactions } from '../../../api/AdminApi/SearchTransaction/searchtransaction';
// import { fetchbooking } from '../../../api/AdminApi/Transactions/fetchbooking';
// // import SearchInput from '../SearchBAr';
// // import Pagination from '../Pagination';
// // import ModalDialog from '../ModalDialog';
// // import Table from '../Table';


// interface Transaction {
//     _id:string,
//   type: 'Credit' | 'Debit';
//   status: 'success' | 'failure';
//   amount: number;
//   Name: string;
//   purpose: string;
//   date:string;
//   admincommission:number;
// }
// interface bookingdetals{
//     username:string,
//     techname:string,
//     addressname:string,
//     bookeddate:string,
//     consultationpaymethod:string,
//     userremark:string,
//     techremark:string,
// }
// interface Balance{
//   amount:number
// }

// const TransactionPage: React.FC = () => {
// //   const platformEarnings = 9500;
//     const adminId=localStorage.getItem("adminId")
//     const navigate=useNavigate()
//     const[transaction,settransaction]=useState<Transaction[]>([])
//     const[balance,setbalance]=useState<Balance>()
//     const[currentPage,setcurrentPage]=useState(1)
//     const [searchterm,setsearchterm]=useState('')
//     const [isOpen, setIsOpen] = useState(false);
//     const [bookingdetails, setbookingdetails] = useState<bookingdetals | null>(null);
    
    
//     useEffect(()=>{
//         fetchtrasnsaction()
//     },[currentPage])

//     const fetchtrasnsaction=async()=>{

//             if(!adminId){
//                 navigate('/')
//                 return
//             }

//             try {
//                 const result=await fetchtransactions(currentPage)

//                 settransaction(result.transactions)
                
//                 setbalance({amount:result.totaladmincommision})
                

//             } catch (error) {
//                 console.error('Failed to fetch Transactions', error);
//             }
            
//         }

//     const handleClick=async(id:string)=>{
//         try {
//             const res=await fetchbooking(id)
//             setIsOpen(true)
//             setbookingdetails(res)
//         } catch (err) {
//             console.error("Error fetching booking details", err);
//         }
      

//     }
//     console.log("balamce", balance)
//     const closeModal = () => {
//         setIsOpen(false);
//         setbookingdetails(null);
//       };

//       const handleSearch=async(e:React.ChangeEvent<HTMLInputElement>)=>{
//         setsearchterm(e.target.value)
//       }
//       useEffect(()=>{
//         const delaybounce=setTimeout(async()=>{
//           try {
//             if(searchterm.trim()==''){
//               fetchtrasnsaction()
//             }
//             else{
//               const response=await searchtransactions(searchterm)
//               settransaction(response.data.transaction)
//             }
//           } catch (error) {
//               console.error('Search failed', error);
//           }
//         },500)
//         return()=>clearTimeout(delaybounce)
//       },[searchterm])

//   return (
//     <div className="min-h-screen bg-gray-100 text-sm">
      
//       {/* Content */}
//       <main className="p-6">
//         {/* <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Platform Earnings : ₹{platformEarnings}</h2>
//         </div> */}

//         <div className="overflow-x-auto rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-4">Platform Earnings : ₹{balance?.amount}</h2>
//           <div className="search-options">
//                 <input
//                     type="text"
//                     value={searchterm}
//                     onChange={handleSearch}
//                     placeholder="Enter the last 5 numbers of bookingId"
//                     className="search-input w-64"
//                 />
               
//             </div>
       
//           <table className="min-w-full bg-white rounded-lg">
//             <thead className="bg-green-900 text-white">
//               <tr>
//                 <th className="py-3 px-4 text-left">Transaction</th>
//                 <th className="py-3 px-4 text-left">Transaction Status</th>
//                 <th className="py-3 px-4 text-left">Date</th>
//                 <th className="py-3 px-4 text-left">Amount</th>
//                 <th className="py-3 px-4 text-left">Name</th>
//                 <th className="py-3 px-4 text-left">Purpose</th>
//                 <th className="py-3 px-4 text-left">Admin commission</th>
//                 <th className="py-3 px-4 text-left">View Booking</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transaction.map((tx) => (
//                 <tr key={tx._id} className="border-b hover:bg-gray-50">
//                   <td className="py-3 px-4">{tx.type}</td>
//                   <td className={`py-3 px-4 ${tx.status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
//                     {tx.status}
//                   </td>
//                   <td className="py-3 px-4">{tx.date}</td>
//                   <td className="py-3 px-4 text-green-700 font-semibold">{tx.amount}</td>
//                   <td className="py-3 px-4">{tx.Name}</td>
//                   <td className="py-3 px-4">{tx.purpose}</td>
//                   <td className="py-3 px-4">{tx.admincommission}</td>
//                   <td className="py-3 px-4">
//                     <button className="bg-green-800 text-white px-3 py-1 rounded hover:bg-green-700" onClick={() => {
//                         console.log("Clicked transaction ID:", tx._id);
//                         handleClick(tx._id);
//                         }}>
//                       View Booking
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           <div className="mt-4 flex justify-center space-x-4">
//           <button 
//             onClick={() => setcurrentPage((prev) => Math.max(prev - 1, 1))} 
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span className="self-center">Page {currentPage}</span>
//           <button 
//             onClick={() => setcurrentPage((prev) => prev + 1)} 
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Next
//           </button>
//         </div>

//         </div>
//       </main>
//       <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
//             <Dialog.Title className="text-lg font-bold mb-4 border-b pb-2">Transaction Details</Dialog.Title>
//             {bookingdetails && (
//               <div className="space-y-2 text-gray-700">
//                 <p><strong>Username:</strong> {bookingdetails.username}</p>
//                 <p><strong>TechName:</strong> {bookingdetails.techname}</p>
//                 <p><strong>Address:</strong> {bookingdetails.addressname}</p>
//                 <p><strong>User Canecel Reason:</strong> {bookingdetails.userremark?bookingdetails.userremark:""}</p>
//                 <p><strong>Tech cancel Reason:</strong> {bookingdetails.techremark?bookingdetails.techremark:""}</p>
//                 <p><strong>Booked date:</strong> {bookingdetails.bookeddate}</p>
//                 <p><strong>Consultation Payment method:</strong> {bookingdetails.consultationpaymethod}</p>
//               </div>
//             )}
//             <div className="mt-4 text-right">
//               <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={closeModal}>
//                 Close
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>

      
//     </div>
//   );
// };

// export default TransactionPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchtransactions } from '../../../api/AdminApi/Transactions/fetchtransaction';
import { Dialog } from '@headlessui/react';
import { searchtransactions } from '../../../api/AdminApi/SearchTransaction/searchtransaction';
import { fetchbooking } from '../../../api/AdminApi/Transactions/fetchbooking';
import SearchInput from '../SearchBAr';
import Pagination from '../Pagination';
import ModalDialog from '../ModalDialog';
import Table from '../Table';


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
    const[currentPage,setcurrentPage]=useState(1)
    const [searchterm,setsearchterm]=useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [bookingdetails, setbookingdetails] = useState<bookingdetals | null>(null);
    
    
    useEffect(()=>{
        fetchtrasnsaction()
    },[currentPage])

    const fetchtrasnsaction=async()=>{

            if(!adminId){
                navigate('/')
                return
            }

            try {
                const result=await fetchtransactions(currentPage)

                settransaction(result.transactions)
                
                setbalance({amount:result.totaladmincommision})
                

            } catch (error) {
                console.error('Failed to fetch Transactions', error);
            }
            
        }

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

      const handleSearch=async(e:React.ChangeEvent<HTMLInputElement>)=>{
        setsearchterm(e.target.value)
      }
      useEffect(()=>{
        const delaybounce=setTimeout(async()=>{
          try {
            if(searchterm.trim()==''){
              fetchtrasnsaction()
            }
            else{
              const response=await searchtransactions(searchterm)
              settransaction(response.data.transaction)
            }
          } catch (error) {
              console.error('Search failed', error);
          }
        },500)
        return()=>clearTimeout(delaybounce)
      },[searchterm])

  return (
  <div className="min-h-screen bg-gray-100 text-sm">
    <main className="p-6">
      {/* <h2 className="text-xl font-semibold mb-4">Platform Earnings : ₹{balance?.amount}</h2> */}
      <SearchInput
        value={searchterm}
        onChange={handleSearch}
        placeholder="Enter the last 5 numbers of bookingId"
       className="border border-emerald-700 rounded-xl p-2 w-80 shadow-2xl ml-280 block mb-2 text-sm font-medium text-gray-900 dark:text-black"
      />

      <Table
        columns={[
          { label: "Transaction", key: "type" },
          { label: "Transaction Status", key: "status" },
          { label: "Date", key: "date" },
          { label: "Amount", key: "amount" },
          { label: "Name", key: "Name" },
          { label: "Purpose", key: "purpose" },
          { label: "Admin commission", key: "admincommission" },
          { label: "View Booking", key: "view" },
        ]}
        data={transaction}
        renderRow={(tx) => (
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
              <button
                className="bg-green-800 text-white px-3 py-1 rounded hover:bg-green-700"
                onClick={() => handleClick(tx._id)}
              >
                View Booking
              </button>
            </td>
          </tr>
        )}
      />

      <Pagination currentPage={currentPage} onPageChange={setcurrentPage} disablePrev={currentPage === 1} />

      <ModalDialog isOpen={isOpen} onClose={closeModal} title="Transaction Details">
        {bookingdetails && (
          <div className="space-y-2 text-gray-700">
            <p><strong>Username:</strong> {bookingdetails.username}</p>
            <p><strong>TechName:</strong> {bookingdetails.techname}</p>
            <p><strong>Address:</strong> {bookingdetails.addressname}</p>
            <p><strong>User Cancel Reason:</strong> {bookingdetails.userremark || ""}</p>
            <p><strong>Tech cancel Reason:</strong> {bookingdetails.techremark || ""}</p>
            <p><strong>Booked date:</strong> {bookingdetails.bookeddate}</p>
            <p><strong>Consultation Payment method:</strong> {bookingdetails.consultationpaymethod}</p>
          </div>
        )}
      </ModalDialog>
    </main>
  </div>
);
};

export default TransactionPage;
