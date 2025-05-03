import React from "react";
import { useNavigate } from "react-router";

const ThankYouPage: React.FC = () => {
    const navigate=useNavigate()
    const handleClick=()=>{
            navigate('/myaccount/services')
    }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-[#0B1C42] text-white flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold">HomePro</div>
        <nav className="space-x-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Services</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
        <div className="font-medium">My Profile</div>
      </header>

      {/* Success Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-20">
        <div className="bg-white rounded-xl shadow-lg text-center p-8 max-w-md w-full">
          <div className="bg-[#0B1C42] text-white rounded-t-xl py-4 text-lg font-semibold">
            Successful Order
          </div>
          <div className="py-10">
            <img
              src="/success-box-icon.svg" // Replace with actual icon path
              alt="Success Icon"
              className="mx-auto mb-6 w-20 h-20"
            />
            <h2 className="text-xl font-semibold mb-2">Thank you for the booking!!</h2>
            <p className="text-gray-600 mb-6">
              Your order has been successfully placed and is now being processed.
            </p>
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
              View Service
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1C42] text-white text-sm px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold text-lg mb-2">HomePro</div>
          <p>Your Home, Our Priority</p>
        </div>
        <div>
          <div className="font-semibold mb-1">HELP</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-1">MORE</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default ThankYouPage;
