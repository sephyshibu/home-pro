import React, { useEffect, useState ,useRef} from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router';
import { fetchupcomingevents } from '../../api/Upcomingevents/upcomingevents';
// import { aceptRequest } from '../../api/AcceptRequest/acceptrequest';
// import toast, {  } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import axiosInstancetech from '../../axios';
import toast from 'react-hot-toast';
interface Events {
    _id:string,
    userId:string,
    username: string;
    userphone:string;
    Category: string;
    workStatus: "InProgress" | "Pending" | "Paused" | "Completed";
    date: string;
    locationUrl:string,
    rateperhour:number,
    isconfirmedByTech:string;
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
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const socket = useRef<any>(null);
    const navigate=useNavigate()
    useEffect(() => {
      if (selectedRequest && techId && selectedRequest.userId) {
        const roomId = [selectedRequest.userId, techId].sort().join("_");
    
        socket.current = io("http://localhost:3000");
    
        socket.current.emit("join_room", {
          userId: techId, // tech joining
          receiverId: selectedRequest.userId,
        });
    
        socket.current.on("receive_message", (message: string) => {
          setMessages((prev) => [...prev, message]);
        });
    
        return () => {
          socket.current.disconnect();
        };
      }
    }, [selectedRequest, techId]);

    
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(()=>{
        const fetchupcomingevent=async()=>{
            if(!techId){
                navigate('/')
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

    const sendMessage = () => {
      if (!newMessage.trim()) return;
    
      socket.current.emit("send_message", {
        senderId: techId,
        receiverId: selectedRequest?.userId,
        message: newMessage,
      });
    
      setMessages((prev) => [...prev, newMessage]);
      setNewMessage("");
    };

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
            const result=await axiosInstancetech.post(`/requestsession/${bookingId}`,{types})
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
            <div className="col-span-1">District</div>
            <div className="col-span-1">Date of Work</div>
            <div className="col-span-1">Work Status</div>
            <div className="col-span-1">Action</div>
          </div>
          <div className="mt-4 space-y-4">
            {upcoming && upcoming.map((req) => (
              <div key={req._id} className="grid grid-cols-6 items-center text-sm text-gray-800 bg-white rounded shadow px-4 py-3">
                
                <div className="col-span-1">{req.username}</div>
                <div className="col-span-1">{req.userphone}</div>
                <div className="col-span-1">{req.pincode}</div>
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
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">Chat with {selectedRequest && selectedRequest.username}</h4>
              <div className="space-y-2 h-60 overflow-y-auto border rounded p-2 bg-gray-50">
                {messages.map((msg, i) => (
                  <div key={i} className="flex">
                    <div className="bg-blue-100 p-2 rounded">{msg}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  className="border rounded px-2 py-1 flex-grow"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Send
                </button>
              </div>
            </div>
            {selectedRequest && (() => {
            const statusMap = getLatestStatusMap(selectedRequest.sessionrequest);

            const isStartAccepted = statusMap["start"] === "accepted";
            const isPauseAccepted = statusMap["pause"] === "accepted";
            const isResumeAccepted = statusMap["resume"] === "accepted";
            const isEndAccepted = statusMap["end"] === "accepted";

            return (
           <div className="mt-6 flex justify-center gap-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700  disabled:opacity-50" onClick={()=>handleRequestSession('start')} disabled={isStartAccepted || isPauseAccepted || isResumeAccepted || isEndAccepted} >Accept</button>
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700  disabled:opacity-50" onClick={()=>handleRequestSession('pause')} disabled={!isStartAccepted || isPauseAccepted || isEndAccepted}>Pause</button>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700  disabled:opacity-50"
                    onClick={() => handleRequestSession('resume')}
                    disabled={!isPauseAccepted || isResumeAccepted || isEndAccepted}
                  >
                    Resume
                  </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700  disabled:opacity-50" onClick={()=>handleRequestSession('end')}   disabled={!isStartAccepted || isEndAccepted}>End</button>
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
