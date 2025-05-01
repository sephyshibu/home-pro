import React, { useEffect, useState } from "react";
import { BookingDetails } from "../../api/Service/fetchbooking";
import { useNavigate } from "react-router";
interface servicepage {
  _id:string,
  techimage:string;
  technicianname: string;
  Category: string;
  techStatus: "Accepted" | "Rejected" |"Pending";
  workStatus: "InProgress" | "Pending" | "Paused" | "Completed";
  date: string;
  locationUrl:string,
  rateperhour:number,
  techphone:string,
  consultationFee:string,
  consultationpaymentStatus:string,
  finalpaymentStatus:string,
  worktime:[{}],
  workaddress:string,
  totalhours:number,
  pincode:string,

}



const getWorkStatusColor = (status: string) => {
  switch (status) {
    case "InProgress": return "text-yellow-600";
    case "Pending": return "text-orange-600";
    case "Paused": return "text-blue-600";
    case "Completed": return "text-green-600";
    default: return "";
  }
};

const getTechStatusColor = (status: string) => {
  return status === "Accepted" ? "text-green-600" : "text-red-600";
};

const MyServicesPage: React.FC = () => {
    const userId=localStorage.getItem("userId")
    const[booking,setbooking]=useState<servicepage[]|null>([])
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchbookvaLUES=async()=>{
            if(!userId){
                navigate('/login')
                return
            }
            try {
                const bookingdetails=await BookingDetails(userId)
                console.log(bookingdetails)
                setbooking(bookingdetails)
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        }
        fetchbookvaLUES()
    },[])

    const handleView=async(bookingdetails:servicepage)=>{
      navigate('/viewbookingddetails',{state:bookingdetails})
    }


  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex flex-grow bg-gray-50">
        
        {/* Main Table */}
        <main className="flex-grow p-6">
          <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#0B1C42] text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Technician</th>
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Tech Status</th>
                  <th className="py-3 px-4 text-left">Work Status</th>
                  <th className="py-3 px-4 text-left">Scheduled Date</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {booking && booking.map((bookingItem, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-3 flex items-center space-x-2">
                      <img
                        src={bookingItem.techimage}// Replace with your avatar image path
                        alt="Technician"
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{bookingItem.technicianname}</span>
                    </td>
                    <td className="px-4 py-3">{bookingItem.Category}</td>
                    <td className={`px-4 py-3 font-medium ${getTechStatusColor(bookingItem.techStatus)}`}>
                      {bookingItem.techStatus}
                    </td>
                    <td className={`px-4 py-3 font-medium ${getWorkStatusColor(bookingItem.workStatus)}`}>
                      {bookingItem.workStatus}
                    </td>
                    <td className="px-4 py-3">{bookingItem.date}</td>
                    <td className="px-4 py-3 text-center">
                      <button className="bg-[#00BFFF] hover:bg-[#009FCC] text-white px-4 py-1 rounded-md" onClick={()=>handleView(bookingItem)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      
    </div>
  );
};

export default MyServicesPage;
