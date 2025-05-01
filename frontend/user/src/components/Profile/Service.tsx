// import React from "react";

// interface Booking {
//   techimage:string;
//   technicianName: string;
//   Category: string;
//   techStatus: "Accepted" | "Rejected" |"Pending";
//   workStatus: "InProgress" | "Pending" | "Paused" | "Completed";
//   date: string;
// }

// const bookings: Booking[] = [
//   { technicianName: "Tech 1", service: "Electrical Services", techStatus: "Accepted", workStatus: "InProgress", date: "20-04-2025" },
//   { technicianName: "Tech 2", service: "Plumbing Services", techStatus: "Accepted", workStatus: "Pending", date: "18-04-2025" },
//   { technicianName: "Tech 3", service: "Appliance Repair", techStatus: "Rejected", workStatus: "Paused", date: "16-04-2025" },
//   { technicianName: "Tech 4", service: "Painting Services", techStatus: "Accepted", workStatus: "InProgress", date: "14-04-2025" },
//   { technicianName: "Tech 5", service: "Gardening Services", techStatus: "Accepted", workStatus: "Paused", date: "10-04-2025" },
//   { technicianName: "Tech 6", service: "Car Washing", techStatus: "Accepted", workStatus: "Completed", date: "08-04-2025" },
//   { technicianName: "Tech 6", service: "Massage Therapist", techStatus: "Accepted", workStatus: "Completed", date: "06-04-2025" },
// ];

// const getWorkStatusColor = (status: string) => {
//   switch (status) {
//     case "InProgress": return "text-yellow-600";
//     case "Pending": return "text-orange-600";
//     case "Paused": return "text-blue-600";
//     case "Completed": return "text-green-600";
//     default: return "";
//   }
// };

// const getTechStatusColor = (status: string) => {
//   return status === "Accepted" ? "text-green-600" : "text-red-600";
// };

// const MyServicesPage: React.FC = () => {


//     const
//   return (
//     <div className="min-h-screen flex flex-col">

//       <div className="flex flex-grow bg-gray-50">
        
//         {/* Main Table */}
//         <main className="flex-grow p-6">
//           <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//               <thead className="bg-[#0B1C42] text-white">
//                 <tr>
//                   <th className="py-3 px-4 text-left">Technician</th>
//                   <th className="py-3 px-4 text-left">Service</th>
//                   <th className="py-3 px-4 text-left">Tech Status</th>
//                   <th className="py-3 px-4 text-left">Work Status</th>
//                   <th className="py-3 px-4 text-left">Scheduled Date</th>
//                   <th className="py-3 px-4 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.map((booking, idx) => (
//                   <tr key={idx} className="border-b hover:bg-gray-100">
//                     <td className="px-4 py-3 flex items-center space-x-2">
//                       <img
//                         src="/avatar-placeholder.png" // Replace with your avatar image path
//                         alt="Technician"
//                         className="w-8 h-8 rounded-full"
//                       />
//                       <span>{booking.technicianName}</span>
//                     </td>
//                     <td className="px-4 py-3">{booking.service}</td>
//                     <td className={`px-4 py-3 font-medium ${getTechStatusColor(booking.techStatus)}`}>
//                       {booking.techStatus}
//                     </td>
//                     <td className={`px-4 py-3 font-medium ${getWorkStatusColor(booking.workStatus)}`}>
//                       {booking.workStatus}
//                     </td>
//                     <td className="px-4 py-3">{booking.date}</td>
//                     <td className="px-4 py-3 text-center">
//                       <button className="bg-[#00BFFF] hover:bg-[#009FCC] text-white px-4 py-1 rounded-md">
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>

      
//     </div>
//   );
// };

// export default MyServicesPage;
