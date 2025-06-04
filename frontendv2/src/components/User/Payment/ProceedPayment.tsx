import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router";
import { fetchTechById } from "../../../api/UserApi/fetchtechbyid";
import { fetchaddress } from "../../../api/UserApi/Address/fetchaddress";
import { addaddress } from "../../../api/UserApi/Address/addaddress";
import { Dialog,DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { MapContainer,TileLayer,Marker,useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import GeoSearch from './GeoSearch'

import "leaflet-control-geocoder"
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import {persistor} from '../../../app/store'


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
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
 
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
    const [searchParams] = useSearchParams();

    const techid = searchParams.get('techid');
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const categoryId = searchParams.get('categoryId');
    const pincode = searchParams.get('pincode');
    const bookingdetails = { date, time, categoryId, pincode };

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

      
      const handleLoginLogout=async()=>{
                if(userId){
                    localStorage.removeItem('userId')
                    await persistor.purge()
                    navigate('/')
                }else{
                    navigate('/login')
                }
            }

      const validateForm = () => {
        const newErrors: Partial<typeof form> = {};
        const onlyNumbers = /^\d+$/;
        const onlySpecialChars = /^[^\w\s]+$/;
      
        const validateField = (key: keyof typeof form, label: string) => {
          const value = form[key].trim();
      
          if (!value) {
            newErrors[key] = `${label} is required`;
          } else if (onlyNumbers.test(value)) {
            newErrors[key] = `${label} cannot be only numbers`;
          } else if (onlySpecialChars.test(value)) {
            newErrors[key] = `${label} cannot be only special characters`;
          }
        };
      
        if (!form.types) newErrors.types = "Type is required";
        validateField("addressname", "Address name");
        validateField("street", "Street");
        validateField("city", "City");
        validateField("state", "State");
        validateField("country", "Country");
      
        if (!form.pincode.trim()) {
          newErrors.pincode = "PIN code is required";
        } else if (!/^\d{6}$/.test(form.pincode)) {
          newErrors.pincode = "PIN code must be exactly 6 digits";
        }
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
    const handleAddAddress = async () => {
        if (!userId) return;
       if(!validateForm()) return
        try {
          await addaddress(userId, form);
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
        if(selectedMethod==="RazorPay"){
            try{

                  const checkRes = await axiosInstanceuser.get("/api/payment-status-check", {
                    params: {
                      userId,
                      techid,
                      date: bookingdetails.date,
                    },
                  });

                  const paymentStatus = checkRes.data.status;

                  if (paymentStatus === "completed") {
                    toast.error("Payment already completed for this booking.");
                    return;
                  } else if (paymentStatus === "pending") {
                    toast.error("Payment already in progress for this booking.");
                    return;
                  }
              
              const res= await axiosInstanceuser.post(`/api/create-order/${userId}`,{
                  amount:technician.consulationFee
              })
              const options = {
                  key: "rzp_test_qp0MD1b9oAJB0i",
                  amount: res.data.amount,
                  currency: "INR",
                  name: "HomePro",
                  order_id: res.data.id,
                  handler: async (response:any) => {
                    try{
                    await axiosInstanceuser.post("/api/confirm-payment", {
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
                  }
                  catch (error: any) {
                  const message = error?.response?.data?.message;
                  if (message === "Payment already completed for this booking.") {
                    toast.error(message);
                  } else if (message === "Payment already in progress for this booking.") {
                    toast.error(message);
                  } else {
                    toast.error("Something went wrong. Please try again.");
                  }
                  }
                    
                  },
                  prefill: {
                    name: "admin HonePro",
                    email: "admin@example.com",
                    contact: "9999999999",
                  },
                  modal: {
                    ondismiss: function () {
                      toast("Payment window closed.");
                      // Optional: redirect or just stay on the page
                      navigate('/myaccount/services'); // Or show retry options
                    }
                  }
                };
              
                const rzp = new window.Razorpay(options);
                rzp.open();
                // Add payment failed handler
          rzp.on("payment.failed", async (response: any) => {
            await axiosInstanceuser.post("/api/payment-failed", {
              userId,
              techid,
              addressId: selectedAddressId,
              location: selectedLocation,
              date: bookingdetails.date,
              rateperhour: technician.rateperhour, // ✅ add this line
              amount: technician.consulationFee,
              error: response.error,
            });

            toast.error("Payment failed. Please try again.");
            // ✅ Wrap in setTimeout to ensure reliable navigation
            setTimeout(() => {
              navigate('/myaccount/services');
            }, 0);
          });

          
          } catch (error: any) {
          const message = error?.response?.data?.message;
          if (message === "Payment already completed for this booking.") {
            toast.error(message);
          } else if (message === "Payment already in progress for this booking.") {
            toast.error(message);
          } else {
            toast.error("Something went wrong. Please try again.");
          }
          }
        }else{
          if (selectedMethod=="Wallet"){
            try {
                if(!userId) return 
                    const checkRes = await axiosInstanceuser.get("/api/payment-status-check", {
                    params: {
                      userId,
                      techid,
                      date: bookingdetails.date,
                    },
                  });

                  const paymentStatus = checkRes.data.status;

                  if (paymentStatus === "completed") {
                    toast.error("Payment already completed for this booking.");
                    return;
                  } else if (paymentStatus === "pending") {
                    toast.error("Payment already in progress for this booking.");
                    return;
                  }
                    const res= await axiosInstanceuser.post("/api/walletpayment",{
                        userId,
                        techid,
                        addressId:selectedAddressId,
                        location:selectedLocation,
                        date:bookingdetails.date,
                        rateperhour:technician.rateperhour,
                        amount:technician.consulationFee
                      }
              
                      )
                      toast.success(res.data.message)
                      navigate('/myaccount/services')
                }
              catch (error:any) {
              toast.error(error.response.data.message);
              console.error(error);
            }
          }
        }
          

    }
      
  return (
    <div className="min-h-screen bg-gray-100">
    
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <NavLink to="/" className="text-lg font-semibold text-sky-600 hover:underline">🏠 Home</NavLink>
          <button
            onClick={handleLoginLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Logout
          </button>
        </div>
      

      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Section */}
        <div className="bg-white p-6 rounded shadow col-span-1">
          <h2 className="text-xl font-bold mb-4">Payment</h2>

          <div className="space-y-2">
            <label className="font-medium block">Pay With:</label>
            <div className="flex gap-4">
              {[ "RazorPay","Wallet"].map((method) => (
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
      <MapContainer center={[10.8505, 76.2711]} zoom={13} className="h-full w-full rounded">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* GeoSearch input bar */}
        <GeoSearch />

        {/* Optional location selector */}
        <LocationSelector setLocation={setSelectedLocation} />

        {/* Marker for selected location */}
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
                {errors.types && <p className="text-red-500 text-sm">{errors.types}</p>}

                <input name="addressname" value={form.addressname} onChange={handleChange} placeholder="Address name" className="w-full border px-3 py-2 rounded" />
                {errors.addressname && <p className="text-red-500 text-sm">{errors.addressname}</p>}
                <input name="street" value={form.street} onChange={handleChange} placeholder="Street" className="w-full border px-3 py-2 rounded" />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full border px-3 py-2 rounded" />
                
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="w-full border px-3 py-2 rounded" />
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                
                <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="w-full border px-3 py-2 rounded" />
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                
                <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="PIN Code" className="w-full border px-3 py-2 rounded" />
                {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                
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
