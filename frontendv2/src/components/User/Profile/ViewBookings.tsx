import React, { useEffect, useState,useRef } from "react";
import { useLocation } from "react-router";
import { fetchTechById } from "../../../api/UserApi/fetchtechbyid";
import { BookingDetails } from "../../../api/UserApi/Service/fetchbooking";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import ChatBox from '../ChatBox';
import { finalamount } from "../../../api/UserApi/FinalAmount/finalamount";
import {persistor} from '../../../app/store'
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { Dialog,DialogPanel,DialogTitle } from "@headlessui/react";
import { acceptsessionrequest } from "../../../api/UserApi/AcceptSession/acceptsession";
import { rejectsessionrequest } from "../../../api/UserApi/RequestSession/requestsession";
import { fetchSessionRequests } from "../../../api/UserApi/Fetchsession/fetchsession";

import { toast } from "react-toastify";
interface viewBookings{
  _id:string;
  techIds:string;
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
  consultationpaymentStatus:string,
  finalpaymentStatus:string,
  sessionrequest:[{types:string,status:string}];
  worktime:[{start:number,end:number}],
  workaddress:string,
  totalhours:number,
  category:string,
  pincode:string
}
interface SessionRequest {
  _id: string;
  types: string;
  status: 'pending' | 'accepted' | 'rejected';
}
interface WorkTime{
  _id:string,
  start:number,
  end:number
}


const ViewBookingsProfile:React.FC=()=> {
  const location=useLocation()
  const bookingdetails=location.state as viewBookings
  const navigate=useNavigate()
  const userId=localStorage.getItem("userId")
  const[isopen,setisopen]=useState(false)

  const [sessionRequests, setSessionRequests] = useState<SessionRequest[]>([]);
  const[amount,setamount]=useState<string|null>(null)
  const[totalminutes,settotalminutes]=useState<string|null>(null)
  const[rateperminute,setrateperminute]=useState<string|null>(null)
  
  const [error, setError] = useState<string>("");
  const[technician,settechnician]=useState<viewBookings>(bookingdetails)
  const techId = technician._id;

   
      

  useEffect(() => {
    // Fetch session requests for this booking
    const fetchRequests = async () => {
      try {
        const response = await fetchSessionRequests(bookingdetails._id);
        
        setSessionRequests(response);
      } catch (err) {
        setError("Failed to fetch session requests.");
      }
    };

    fetchRequests();
  }, [bookingdetails._id]);


  
  const handleAccept = async (requestId: string) => {
    try {
      await acceptsessionrequest(bookingdetails._id, requestId, 'accepted');
      setSessionRequests((prev) =>
        prev.map((request) =>
          request._id === requestId ? { ...request, status: 'accepted' } : request
        )
      );
     
    } catch (err) {
      setError("Failed to accept session request.");
    }
  };


  
  console.log("statttt",technician.techStatus)
  const handlePayment=async(bookingId:string)=>{
    try {
  
      const result=await finalamount(bookingId)
      setamount(result.totalamount)
      settotalminutes(result.totalminutes)
      setrateperminute(result.rateperminute)
      setisopen(true)
      
    } catch (error) {
      console.error("Failed to fetch total amount", error);
    }
    

  }
  const handleRazorpay=async(bookingId:string,amount:string)=>{
    if(!userId){
      toast.error("user not logged in")
      return
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
          await axiosInstanceuser.post("/finalconfirmpayemnts", {
            razorpay_payment_id: response.razorpay_payment_id,
            bookingId, 
            // reusing the same booking
            
          });
          toast.success("Final Payment successfully!");
          navigate(`/thankyouservice/${technician.techIds}`)
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
      toast.error("Error initiating final payment");
      console.error(error);
    }
  }
  

  const handleLoginLogout=async()=>{
                if(userId){
                    localStorage.removeItem('userId')
                    await persistor.purge()
                    navigate('/')
                }else{
                    navigate('/login')
                }
            }
    const shouldShowPaymentButton = technician.sessionrequest.some(
              (req) => req.types === "end" && req.status === "accepted"
            ) && technician.finalpaymentStatus!== "completed";



  console.log("pad",shouldShowPaymentButton)

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <NavLink to="/" className="text-lg font-semibold text-sky-600 hover:underline">🏠 Home</NavLink>
          <button
            onClick={handleLoginLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Logout
          </button>
        </div>
      

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Details */}
        <div className="col-span-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Technician Profile</h2>
          <div className="bg-white p-6 rounded flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Left side - details */}
            <div className="flex-1 space-y-3 text-base">
              <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
              <p><strong>Name:</strong> {technician.technicianname}</p>
              <p><strong>PhoneNumber:</strong> {technician.techphone}</p>
              <p><strong>Address:</strong> {technician.workaddress}</p>
              <p><strong>Map url:</strong> {technician.locationUrl}</p>
              <p><strong>Service Category:</strong> {technician.Category}</p>
              <p><strong>Consultation Fee:</strong> ₹{technician.consultationFee}</p>
              <p><strong>Rate per Hour:</strong> ₹ {technician.rateperhour} / hr</p>
              <p><strong>Service Districts:</strong> {technician.pincode}</p>
            {shouldShowPaymentButton && <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={()=>handlePayment(technician._id)}>Payment</button>}
            </div>

            {/* Right side - profile image */}
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border-2 border-gray-300">
              <img
                src={technician.techimage}
                alt="Technician Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          </div>
          </div>

        <div className="max-w-6xl mx-auto py-10 px-4">
          <h2 className="text-xl font-bold mb-4">Pending Session Requests</h2>
          
          {!sessionRequests || sessionRequests.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">No session requests available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {sessionRequests.map((request) => (
                <div key={request._id} className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
                  <h3 className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">Request: {request.types}</h3>
                   <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Status:</span> {request.status}
                  </p>
                  {request.status === 'pending' && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleAccept(request._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                      >
                        Accept
                      </button>
                    
                    </div>
                  )}
                </div>
              ))}
          </div>
          
        )}
        {technician.techStatus?.trim().toLowerCase() === "accepted" &&  technician.workStatus.trim().toLowerCase()!= 'completed'  && (
        <div className="col-span-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Chat with Technician</h2>
       
          <ChatBox
            bookingId={technician._id}
            userId={userId!}
            techId={technician.techIds} // or actual technician userId
            
          />
        </div>
      )}



        </div>
        <Dialog open={isopen} onClose={() => setisopen(false)} className="relative z-[999]">
          <div className="fixed inset-0 bg-black/30 z-[999]" aria-hidden="true" />
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto">
            <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl z-[1001]">
              <DialogTitle className="text-lg font-bold mb-4">Confirm Payment</DialogTitle>
              {amount !== null ? (
                <>
                  <p><strong>Total Minutes:</strong> {totalminutes}</p>
                  <p><strong>Rate per Minute:</strong> {rateperminute}</p>
                  <p><strong>Total Amount:</strong> ₹{amount}</p>
                  <button
                    onClick={() => handleRazorpay(bookingdetails._id, amount)}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Pay Now
                  </button>
                </>
              ) : (
                <p>Loading payment details...</p>
              )}
            </DialogPanel>
          </div>
        </Dialog>


        {/* Work Photos */}
        {/* <div className="col-span-1 md:col-span-2">
          <div className="flex justify-center mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>handleBook(techid)}>
              Book Technician
            </button>
          </div>
        </div> */}
      

   
    </div>
  );
};

export default ViewBookingsProfile;
