import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchrequest } from '../../api/RequestFetch/requestfetch';
import { aceptRequest } from '../../api/AcceptRequest/acceptrequest';
import toast, { Toast } from 'react-hot-toast';
interface Request {
    _id:string,
    username: string;
    userphone:string;
    Category: string;
    techStatus: "Accepted" | "Rejected" |"Pending";
    workStatus: "InProgress" | "Pending" | "Paused" | "Completed";
    date: string;
    locationUrl:string,
    rateperhour:number,
    isconfirmedByTech:string;
    techphone:string,
    consultationFee:string,
    consultationpaymentStatus:string,
    finalpaymentStatus:string,
    worktime:[{}],
    workaddress:string,
    totalhours:number,
    pincode:string,
  
  }



const TechnicianRequestPage: React.FC = () => {
    const techId=localStorage.getItem("techId")
    const[request,setrequest]=useState<Request[]|null>([])
    const navigate=useNavigate()
    useEffect(()=>{
        const fecthbookinghavereq=async()=>{
            if(!techId){
                navigate('/')
                return
            }
            try {
                const requestdetails=await fetchrequest(techId)
                console.log(requestdetails)
                setrequest(requestdetails)
            }  catch (error) {
                console.error("Error fetching request:", error);
            }
        }
        fecthbookinghavereq()
    },[])

    const handleAccept=async(id:string)=>{
        if(!techId) return

        try {
            await aceptRequest(id);

            setrequest((prev) =>
                prev ? prev.filter((r) => r._id !== id) : null
              );
          
            
            toast.success("request accepted")

        } catch (error) {
            console.error("Error accepting request:", error);
        }

    }


  return (
    <div className="flex flex-col min-h-screen bg-white">
      

      
      {/* Request Table */}
      <main className="flex-grow flex justify-center items-start mt-8">
        <div className="bg-gray-100 p-6 rounded-xl w-full max-w-4xl shadow">
          <div className="grid grid-cols-6 font-semibold text-gray-700 text-sm border-b pb-3">
            
            <div className="col-span-1">User Name</div>
            <div className="col-span-1">Contact Number</div>
            <div className="col-span-1">District</div>
            <div className="col-span-1">Date of Work</div>
            <div className="col-span-1">Action</div>
          </div>
          <div className="mt-4 space-y-4">
            {request && request.map((req) => (
              <div key={req._id} className="grid grid-cols-6 items-center text-sm text-gray-800 bg-white rounded shadow px-4 py-3">
                
                <div className="col-span-1">{req.username}</div>
                <div className="col-span-1">{req.userphone}</div>
                <div className="col-span-1">{req.pincode}</div>
                <div className="col-span-1">{req.date}</div>
                <div className="col-span-1 text-center">
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-yellow-500" onClick={()=>handleAccept(req._id)}>
                    Accept
                  </button>
                  <button className="bg-green-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
                   Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-sm py-6 mt-12">
        <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-4">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-lg mb-2">🏠 HomePro</h3>
            <p>Your Home. Our Priority</p>
          </div>
          <div className="space-y-2">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Help Center</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechnicianRequestPage;
