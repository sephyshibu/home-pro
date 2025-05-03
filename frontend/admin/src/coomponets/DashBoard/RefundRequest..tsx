import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Dialog } from '@headlessui/react';
import { fetchrefunndallreq } from '../../api/Refund/fetchrefundrequest';
interface bookingdeatils {
    _id:string,
    username: string;
    userphone:string;
    techname:string;
    Category: string;
    techStatus: "Accepted" | "Rejected" |"Pending";
    date: string;
    locationUrl:string,
    rateperhour:number,
    techphone:string,
    consultationFee:string,
    consultationpaymentStatus:string,
    workaddress:string,
    totalhours:number,
    pincode:string,
    userremark:string,
    techremark:string
  
  }



const RefundRequest: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<bookingdeatils | null>(null);
    const adminId=localStorage.getItem("adminId")
    const[refundreq,setrefundreq]=useState<bookingdeatils[]|null>([])
    const navigate=useNavigate()
    useEffect(()=>{
        const fetchrefundreq=async()=>{
            if(!adminId){
                navigate('/')
                return
            }
            try {
                const refundreqdetails=await fetchrefunndallreq()
                console.log(refundreqdetails)
                setrefundreq(refundreqdetails)
            }  catch (error) {
                console.error("Error fetching refund request:", error);
            }
        }
        fetchrefundreq()
    },[])

    // const openModal = (req: bookingdeatils) => {
    //     setSelectedRequest(req);
    //     setIsOpen(true);
    //   };
    
    //   const closeModal = () => {
    //     setIsOpen(false);
    //     setSelectedRequest(null);
    //   };


  return (
    <div className="flex flex-col min-h-screen bg-white">
      

      
      {/* Request Table */}
      <main className="flex-grow flex justify-center items-start mt-8">
        <div className="bg-gray-100 p-6 rounded-xl w-full max-w-4xl shadow">
          <div className="grid grid-cols-6 font-semibold text-gray-700 text-sm border-b pb-3">
            
            <div className="col-span-1">User Name</div>
            <div className="col-span-1">Contact Number</div>
            <div className="col-span-1">Tech Name</div>
            <div className="col-span-1">Category</div>
            <div className="col-span-1">Tech Status</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1">User remark</div>
            <div className="col-span-1">Consultation Payment Status</div>
          </div>
          <div className="mt-4 space-y-4">
            {refundreq && refundreq.map((req) => (
              <div key={req._id} className="grid grid-cols-6 items-center text-sm text-gray-800 bg-white rounded shadow px-4 py-3">
                
                <div className="col-span-1">{req.username}</div>
                <div className="col-span-1">{req.userphone}</div>
                <div className="col-span-1">{req.techname}</div>
                <div className="col-span-1">{req.Category}</div>
                <div className="col-span-1">{req.techStatus}</div>
                <div className="col-span-1">{req.date}</div>
                <div className="col-span-1">{req.userremark}</div>
                <div className="col-span-1">{req.consultationpaymentStatus}</div>

                {/* <div className="col-span-1 text-center">
                  <button className="bg-[#FFDF00] text-black px-3 py-1 rounded hover:bg-yellow-500" onClick={()=>AcceptRefund(req)} >
                    Accept
                  </button>
                  <button className="bg-[#FFDF00] text-black px-3 py-1 rounded hover:bg-yellow-500" onClick={()=>RejectRefund(req)} >
                    Reject
                  </button>
                 
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4 border-b pb-2">
              Request Details
            </Dialog.Title>
            {selectedRequest && (
              <div className="space-y-2 text-gray-700">
                <p><strong>Username:</strong> {selectedRequest.username}</p>
                <p><strong>Phone:</strong> {selectedRequest.userphone}</p>
                <p><strong>Category:</strong> {selectedRequest.Category}</p>
                <p><strong>Date:</strong> {selectedRequest.date}</p>
                <p><strong>Pincode:</strong> {selectedRequest.pincode}</p>
                <p><strong>Work Address:</strong> {selectedRequest.workaddress}</p>
                <p><strong>Rate/Hour:</strong> ₹{selectedRequest.rateperhour}</p>
                <p><strong>Consultation Fee:</strong> ₹{selectedRequest.consultationFee}</p>
                <p><strong>Consultation Payment Status:</strong> {selectedRequest.consultationpaymentStatus}</p>
                <p><strong>Final Payment Status:</strong> {selectedRequest.finalpaymentStatus}</p>
                <p><strong>Work Status:</strong> {selectedRequest.workStatus}</p>
                <p><strong>Technician Phone:</strong> {selectedRequest.techphone}</p>
                <a href={selectedRequest.locationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Location</a>
              </div>
            )}
           <div className="mt-6 flex justify-center gap-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Accept</button>
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Pause</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">End</button>
            </div>
            
          </Dialog.Panel>
        </div>
      </Dialog>  */}

      {/* Footer */}
      <footer className="bg-black text-white text-sm py-6 mt-12">
        <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-4">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-lg mb-2">🏠 HomePro</h3>
            <p>Your Home. Our Priority</p>
          </div>
          <div className="space-y-2">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Help Center</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RefundRequest;
