import React from 'react';


const Gaurentee: React.FC = () => {
    return (
        <section className="bg-[#0A2342] text-white py-12">
    <div className="container mx-auto grid md:grid-cols-3 gap-8 px-4">
      <div>
        <h3 className="text-lg font-bold mb-2">Satisfaction Guarantee</h3>
        <p className="text-sm">100% commitment to quality and service.</p>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Easy Booking</h3>
        <p className="text-sm">Book anytime online or via our mobile app.</p>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Local Professionals</h3>
        <p className="text-sm">Certified technicians from your locality.</p>
      </div>
    </div>
  </section>
    )
  };
  
  export default Gaurentee;
  