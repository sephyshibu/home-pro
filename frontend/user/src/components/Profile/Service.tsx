import React, { useEffect, useState } from "react";
import { BookingDetails } from "../../api/Service/fetchbooking";
import { useNavigate } from "react-router";
import { Dialog, DialogPanel,DialogTitle} from "@headlessui/react";
import axiosInstanceuser from "../../axios";

import { updatecancelreason } from "../../api/cancelrequest/Cancelreason";
import toast from "react-hot-toast";
interface servicepage {
  _id:string,
  techIds:string,
  techimage:string;
  technicianname: string;
  Category: string;
  techStatus: "Accepted" | "Rejected" |"Pending";
  workStatus: "InProgress" | "Pending" | "Paused" | "Completed";
  date: string;
  locationUrl:string,
  rateperhour:number,
  techphone:string,
  consultationFee:string,
  consultationpayStatus:string,
  finalpaymentStatus:string,
  sessionrequest:[{types:string, status:string}],
  worktime:[{}],
  workaddress:string,
  totalhours:number,
  pincode:string,
  userremark:string,
  techremark:string,
  refundrequestAccept:boolean

}



const getWorkStatusColor = (status: string) => {
  switch (status) {
    case "InProgress": return "text-yellow-600";
    case "Pending": return "text-orange-600";
    case "Paused": return "text-blue-600";
    case "Completed": return "text-green-600";
    default: return "";
  }
};

const getTechStatusColor = (status: string) => {
  return status === "Accepted" ? "text-green-600" : "text-red-600";
};

const MyServicesPage: React.FC = () => {
    const userId=localStorage.getItem("userId")
    const[booking,setbooking]=useState<servicepage[]|null>([])
    const[bookingid,setbookingid]=useState<string|null>(null)
    const[isopen,setisopen]=useState(false)
    const[form,setform]=useState({
      userremark:""
    })


   
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setform((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchbookvaLUES=async()=>{
            if(!userId){
                navigate('/login')
                return
            }
            try {
                const bookingdetails=await BookingDetails(userId)
                console.log(bookingdetails)
                setbooking(bookingdetails)
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        }
        fetchbookvaLUES()
    },[])
    
    const handleView=async(bookingdetails:servicepage)=>{
      navigate('/viewbookingddetails',{state:bookingdetails})
    }

    const handleAdduserremark = async (bookingId: string) => {
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
    
        setbooking((prev) =>
          prev
            ? prev.map((item) =>
                item._id === bookingId ? { ...item, userremark: trimmedRemark } : item
              )
            : []
        );
    
        setform({ userremark: "" });
      } catch (err) {
        console.error("Error updating cancel reason", err);
      }
    };
    

    const retryPayment = async (bookingId: string, amount: string) => {
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
          handler: async (response: any) => {
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
      } catch (error) {
        toast.error("Error initiating retry payment");
        console.error(error);
      }
    };
    

    const cancel=(id:string)=>{
      setbookingid(id)
      setisopen(true)
    }


  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex flex-grow bg-gray-50">
        
        {/* Main Table */}
        <main className="flex-grow p-6">
          <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#0B1C42] text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Technician</th>
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Tech Status</th>
                  <th className="py-3 px-4 text-left">Work Status</th>
                  <th className="py-3 px-4 text-left">Scheduled Date</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {booking && booking.map((bookingItem, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <img
                        src={bookingItem.techimage}// Replace with your avatar image path
                        alt="Technician"
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{bookingItem.technicianname}</span>
                    </td>
                    <td className="px-4 py-3">{bookingItem.Category}</td>
                    <td className={`px-4 py-3 font-medium ${getTechStatusColor(bookingItem.techStatus)}`}>
                      {bookingItem.techStatus}
                    </td>
                  
                    <td className="px-4 py-3">
                    {(bookingItem.userremark=='') && (
                      <span className={`block font-medium ${getWorkStatusColor(bookingItem.workStatus)}`}>
                        {bookingItem.workStatus}
                      </span>
                    )}
                    {bookingItem.refundrequestAccept?(<span className="inline-block mt-1 text-xs text-yellow-600 bg-red-100 px-2 py-0.5 rounded-full">Refunded</span>):
                    (bookingItem.userremark&& (
                      <span className="inline-block mt-1 text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                        {bookingItem.userremark}
                      </span>
                    ))}
                  </td>
                    <td className="px-4 py-3">{bookingItem.date}</td>
                    <td className="px-4 py-3 text-center">
                      {bookingItem.consultationpayStatus==="completed" && <button className="bg-[#00BFFF] hover:bg-[#009FCC] text-white px-4 py-1 rounded-md" onClick={()=>handleView(bookingItem)}>
                        View
                        
                      </button>}
                    </td>
                    <td>
                    {bookingItem.consultationpayStatus === "failed" && (
                    <button
                      onClick={() => retryPayment(bookingItem._id, bookingItem.consultationFee)}
                      className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Retry Payment
                    </button>
                  )}
                  </td>
                  <td>
                  {(bookingItem.techStatus.toLowerCase()=="pending" && bookingItem.userremark=='' && bookingItem.consultationpayStatus==='completed') && (
                    <button 
                        onClick={()=>cancel(bookingItem._id)}
                        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Cancel
                    </button>

                  )}

                  </td>
                 
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

         <Dialog open={isopen} onClose={() => setisopen(false)} className="relative z-[999]">
                <div className="fixed inset-0 bg-black/30 z-[999]" aria-hidden="true" />
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto">
                    <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl  z-[1001]">
                    <DialogTitle className="text-lg font-bold mb-4">Add Cancel reason</DialogTitle>
                    <div className="space-y-3">
                        <input name="userremark" value={form.userremark} onChange={handleChange} placeholder="Cancel reason" className="w-full border px-3 py-2 rounded" />
                        <button onClick={()=> bookingid && handleAdduserremark(bookingid)} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                                  Submit Cancel Reason
                        </button>
                    </div>
                    </DialogPanel>
                </div>
              </Dialog>
                        
      </div>

      
    </div>
  );
};

export default MyServicesPage;
