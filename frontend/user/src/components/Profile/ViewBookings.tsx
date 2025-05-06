import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchTechById } from "../../api/fetchtechbyid";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import {persistor} from '../../app/store'
interface viewBookings{
  _id:string
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
//   worktime:[{}],
  workaddress:string,
  totalhours:number,
  category:string,
  pincode:string
}

const ViewBookingsProfile:React.FC=()=> {
  const location=useLocation()
  const bookingdetails=location.state as viewBookings
  const navigate=useNavigate()
  const[technician,settechnician]=useState<viewBookings>(bookingdetails)

//   useEffect(()=>{
//     const fetchtech=async()=>{
//       try {
//         const response=await fetchTechById(techid)
//         settechnician(response)
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }

//     }
//     fetchtech()

//   },[])
const userId=localStorage.getItem('userId')
const handleLoginLogout=async()=>{
                if(userId){
                    localStorage.removeItem('userId')
                    await persistor.purge()
                    navigate('/')
                }else{
                    navigate('/login')
                }
            }
  

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
