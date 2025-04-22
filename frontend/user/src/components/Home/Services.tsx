import React from 'react';


const Services: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold">Our Services</h3>
          <p className="text-gray-500 mt-2">All your home service needs in one place</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 px-6">
      
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="electrical.jpg" className="rounded-md h-24 mx-auto mb-2" />
            <h4 className="font-semibold">Electrical Services</h4>
            <p className="text-sm text-gray-500">Fix wiring, sockets, lighting & more.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="plumbing.jpg" className="rounded-md h-24 mx-auto mb-2" />
            <h4 className="font-semibold">Plumbing Services</h4>
            <p className="text-sm text-gray-500">Leaky taps, blocked drains & installation.</p>
          </div>
 
        </div>
        </section>
    )
  };
  
  export default Services;
  