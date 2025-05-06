import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchcategory } from '../../api/fetchcategory';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {persistor} from '../../app/store'
interface Technician {
  _id: string;
  name: string;
  noofworks: number;
  consulationFee: number;
  rateperhour: number;
  profileimgurl?: string;
}

interface category{
    name:string, 
    description:string
}

const TechnicianList: React.FC = () => {
  const location = useLocation();
  const{technicians, categoryId,date, time,pincode}=location.state||{}
  const[category, setcategory]=useState<category|null>(null)
  const navigate= useNavigate()
  useEffect(()=>{
    const fetchCategory=async()=>{
    const result=await fetchcategory(categoryId) 
    setcategory(result)  
    }
    if(categoryId){
        fetchCategory()
    }
  },[categoryId])
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

  const handleViewProfile=async(techid:string)=>{
    navigate('/viewprofile', {state:{techid,categoryId,date, time, pincode}})
  }


  return (
    <div className="min-h-screen bg-[#0b1444] text-white">
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
                <NavLink to="/" className="text-lg font-semibold text-sky-600 hover:underline">🏠 Home</NavLink>
                <button
                  onClick={handleLoginLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
                >
                  Logout
                </button>
              </div>
      {/* Header */}
      <header className="bg-[#0b1444] text-center py-12">

        <h1 className="text-3xl font-bold">
            {category?category.name:"Loading.."}
        </h1>
        <p className="mt-2 max-w-xl mx-auto text-gray-300 text-sm">
            {category?category.description:"Loading...."}
        </p>

        <div className="flex justify-center gap-4 mt-6 text-xs text-gray-400">
          <span>✔ Satisfaction Guarantee</span>
          <span>✔ 24x7 Availability</span>
          <span>✔ Local Professionals</span>
          <span>✔ Flexible Appointments</span>
        </div>
      </header>

      {/* Technician List Section */}
      <section className="bg-white text-black py-8 rounded-t-3xl px-4 md:px-16">
        <h2 className="text-xl font-bold text-center mb-6">Select your technician</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Profile Picture</th>
                <th className="px-4 py-3 text-left">Technician Name</th>
                <th className="px-4 py-3 text-left">No of Works Completed</th>
                <th className="px-4 py-3 text-left">Consultation Fee</th>
                <th className="px-4 py-3 text-left">Rate per Hour</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {technicians.map((tech:Technician) => (
                <tr key={tech._id} className="hover:bg-gray-100">
                  <td className="px-4 py-3">
                    <img
                      src={tech.profileimgurl || '/default-profile.png'}
                      alt="profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{tech.name}</td>
                  <td className="px-4 py-3">{tech.noofworks}</td>
                  <td className="px-4 py-3">₹ {tech.consulationFee}</td>
                  <td className="px-4 py-3">₹ {tech.rateperhour}/hr</td>
                  <td className="px-4 py-3">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={()=>handleViewProfile(tech._id)}>
                      View profile
                    </button>
                  </td>
                </tr>
              ))}
              {technicians.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">No technicians found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      
    </div>
  );
};

export default TechnicianList;
