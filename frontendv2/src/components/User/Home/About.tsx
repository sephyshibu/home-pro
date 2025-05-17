import React from 'react';
import workersImage from '../../../../public/images/Homepro/rityyimg.jpg'; // replace with your image path

const AboutSection: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Text Section */}
        <div className="max-w-lg text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Professional for your <br /> home services
          </h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            You need help for home care? We are home care professionals
            focused in the Kerala region. We provide several services that
            support home services.
          </p>
          {/* <button className="bg-[#00AEEF] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#0099d4] transition duration-200">
            Book Now
          </button> */}
        </div>

        {/* Right Image in House Shape */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[300px] h-[320px] bg-blue-100 rounded-t-[80px] rounded-b-lg overflow-hidden relative">
            <img
              src={workersImage}
              alt="Roof Workers"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default AboutSection;
