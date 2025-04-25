import React from "react";
import techImg from "../../../public/images/Resized/Driver.png"; // update path if needed

const steps = [
  {
    step: "1.",
    title: "Select Service",
    description: "You can select the required service needed for you.",
  },
  {
    step: "2.",
    title: "Schedule Service",
    description:
      "After selecting the required service, schedule your appointment with the technician and share your location.",
  },
  {
    step: "3.",
    title: "Select Technician",
    description:
      "Select your technician based on reviews and selecting according to their consultation fee and hourly rates.",
  },
  {
    step: "4.",
    title: "Get Technician at your Doorstep",
    description:
      "Once your technician arrives, he will diagnose the problem and provide an estimate. If you decide to continue, the technician will get to work.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Left Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
          <img
            src={techImg}
            alt="Technician Illustration"
            className="max-w-sm rounded-xl shadow-lg"
          />
        </div>

        {/* Right Text Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2342] mb-8">
            How HomePro works?
          </h2>
          <div className="space-y-6">
            {steps.map(({ step, title, description }) => (
              <div key={step} className="flex items-start gap-4">
                <p className="text-2xl font-semibold text-[#0A2342]">{step}</p>
                <div>
                  <h3 className="font-bold text-lg">{title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
