import React, { useEffect, useState,useRef } from "react";
import { useLocation } from "react-router";
import { fetchTechById } from "../../api/fetchtechbyid";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import {persistor} from '../../app/store'
import io from 'socket.io-client'
interface viewBookings{
  _id:string
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
//   worktime:[{}],
  workaddress:string,
  totalhours:number,
  category:string,
  pincode:string
}

const ViewBookingsProfile:React.FC=()=> {
  const location=useLocation()
  const bookingdetails=location.state as viewBookings
  const navigate=useNavigate()
  const userId=localStorage.getItem("userId")
  const [isSocketReady, setIsSocketReady] = useState(false);

  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const[technician,settechnician]=useState<viewBookings>(bookingdetails)
  const techId = technician._id;
  
const socket = io('http://localhost:3000');
  // Socket connection

  // Socket connection setup
useEffect(() => {
  if (technician.techStatus === "Accepted") {
    const roomId = [userId, techId].sort().join("_");



    // Join the room
    socket.emit("join_room", { userId, receiverId: techId });

    // Listen for incoming messages
    socket.on("receive_message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Log socket connection
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // Handle connection error
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    // Clean up socket on dismount
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }
}, [technician, userId, techId]);

// Send message
const sendMessage = () => {
  if (newMessage.trim() === "") return;

  if (!socket) {
    console.error("Socket not initialized, retrying...");
    setTimeout(sendMessage, 1000); // Retry in 1 second
    return;
  }

  const messageData = {
    senderId: userId,
    receiverId: techId,
    message: newMessage,
  };

  socket.emit("send_message", messageData);

  setMessages((prevMessages) => [...prevMessages, newMessage]);
  setNewMessage(""); // Clear input
};


  // Scroll to the bottom of messages when a new message is received
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


const handleLoginLogout=async()=>{
                if(userId){
                    localStorage.removeItem('userId')
                    await persistor.purge()
                    navigate('/')
                }else{
                    navigate('/login')
                }
            }
  

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <NavLink to="/" className="text-lg font-semibold text-sky-600 hover:underline">🏠 Home</NavLink>
          <button
            onClick={handleLoginLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Logout
          </button>
        </div>
      

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Details */}
        <div className="col-span-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Technician Profile</h2>
          <div className="bg-white p-6 rounded flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Left side - details */}
            <div className="flex-1 space-y-3 text-base">
              <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
              <p><strong>Name:</strong> {technician.technicianname}</p>
              <p><strong>PhoneNumber:</strong> {technician.techphone}</p>
              <p><strong>Address:</strong> {technician.workaddress}</p>
              <p><strong>Map url:</strong> {technician.locationUrl}</p>
              <p><strong>Service Category:</strong> {technician.Category}</p>
              <p><strong>Consultation Fee:</strong> ₹{technician.consultationFee}</p>
              <p><strong>Rate per Hour:</strong> ₹ {technician.rateperhour} / hr</p>
              <p><strong>Service Districts:</strong> {technician.pincode}</p>
            </div>

            {/* Right side - profile image */}
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border-2 border-gray-300">
              <img
                src={technician.techimage}
                alt="Technician Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          </div>
          <div className="col-span-6 md:col-span-3 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Chat with {technician.technicianname}</h3>

          <div className="space-y-4 h-80 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${userId === technician._id ? 'justify-end' : ''}`}>
                <div className="bg-gray-100 p-3 rounded-lg max-w-xs">{msg}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="border border-gray-300 p-2 rounded-md flex-grow"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
        </div>

        {/* Work Photos */}
        {/* <div className="col-span-1 md:col-span-2">
          <div className="flex justify-center mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>handleBook(techid)}>
              Book Technician
            </button>
          </div>
        </div> */}
      

   
    </div>
  );
};

export default ViewBookingsProfile;
