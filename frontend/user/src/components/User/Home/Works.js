import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import techImg from "../../../../public/images/Resized/Driver.png"; // update path if needed
const steps = [
    {
        step: "1.",
        title: "Select Service",
        description: "You can select the required service needed for you.",
    },
    {
        step: "2.",
        title: "Schedule Service",
        description: "After selecting the required service, schedule your appointment with the technician and share your location.",
    },
    {
        step: "3.",
        title: "Select Technician",
        description: "Select your technician based on reviews and selecting according to their consultation fee and hourly rates.",
    },
    {
        step: "4.",
        title: "Get Technician at your Doorstep",
        description: "Once your technician arrives, he will diagnose the problem and provide an estimate. If you decide to continue, the technician will get to work.",
    },
];
const HowItWorks = () => {
    return (_jsx("section", { className: "bg-white py-16 px-4 md:px-12 lg:px-24", children: _jsxs("div", { className: "max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10", children: [_jsx("div", { className: "flex-shrink-0 w-full lg:w-1/2 flex justify-center", children: _jsx("img", { src: techImg, alt: "Technician Illustration", className: "max-w-sm rounded-xl shadow-lg" }) }), _jsxs("div", { className: "w-full lg:w-1/2", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold text-[#0A2342] mb-8", children: "How HomePro works?" }), _jsx("div", { className: "space-y-6", children: steps.map(({ step, title, description }) => (_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("p", { className: "text-2xl font-semibold text-[#0A2342]", children: step }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg", children: title }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: description })] })] }, step))) })] })] }) }));
};
export default HowItWorks;
