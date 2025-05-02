import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchrequest } from '../../api/RequestFetch/requestfetch';
interface Request {
    _id:string,
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
    worktime:[{}],
    workaddress:string,
    totalhours:number,
    pincode:string,
  
  }

const mockRequests: Request[] = [
  { id: 1, name: 'User 1', profileUrl: '', contact: '+91 9999999999', district: 'Kottayam', date: '30-04-2025' },
  { id: 2, name: 'User 2', profileUrl: '', contact: '+91 9999999999', district: 'Ernakulam', date: '30-04-2025' },
  { id: 3, name: 'User 3', profileUrl: '', contact: '+91 9999999999', district: 'Kollam', date: '30-04-2025' },
  { id: 4, name: 'User 4', profileUrl: '', contact: '+91 9999999999', district: 'Thrissur', date: '29-04-2025' },
  { id: 5, name: 'User 5', profileUrl: '', contact: '+91 9999999999', district: 'Kottayam', date: '28-04-2025' },
];

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


  return (
    <div className="flex flex-col min-h-screen bg-white">
      

      
      {/* Request Table */}
      <main className="flex-grow flex justify-center items-start mt-8">
        <div className="bg-gray-100 p-6 rounded-xl w-full max-w-4xl shadow">
          <div className="grid grid-cols-6 font-semibold text-gray-700 text-sm border-b pb-3">
            <div className="col-span-1">Profile Photo</div>
            <div className="col-span-1">User Name</div>
            <div className="col-span-1">Contact Number</div>
            <div className="col-span-1">District</div>
            <div className="col-span-1">Date of Work</div>
            <div className="col-span-1">Action</div>
          </div>
          <div className="mt-4 space-y-4">
            {mockRequests.map((req) => (
              <div key={req.id} className="grid grid-cols-6 items-center text-sm text-gray-800 bg-white rounded shadow px-4 py-3">
                <div className="col-span-1 flex justify-center">
                  <img src="/default-avatar.png" alt="Profile" className="w-10 h-10 rounded-full" />
                </div>
                <div className="col-span-1">{req.name}</div>
                <div className="col-span-1">{req.contact}</div>
                <div className="col-span-1">{req.district}</div>
                <div className="col-span-1">{req.date}</div>
                <div className="col-span-1 text-center">
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-yellow-500">
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
