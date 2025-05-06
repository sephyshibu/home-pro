import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchTechById } from "../../api/fetchtechbyid";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import {persistor} from '../../app/store'

interface Technician{
  _id:string
  name:string,
  email:string,
  phone:string,
  serviceablepincode:string[],
  rateperhour:number,
  noofworks:number,
  profileimgurl:string,
  consulationFee:number,
  categoryid:{
    _id:string,
    name:string,
    description:string
  }
}

interface Category{
  _id:string,
  name:string
}

const TechnicianProfile:React.FC=()=> {
  const location=useLocation()
  const {techid,categoryId, time,date,pincode}=location.state||null
  const navigate=useNavigate()
  const[technician,settechnician]=useState<Technician>({
    _id:'',
    name: '',
    email: '',
    phone: '',
    rateperhour: 0,
    serviceablepincode: [],
    noofworks: 0,
    profileimgurl: '',
    consulationFee: 0,
    categoryid:{
      _id:"",
      name:"",
      description:""
    }
  })

  useEffect(()=>{
    const fetchtech=async()=>{
      try {
        const response=await fetchTechById(techid)
        settechnician(response)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }

    }
    fetchtech()

  },[])
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
  const handleBook=async(techid:string)=>{
        navigate('/proceedpayment',{state:{techid,bookingdetails:{
          date:location.state?.date,
          time:location.state?.time,
          categoryId:location.state?.categoryId,
          pinocde:location.state?.pincode
        }}})
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
              <p><strong>Name:</strong> {technician.name}</p>
              <p><strong>Number of Works:</strong> {technician.noofworks}</p>
              <p><strong>Phone Number:</strong> {technician.phone}</p>
              <p><strong>Service Category:</strong> {technician.categoryid.name.toUpperCase()}</p>
              <p><strong>Consultation Fee:</strong> ₹{technician.consulationFee}</p>
              <p><strong>Rate per Hour:</strong> ₹ {technician.rateperhour} / hr</p>
              <p><strong>Service Districts:</strong> {technician.serviceablepincode.join(", ")}</p>
            </div>

            {/* Right side - profile image */}
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border-2 border-gray-300">
              <img
                src={technician.profileimgurl}
                alt="Technician Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          </div>
        </div>

        {/* Work Photos */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex justify-center mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>handleBook(techid)}>
              Book Technician
            </button>
          </div>
        </div>
      

      {/* Footer */}
      <footer className="bg-[#0F1A3C] text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h4 className="text-xl font-bold mb-2">HomePro</h4>
            <p>Your Home. Our Priority</p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Help</h5>
            <ul className="space-y-1 text-sm">
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Warranty</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">More</h5>
            <ul className="space-y-1 text-sm">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechnicianProfile;
