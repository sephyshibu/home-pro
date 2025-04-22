import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-[#0A2342] text-white py-12">
      <div className="container mx-auto grid md:grid-cols-2 items-center px-6 gap-10">
        <img src="/hero-image.jpg" alt="Hero" className="rounded-lg shadow-xl" />
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Need professional services at your doorstep? <br /> We can help!!
          </h1>
          <button className="bg-[#00D1FF] px-6 py-2 rounded-full font-medium">
            Book Now
          </button>
          <ul className="mt-6 space-y-1 text-sm">
            <li>✅ Safe Service Guarantee</li>
            <li>✅ 24h Availability</li>
            <li>✅ Flexible Appointments</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
