import React from "react";
import { useNavigate } from "react-router";

const ThankYouPage: React.FC = () => {
    const navigate=useNavigate()
    const handleClick=()=>{
            navigate('/')
    }
  return (
    <div className="min-h-screen flex flex-col">

      

      {/* Success Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-20">
        <div className="bg-white rounded-xl shadow-lg text-center p-8 max-w-md w-full">
          <div className="bg-[#0B1C42] text-white rounded-t-xl py-4 text-lg font-semibold">
            Successful Order
          </div>
          <div className="py-10">
           
            <h2 className="text-xl font-semibold mb-2">Thank you for the Service!!</h2>
            <p className="text-gray-600 mb-6">
              Your Payment is successfully Completed.Thank You!
            </p>
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
              Home
            </button>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default ThankYouPage;
