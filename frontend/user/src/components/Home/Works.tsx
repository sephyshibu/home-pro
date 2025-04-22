import React from 'react';


const Works: React.FC = () => {
    return (
        <section className="py-12 bg-white">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center px-6">
          <img src="technician-call.jpg" className="rounded-xl shadow-lg" />
          <div>
            <h3 className="text-xl font-bold mb-4">How HomePro works?</h3>
            <ol className="list-decimal ml-5 space-y-2 text-gray-600">
              <li>Select your service</li>
              <li>Book your slot</li>
              <li>Get technician at your doorstep</li>
            </ol>
          </div>
        </div>
      </section>
    )
  };
  
  export default Works;
  