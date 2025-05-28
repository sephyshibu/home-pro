import React, { useEffect, useState ,useRef} from 'react';
import ChatBox from '../ChatBox';
import { useNavigate } from 'react-router';
import {fetchupcomingevents } from '../../../api/TechApi/Upcomingevents/upcomingevents';
// import { aceptRequest } from '../../api/AcceptRequest/acceptrequest';
// import toast, {  } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import axiosInstancetech from "../../../Axios/TechAxios/axios";
import toast from 'react-hot-toast';
interface Events {
    _id:string,
    userId:string,
    username: string;
    userphone:string;
    Category: string;
    workStatus: "InProgress" | "Pending" | "Paused" | "Completed"| "Resume";
    date: string;
    locationUrl:string,
    rateperhour:number,
    isconfirmedByTech:string;
    isPauseAccept:boolean;
    isResumeAccept:boolean;
    techphone:string,
    consultationFee:string,
    consultationpaymentStatus:string,
    finalpaymentStatus:string,
    worktime:[{}],
    sessionrequest:[{types:string, status:string}],
    workaddress:string,
    totalhours:number,
    pincode:string,
  
  }
  
  

const TechnicianUpcoming: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
   
    const [selectedRequest, setSelectedRequest] = useState<Events | null>(null);
    const techId=localStorage.getItem("techId")
    const[upcoming,setupcoming]=useState<Events[]|null>([])

   
    const navigate=useNavigate()

   
    

    useEffect(()=>{
        const fetchupcomingevent=async()=>{
            if(!techId){
                navigate('/tech')
                return
            }
            try {
                const upcomingeventsdetails=await fetchupcomingevents(techId)
                console.log(upcomingeventsdetails)
                setupcoming(upcomingeventsdetails)
              
            }  catch (error) {
                console.error("Error fetching upcoming events:", error);
            }
        }
        fetchupcomingevent()
    },[])

    

    

    const openModal = (req: Events) => {
      console.log("req",req)
    
        setSelectedRequest(req);
        setIsOpen(true);

      
      };
    
      const closeModal = () => {
        setIsOpen(false);
        setSelectedRequest(null);
      };

      const handleRequestSession=async(types:"start"|"resume"|"pause"|"end")=>{
          try {
            const bookingId=selectedRequest?._id
            const result=await axiosInstancetech.post(`/api/requestsession/${bookingId}`,{types})
            console.log(result.data)
          
            toast.success(`${types} request is sent to the user`)
        
            
          } catch (error) {
            toast.error(`Failed to send ${types}request`)
          }
      }

     
      const getLatestStatusMap = (requests: Events["sessionrequest"]) => {
        const statusMap: Record<string, string> = {};
      
        // Loop through and override with latest status by type
        for (const req of requests) {
          statusMap[req.types] = req.status;
        }
      
        return statusMap;
      };
      



  return (
    <div className="flex flex-col min-h-screen bg-white">
      

      
      {/* Request Table */}
      <main className="flex-grow flex justify-center items-start mt-8">
        <div className="bg-gray-100 p-6 rounded-xl w-full max-w-4xl shadow">
          <div className="grid grid-cols-6 font-semibold text-gray-700 text-sm border-b pb-3">
            
            <div className="col-span-1">User Name</div>
            <div className="col-span-1">Contact Number</div>

            <div className="col-span-1">Date of Work</div>
            <div className="col-span-1">Work Status</div>
            <div className="col-span-1">Action</div>
          </div>
          <div className="mt-4 space-y-4">
            {upcoming && upcoming.map((req) => (
              <div key={req._id} className="grid grid-cols-6 items-center text-sm text-gray-800 bg-white rounded shadow px-4 py-3">
                
                <div className="col-span-1">{req.username}</div>
                <div className="col-span-1">{req.userphone}</div>
            
                <div className="col-span-1">{req.date}</div>
                <div className="col-span-1">{req.workStatus}</div>
                <div className="col-span-1 text-center">
                  <button className="bg-[#FFDF00] text-black px-3 py-1 rounded hover:bg-yellow-500" onClick={()=>openModal(req)} >
                    View
                  </button>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={isOpen} onClose={closeModal} className="fixed z-50 inset-0 overflow-y-auto">
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
            {selectedRequest && (
          <ChatBox
            bookingId={selectedRequest._id}
            userId={selectedRequest.userId}
            techId={techId!}
          />
        )}

            
            {selectedRequest && (() => {
            const statusMap = getLatestStatusMap(selectedRequest.sessionrequest);

           
            const isPauseAccepted = selectedRequest.isPauseAccept;
            const isResumeAccepted = selectedRequest.isResumeAccept;
            
            const isStartAccepted = statusMap["start"] === "accepted" || selectedRequest.workStatus === "InProgress" || selectedRequest.workStatus === "Resume";
            const isEndAccepted = statusMap["end"] === "accepted" || selectedRequest.workStatus === "Completed";

            const canPause = isStartAccepted && !isEndAccepted && !isPauseAccepted;
            const canResume = isPauseAccepted && !isEndAccepted && !isResumeAccepted;
            const canEnd = (isStartAccepted || isResumeAccepted) && !isEndAccepted;


            return (
           <div className="mt-6 flex justify-center gap-4">
               <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                onClick={() => handleRequestSession('start')}
                disabled={isStartAccepted || isEndAccepted}
              >
                Accept
              </button>

              <button
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
                onClick={() => handleRequestSession('pause')}
                disabled={!canPause }
              >
                Pause
              </button>

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={() => handleRequestSession('resume')}
                disabled={!canResume }
              >
                Resume
              </button>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                onClick={() => handleRequestSession('end')}
                disabled={!canEnd}
              >
                End
              </button>

            </div>
              );
            })()}
            
          </Dialog.Panel>
        </div>
      </Dialog> 

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

export default TechnicianUpcoming;
