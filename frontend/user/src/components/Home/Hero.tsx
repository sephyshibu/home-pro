import React from 'react';
import doorTech from '../../../public/images/one.png';
import toiletTech from '../../../public/images/two.png'; // Add your second image here

const Hero: React.FC = () => {
  return (
    <section className="bg-[#0A2342] text-white py-12">
      <div className="container mx-auto grid lg:grid-cols-3 items-center px-6 gap-10">
        
        {/* Left Image */}
        <div className="hidden lg:block w-[300px] h-[400px]">
            <img
              src={doorTech}
              alt="Technician working"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>

        {/* Center Content */}
        <div className="text-center space-y-4">
          <div className="space-x-4 text-sm text-[#00D1FF]">
            <span>Maintenances</span>
            <span>Repairs</span>
            <span>Improvements</span>
            <span>Services</span>
          </div>
          <h1 className="text-3xl font-bold">
            Need professional <br /> services at your <br /> doorstep?
            <br /> <span className="text-[#00D1FF]">We can help!!</span>
          </h1>
          <button className="bg-[#00D1FF] px-6 py-2 rounded-full font-medium">
            Book Now
          </button>
          <p className="text-sm text-gray-300">24 Hour Services</p>

          {/* Icons Row */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>✅ Satisfaction Guarantee</div>
            <div>✅ 24h Availability</div>
            <div>✅ Local Professionals</div>
            <div>✅ Flexible Appointments</div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block w-[300px] h-[400px]">
            <img
              src={toiletTech}
              alt="Technician working"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>
      </div>
    </section>
  );
};

export default Hero;
