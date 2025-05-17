import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { fetchaddress } from "../../../api/UserApi/Address/fetchaddress";
import { addaddress } from "../../../api/UserApi/Address/addaddress";
import { useNavigate } from "react-router";
import { Dialog,DialogPanel,DialogTitle } from "@headlessui/react";
import { editAddress } from "../../../api/UserApi/Address/editAddress";
import { deleteAddress } from "../../../api/UserApi/Address/deleteaddress";
import toast from "react-hot-toast";
interface Address {
  _id: string;
  types: string;
  addressname : string,
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

const AddressPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      _id: "",
      types: "",
      addressname:"",
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    
  ]);
  const userId=localStorage.getItem('userId')
  const[isOpen,setisopen]=useState(false)
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [form, setForm] = useState({
    types:"",
    addressname:"",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });
 
  const navigate=useNavigate()
  useEffect(()=>{
    const fetchaddressvalues=async()=>{
      if(!userId){
        navigate('/login')
        return
      }
      try {
      const adressdetails=await fetchaddress(userId)
      setAddresses(adressdetails)
    } catch (error) {
      console.error("Error fetching address:", error);
    }
    }
    fetchaddressvalues()
  },[])
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


  const handleedit=async(address:Address)=>{
   
    setSelectedAddress(address)
    console.log("fontend",address)
    setisopen(true)
    setEditMode(true)
    setForm({
      types: address.types,
      addressname: address.addressname,
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
    });


  }

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    const{name,value}=e.target
    setForm(prev =>({
      ...prev,
      [name]:value
    }))
  }
  

  const handleAdd = async() => {
 
    if(!userId){
      navigate('/login')
      return
    }
       if (!validateForm()) return;
    try {
      const newaddress=await addaddress(userId,form)
      setForm({
        types:"",
        addressname:"",
        street:"",
        city: "",
        state: "",
        country: "",
        pincode: "",
      })
      toast.success(newaddress.message)
    } catch (error: any) {
      toast.error(error.message); // clean and direct
  }
  };
  
  
  const handleSave=async()=>{
    if(!userId){
      return navigate('/login')
    }   
    if (!validateForm()) return;

    if(editMode && selectedAddress){
      try {
        const editaddress=await editAddress(selectedAddress._id, form)
        const updatedAddresses = addresses.map((addr) =>
          addr._id === selectedAddress._id ? { ...addr, ...form } : addr
        );
        setAddresses(updatedAddresses)
        toast.success("Address updated successfully");
      setisopen(false);
      setEditMode(false);
      setSelectedAddress(null);
      setForm({
        types: "",
        addressname: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      });
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address");
    }
    }
    
    
    
  }
  const handleDelete = async (addressId: string) => {
    if (!userId) {
      return navigate('/login');
    }
    console.log(addressId)
    try {
      await deleteAddress(addressId); // API call
      const updatedAddresses = addresses.filter(addr => addr._id !== addressId);
      setAddresses(updatedAddresses);
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    

      <div className="flex flex-1">

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white rounded-bl-xl shadow-inner">
          <h2 className="text-2xl font-semibold mb-6">New Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="block mb-1 font-medium">Type</label>
            <select
                  name="types"
                  value={form.types}
                  onChange={handleSelect}
                  className="w-full rounded-md border px-4 py-2 text-sm"
            >
                <option value="">Select type</option>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
            </select>
            {errors.types && <p className="text-red-500 text-sm">{errors.types}</p>}
            <input
              name="addressname"
              value={form.addressname}
              onChange={handleChange}
              placeholder="Address name"
              className="border rounded px-4 py-2"
            />
            {errors.addressname && <p className="text-red-500 text-sm">{errors.addressname}</p>}
            <input
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder="Street Address"
              className="border rounded px-4 py-2"
            />
            {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City Name"
              className="border rounded px-4 py-2"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State Name"
              className="border rounded px-4 py-2"
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country Name"
              className="border rounded px-4 py-2"
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="PIN Code"
              className="border rounded px-4 py-2"
            />
            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
          </div>

          <button
            onClick={handleAdd}
            className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
          >
            Add Address
          </button>

          <h3 className="text-xl font-semibold mt-10 mb-4">Saved Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses && addresses.map((addr) => (
              <div key={addr._id} className="bg-gray-200 p-4 rounded shadow relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-blue-900">{addr.types}</span>
                  <div className="flex space-x-2">
                    <Pencil size={16} className="cursor-pointer text-gray-600 hover:text-black" onClick={()=>handleedit(addr)} />
                    <Trash2 size={16} className="cursor-pointer text-gray-600 hover:text-red-600" onClick={()=>handleDelete(addr._id)}/>
                  </div>
                </div>
                <p>{addr.addressname},</p>
                <p>{addr.street},</p>
                <p>{addr.city}</p>
                <p>{addr.state}</p>
                <p>{addr.country} - {addr.pincode}</p>
              </div>
            ))}
          </div>

          <Dialog open={isOpen} onClose={() => setisopen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <DialogTitle className="text-lg font-bold">{editMode ? "Edit Address" : "Add Address"}</DialogTitle>
              <div className="mt-4 space-y-3">
                <select name="types" value={form.types} onChange={handleSelect} className="w-full rounded-md border px-3 py-2 text-sm">
                  <option value="">Select type</option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                </select>
                {errors.types && <p className="text-red-500 text-sm">{errors.types}</p>}
                <input name="addressname" value={form.addressname} onChange={handleChange} placeholder="Address name" className="w-full rounded-md border px-3 py-2 text-sm" />
                {errors.addressname && <p className="text-red-500 text-sm">{errors.addressname}</p>}
                <input name="street" value={form.street} onChange={handleChange} placeholder="Street Address" className="w-full rounded-md border px-3 py-2 text-sm" />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full rounded-md border px-3 py-2 text-sm" />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="w-full rounded-md border px-3 py-2 text-sm" />
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="w-full rounded-md border px-3 py-2 text-sm" />
                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="PIN Code" className="w-full rounded-md border px-3 py-2 text-sm" />
                {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                <button onClick={handleSave} className="mt-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md">
                  {editMode ? "Update Address" : "Add Address"}
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        </main>
      </div>

      
      
    </div>
  );
};

export default AddressPage;
