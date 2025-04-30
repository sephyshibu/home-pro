import React from "react";

const TechnicianProfile = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#0F1A3C] text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="HomePro Logo" className="w-10 h-10" />
          <span className="text-xl font-bold">HomePro</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>
        <div className="text-sm">My Profile</div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Details */}
        <div className="col-span-1 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Technician Profile</h2>
          <div className="bg-white p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
            <div className="flex flex-col items-center mb-4">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> Tech 1</p>
              <p><strong>Years of Experience:</strong> 5 Years of Industry Experience</p>
              <p><strong>Phone Number:</strong> +91 9876543210</p>
              <p><strong>Service Category:</strong> Electrical Services</p>
              <p><strong>Consultation Fee:</strong> ₹ 300</p>
              <p><strong>Rate per Hour:</strong> ₹ 130 / hr</p>
              <p><strong>Service Districts:</strong> District A, District B, District C, District C</p>
            </div>
          </div>
        </div>

        {/* Work Photos */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Work Photos</h3>
            <div className="grid grid-cols-3 gap-3">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="w-full h-24 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="mt-6 bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((review, index) => (
                <div key={index} className="bg-white p-4 rounded border">
                  <div className="flex items-center text-yellow-400 mb-2">
                    {"★★★★★".split("").map((star, idx) => (
                      <span key={idx}>{star}</span>
                    ))}
                  </div>
                  <h4 className="font-semibold">Review title</h4>
                  <p className="text-sm text-gray-600">Review body</p>
                  <div className="text-xs text-gray-500 mt-2">
                    Reviewer name • Date
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Book Technician
            </button>
          </div>
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
