import React from 'react';
import pic from '../../../../public/images/Resized/Therapist.png'

const CallAction: React.FC = () => {
    return (
      
          <section className="bg-[#0A2342] text-white py-16 px-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
              
              {/* Left Text Section */}
              <div className="max-w-lg text-left">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 px-20">
                 Already to improve <br /> or repair your home
                </h2>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 px-20">
                 Let's talk!
                </h2>
                <div className='px-20'>
                <button className="bg-[#00AEEF] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#0099d4] transition duration-200">
                  Book Now
                </button>
                </div>
                
              </div>
      
              {/* Right Image in House Shape */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-[300px] h-[320px] bg-blue-100 rounded-t-[80px] rounded-b-lg overflow-hidden relative">
                  <img
                    src={pic}
                    alt="Roof Workers"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              
            </div>
          </section>
     

    )
  };
  
  export default CallAction;
  