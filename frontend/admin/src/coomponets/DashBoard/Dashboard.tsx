import React, { useState } from "react";
import User from "./User";
import Tech from'./Tech'
import TechList from './TechList'
import { useNavigate } from "react-router";
import Category from './Category'
import AddCategory from './AddCategory'
import { persistor } from "../../app/store";
const tabs = ["Dashboard", "User List", "Technician List","Category List", "Transactions"];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const adminId=localStorage.getItem('adminId')
  const navigate=useNavigate()


  const handleLogOut=async()=>{
    if(adminId){
      localStorage.removeItem('adminId')
      await persistor.purge()
      navigate('/')
    }else{
      navigate('/admindashboard')
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <div className="bg-[#0A1D56] text-white flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/images/Logo.png" alt="HomePro Logo" className="h-10" />
          <span className="font-bold text-xl">HomePro</span>
        </div>
        <button type="button" onClick={handleLogOut} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white">
          {adminId?"LogOut":"LogIn"}
        </button>
      </div>

      {/* Tab Menu */}
      <div className="bg-gray-200 flex justify-center space-x-6 py-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
              activeTab === tab ? "bg-[#0A1D56] text-white" : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        {/* {activeTab === "Dashboard" && <DashboardView />} */}
        {activeTab === "User List" && <User/>}
        {activeTab === "Technician List" && 
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
        {/* {activeTab === "Transactions" && <TransactionsView />}  */}
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
