import React, { useEffect, useState } from "react";
import {Pencil, Trash2 } from "lucide-react";
import { useLocation } from "react-router";
import { fetchTechById } from "../../api/fetchtechbyid";
import { fetchaddress } from "../../api/Address/fetchaddress";
import { addaddress } from "../../api/Address/addaddress";
import { Dialog,DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { MapContainer,TileLayer,Marker,useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router";
import axiosInstanceuser from "../../axios";


interface Address {
    _id: string;
    types: string;
    addressname: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  }


interface Technician{
    _id:string
    name:string,
    email:string,
    phone:string,
    serviceablepincode:string[],
    rateperhour:number,
    noofworks:number,
    profileimgurl:string,
    consulationFee:number,
    categoryid:{
      _id:string,
      name:string,
      description:string
    }
  }
  
const PaymentPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState("RazorPay");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const location=useLocation()
  const navigate=useNavigate()
  const userId=localStorage.getItem("userId")
  const[technician,settechnician]=useState<Technician>({
      _id:'',
      name: '',
      email: '',
      phone: '',
      rateperhour: 0,
      serviceablepincode: [],
      noofworks: 0,
      profileimgurl: '',
      consulationFee: 0,
      categoryid:{
        _id:"",
        name:"",
        description:""
      }
    })

    const [form, setForm] = useState({
        types: "",
        addressname: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      });
    const{techid,bookingdetails}=location.state||{}
    console.log("booking details",bookingdetails)
    if(!techid|| !bookingdetails){
        return <div className="text-center py-20">Missing details</div>
    }

    useEffect(()=>{
        const fetchtech=async()=>{
          try {
            const response=await fetchTechById(techid)
            settechnician(response)
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
    
        }
        fetchtech()
    
      },[])


      useEffect(() => {
        const getAddresses = async () => {
          if (!userId) return;
          try {
            const res = await fetchaddress(userId);
            setAddresses(res);
          } catch (error) {
            console.error("Error fetching addresses", error);
          }
        };
        getAddresses();
      }, []);
      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      
    const handleAddAddress = async () => {
        if (!userId) return;
      
        try {
          const res = await addaddress(userId, form);
          toast.success("Address added successfully");
          setIsModalOpen(false);
          setForm({
            types: "",
            addressname: "",
            street: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
          });
      
          // Re-fetch addresses
          const updated = await fetchaddress(userId);
          setAddresses(updated);
        } catch (error) {
          toast.error("Error adding address");
          console.error(error);
        }
      };
    const LocationSelector = ({ setLocation }: { setLocation: (coords: { lat: number, lng: number }) => void }) => {
        useMapEvents({
          click(e) {
            setLocation(e.latlng);
          },
        });
        return null;
      };
    const handlePayment=async()=>{
        if (!selectedLocation || !selectedMethod || !selectedAddressId) {
            toast.error("Please select all required fields");
            return;
        }
        const res= await axiosInstanceuser.post(`/create-order/${userId}`,{
            amount:technician.consulationFee
        })
        const options = {
            key: "rzp_test_qp0MD1b9oAJB0i",
            amount: res.data.amount,
            currency: "INR",
            name: "HomePro",
            order_id: res.data.id,
            handler: async (response:any) => {
              await axiosInstanceuser.post("/confirm-payment", {
                userId,
                techid,
                addressId: selectedAddressId,
                location: selectedLocation,
                date: bookingdetails.date,
                amount: technician.consulationFee,
                razorpay_payment_id: response.razorpay_payment_id,
              });
              toast.success("Payment successful!");
              navigate('/thankyou')
              
            },
            prefill: {
              name: "admin HonePro",
              email: "admin@example.com",
              contact: "9999999999",
            },
          };
        
          const rzp = new window.Razorpay(options);
          rzp.open();

    }
      
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">HomePro</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Services</a>
          <a href="#" className="hover:underline">Contact</a>
          <button className="bg-white text-blue-900 px-4 py-1 rounded">My Profile</button>
        </div>
      </nav>

      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Section */}
        <div className="bg-white p-6 rounded shadow col-span-1">
          <h2 className="text-xl font-bold mb-4">Payment</h2>

          <div className="space-y-2">
            <label className="font-medium block">Pay With:</label>
            <div className="flex gap-4">
              {[ "RazorPay", "Wallet"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={selectedMethod === method}
                    onChange={() => setSelectedMethod(method)}
                  />
                  {method}
                </label>
              ))}
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white py-2 w-full rounded">
              Payment
            </button>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white p-6 rounded shadow col-span-1 space-y-4">
          <h2 className="text-xl font-bold">Order Details</h2>
          <div className="space-y-1">
            <p><span className="font-medium">Name:</span>{technician.name}</p>
            <p><span className="font-medium">Phone Number:</span>{technician.phone}</p>
            <p><span className="font-medium">Consultation Fee:</span> ₹ {technician.consulationFee}</p>
            <p><span className="font-medium">Rate per Hour:</span> ₹ {technician.rateperhour} / hr</p>
          </div>
          <div className="space-y-1">
            <p><span className="font-medium">Total Payment Amount:</span> ₹ {technician.consulationFee}</p>
            <p><span className="font-medium">Scheduled Date:</span>{bookingdetails.date}</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded" onClick={handlePayment}>
            Proceed to Payment
          </button>
        </div>

        {/* Saved Address Section */}
        <div className="bg-white p-6 rounded shadow col-span-1 space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Select Address</h2>
            <button onClick={() => setIsModalOpen(true)} className="text-blue-600 underline">+ Add New</button>
        </div>
        {addresses.length > 0 ? (
  addresses.map((addr) => (
    <div
      key={addr._id}
      className={`border rounded p-3 cursor-pointer ${
        selectedAddressId === addr._id ? "bg-blue-100 border-blue-600" : "bg-gray-100"
      }`}
      onClick={() => setSelectedAddressId(addr._id)}
    >
      <p className="font-semibold">{addr.types} - {addr.addressname}</p>
      <p>{addr.street}, {addr.city}, {addr.state}, {addr.country} - {addr.pincode}</p>
    </div>
    ))
    ) : (
    <p className="text-sm text-gray-500">No addresses found.</p>
    )}

        </div>
      </div>
      <div className="h-64 mt-4">
      <MapContainer center={[10.8505, 76.2711]} zoom={10} className="h-full w-full rounded">
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector setLocation={setSelectedLocation} />
            {selectedLocation && <Marker position={selectedLocation} />}
        </MapContainer>
        {selectedLocation && (
            <p className="text-sm mt-2">Selected Location: {selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)}</p>
        )}
        </div>


      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-[999]">
        <div className="fixed inset-0 bg-black/30 z-[999]" aria-hidden="true" />
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto">
            <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl  z-[1001]">
            <DialogTitle className="text-lg font-bold mb-4">Add New Address</DialogTitle>
            <div className="space-y-3">
                <select name="types" value={form.types} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option value="">Select Type</option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                </select>
                <input name="addressname" value={form.addressname} onChange={handleChange} placeholder="Address name" className="w-full border px-3 py-2 rounded" />
                <input name="street" value={form.street} onChange={handleChange} placeholder="Street" className="w-full border px-3 py-2 rounded" />
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full border px-3 py-2 rounded" />
                <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="w-full border px-3 py-2 rounded" />
                <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="w-full border px-3 py-2 rounded" />
                <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="PIN Code" className="w-full border px-3 py-2 rounded" />
                <button onClick={handleAddAddress} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                Save Address
                </button>
            </div>
            </DialogPanel>
        </div>
        </Dialog>


      {/* Footer */}
      <footer className="bg-blue-900 text-white mt-10 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold">HomePro</div>
          <div className="flex gap-4 text-sm mt-2 md:mt-0">
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
        <p className="text-center text-xs mt-4">© 2025 HomePro</p>
      </footer>
    </div>
  );
};

export default PaymentPage;
