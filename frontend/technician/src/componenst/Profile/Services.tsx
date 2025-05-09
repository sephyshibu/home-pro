import React, { useEffect, useState } from "react";
import { BookingDetails } from "../../api/FetchBookings/fetchcompletedandrejected";
import { useNavigate } from "react-router";
import { Dialog, DialogPanel,DialogTitle} from "@headlessui/react";



interface servicepage {
    _id: string;
    userId: {
      _id: string;
      name: string;
      phone: string;
    };
    technicianId: {
      _id: string;
      phone: string;
      categoryid: {
        name: string;
      };
    };
    addressId: {
      _id: string;
      addressname: string;
    };
    workstatus: string;
    booked_date: string;
    rateperhour: number;
    consultationFee: number;
    consultationpayStatus: string;
    finalpayStatus: string;
    userremark: string;
    techremark: string;
    totalFinalAmount: number;
    techcommision: number;
    refundrequestAccept: boolean;
    sessionRequests: Array<any>;
    workTime: Array<any>;
    isconfirmedbyTech:boolean
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


const MyServicesPage: React.FC = () => {
    const techId=localStorage.getItem("techId")
    const[booking,setbooking]=useState<servicepage[]|null>([])
    const [selectedBooking, setSelectedBooking] = useState<servicepage | null>(null);
    const[isopen,setisopen]=useState(false)
    
   
    
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchbookvaLUES=async()=>{
            if(!techId){
                navigate('/login')
                return
            }
            try {
                const bookingdetails=await BookingDetails(techId)
                console.log(bookingdetails)
                setbooking(bookingdetails)
            
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        }
        fetchbookvaLUES()
    },[])
    
    const handleView=async(bookingdetails:servicepage)=>{
     setSelectedBooking(bookingdetails)
     setisopen(true)
    }
    console.log("booking",booking)

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
                  <th className="py-3 px-4 text-left">UserName</th>
                  <th className="py-3 px-4 text-left">Contact Number</th>
                  <th className="py-3 px-4 text-left">User/Tech Remark</th>
                  <th className="py-3 px-4 text-left">Work Status</th>
                  <th className="py-3 px-4 text-left">Scheduled Date</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {booking && booking.map((bookingItem, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-3 flex items-center space-x-2">
                      {bookingItem.userId.name}
                    </td>
                    <td className="px-4 py-3">{bookingItem.userId.phone}</td>
                    <td className="px-4 py-3">{bookingItem.userremark?bookingItem.userremark:bookingItem.techremark}</td>
                    <td className="px-4 py-3">
                   
                      <span className={`block font-medium ${getWorkStatusColor(bookingItem.workstatus)}`}>
                        {bookingItem.workstatus}
                      </span>
                 
                  </td>
                    <td className="px-4 py-3">{bookingItem.booked_date}</td>
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

        <Dialog open={isopen} onClose={() => setisopen(false)} className="relative z-[999]">
            <div className="fixed inset-0 bg-black/30 z-[999]" aria-hidden="true" />
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto">
                <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl z-[1001]">
                <DialogTitle className="text-xl font-bold mb-4">Booking Details</DialogTitle>
                {selectedBooking && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div><strong>User Name:</strong> {selectedBooking.userId.name}</div>
                    <div><strong>User Phone:</strong> {selectedBooking.userId.phone}</div>
                    <div><strong>Category:</strong> {selectedBooking.technicianId.categoryid.name}</div>
                    <div><strong>Technician Status:</strong> {selectedBooking.isconfirmedbyTech}</div>
                    <div><strong>Work Status:</strong> {selectedBooking.workstatus}</div>
                    <div><strong>Scheduled Date:</strong> {selectedBooking.booked_date}</div>
                    <div><strong>Rate per Hour:</strong> ₹{selectedBooking.rateperhour}</div>
                    <div><strong>Consultation Fee:</strong> ₹{selectedBooking.consultationFee}</div>
                    <div><strong>Consultation Pay Status:</strong> {selectedBooking.consultationpayStatus}</div>
                    <div><strong>Final Payment Status:</strong> {selectedBooking.finalpayStatus}</div>
                    <div><strong>Work Address:</strong> {selectedBooking.addressId.addressname}</div>
                    <div><strong>User Remark:</strong> {selectedBooking.userremark}</div>
                    <div><strong>Technician Remark:</strong> {selectedBooking.techremark}</div>
                    <div><strong>Total Amount:</strong> ₹{selectedBooking.totalFinalAmount}</div>
                    <div><strong>Technician Commission:</strong> ₹{selectedBooking.techcommision}</div>
                    <div><strong>Refund Accepted:</strong> {selectedBooking.refundrequestAccept ? "Yes" : "No"}</div>
                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <button
                    onClick={() => setisopen(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                    Close
                    </button>
                </div>
                </DialogPanel>
            </div>
        </Dialog>

                        
      </div>

      
    </div>
  );
};

export default MyServicesPage;
