import React, { useState } from "react";
import TechnicianRequestPage from "../../../components/Technician/Request/Request";
import TechnicianUpcoming from "../../../components/Technician/Upcoming/upcomingevents";
import TechDashboard from "../DashboardView/dashboardview";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
// import Category from './Category'
// import AddCategory from './AddCategory'
import { cleartoken } from "../../../features/TokenTechSlice";
import { logouttech } from "../../../features/TechSlice";
import logo from '../../../../public/images/Resized/Logo Portrait.png'

const tabs = ["Upcoming Events", "Request", "Dashboard"];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Upcoming Events");
  const techId=localStorage.getItem('techId')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  

  const handleLogOut=async()=>{
    if(techId){
        console.log(techId)

      localStorage.removeItem('techId')
      localStorage.removeItem('persist:tech');
      localStorage.removeItem('techtoken');
      dispatch(logouttech());
      dispatch(cleartoken());
      // await persistor.purge()
      navigate('/tech')
    }else{
      navigate('/tech/techdashboard')
    }
  }

  const handleClick=()=>{
    navigate('/tech/myprofile')
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <div className="text-black flex justify-between items-center bg-yellow-400 p-4 ">
  <div className="flex-shrink-0">
    <img src={logo} alt="HomePro Logo" className="w-16" />
  </div>
        <button type="button" onClick={handleClick} className="bg-yellow-300 hover:bg-yellow-500 px-4 py-2 rounded-md text-black">
          {techId?"My Profile":""}
        </button>
        <button type="button" onClick={handleLogOut} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-black">
          {techId?"LogOut":"LogIn"}
        </button>
      </div>

      {/* Tab Menu */}
      <div className="bg-gray-200 flex justify-center space-x-6 py-3 mt-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
              activeTab === tab ? "bg-[#FFDF00] text-black" : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
         {activeTab === "Dashboard" && <TechDashboard />} 
         {activeTab === "Upcoming Events" && <TechnicianUpcoming/>}
         {activeTab === "Request" && <TechnicianRequestPage/>}
        {/* {activeTab === "Dashboard" && 
        <div>
            <div>
              <Tech/>
            </div>
            <div>
              <TechList/>
            </div>
          </div>}
          {activeTab === "Category List" && <div>
            <div>
              <AddCategory/>
            </div>
            <div>
              <Category/>
            </div>
          </div>} 
        /* {activeTab === "Transactions" && <TransactionsView />}   */}
      </div>

      {/* Footer */}
      <footer className="bg-[#0A1D56] text-white text-xs flex justify-between items-center px-6 py-4">
        <p>© 2025 HomePro</p>
        <div className="flex space-x-4">
          <a href="#">Shipping</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
