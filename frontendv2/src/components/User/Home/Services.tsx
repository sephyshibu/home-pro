import React, { useEffect, useState } from 'react';
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { Dialog,DialogPanel,DialogTitle } from '@headlessui/react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast'
import { fetchTechnicianbasedonavailableSlot } from '../../../api/UserApi/fetchtechnician';
import { lookupKeralaPincode } from '../../../utils/lookedKeralapinocde';
interface Category{
  _id:string,
  name:string, 
  description:string,
  image:string
}

interface BookSlotForm{
  pincode:string,
  date:string,
  time:string
}

const Services: React.FC = () => {
  const navigate=useNavigate()
  const[isopen, setisOpen]=useState(false)
  const[error,seterror]=useState<Partial<BookSlotForm>>({})
  const [bokkslot, setisbpookslot]=useState<BookSlotForm>({
    pincode:"",
    date:"",
    time:""
  })
  const userId=localStorage.getItem("userId")
  const[categories,setcategories]=useState<Category[]>([])
  const[selectedcat, setselectedcat]=useState<string|null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  useEffect(()=>{
    const fetchcategory=async()=>{
      try {
        const response= await axiosInstanceuser.get('/fetchcategory')
        const categories=response.data.category.filter((cat:any)=>cat.isBlocked===false)
        setcategories(categories)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchcategory()
  },[])

  const handleClicked = (categoryId:string) =>{
   
    setselectedcat(categoryId)
    setisOpen(true);

  } 

  
  const toggleExpand = (id: string) => {
    setExpandedCard(prev => (prev === id ? null : id));
  };
  const validateKeralaPincode = async (pincode: string): Promise<boolean> => {
    try {
      const matched = lookupKeralaPincode(pincode);
      return matched.length > 0; // ✅ return true if match found
    } catch (error) {
      console.error('Error validating pincode:', error);
      return false;
    }
  };
  
    return (
        <section className="py-12 bg-gray-50">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold">Our Services</h3>
          <p className="text-gray-500 mt-2">All your home service needs in one place</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 px-6">
        {categories.map((category) => {
          const isExpanded = expandedCard === category._id;
          const shortDesc = category.description.slice(0, 80) + (category.description.length > 80 ? "..." : "");

          return (
            <div key={category._id} className="bg-white rounded-lg shadow-md p-4 text-center" onClick={()=>handleClicked(category._id)}>
              <img
                src={category.image}
                alt={category.name}
                className="rounded-md h-24 mx-auto mb-2 object-cover"
              />
              <h4 className='font-semibold'>{category.name}</h4>
              <p className='text-sm text-gray-500'>
                {isExpanded ? category.description : shortDesc}
              </p>
              {category.description.length > 80 && (
                <button
                  onClick={() => toggleExpand(category._id)}
                  className="text-blue-500 text-sm mt-2"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          );
        })}
        </div>
        <Dialog open={isopen} onClose={() => setisOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl space-y-4">
              <DialogTitle className="text-lg font-bold">Book Slot</DialogTitle>

              {/* Pincode Input */}
              <div>
                <label className="block text-sm font-medium">Pincode</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded"
                  value={bokkslot.pincode}
                  onChange={(e) => setisbpookslot({ ...bokkslot, pincode: e.target.value })}
                />
                {error.pincode && <p className="text-sm text-red-500">{error.pincode}</p>}
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border rounded"
                  value={bokkslot.date}
                  onChange={(e) => setisbpookslot({ ...bokkslot, date: e.target.value })}
                />
                {error.date && <p className="text-sm text-red-500">{error.date}</p>}
              </div>

              {/* Time Input */}
              <div>
                <label className="block text-sm font-medium">Time</label>
                <input
                  type="time"
                  className="w-full mt-1 p-2 border rounded"
                  value={bokkslot.time}
                  onChange={(e) => setisbpookslot({ ...bokkslot, time: e.target.value })}
                />
                {error.time && <p className="text-sm text-red-500">{error.time}</p>}
              </div>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                onClick={async () => {
                  const errs: Partial<BookSlotForm> = {};

                  if (!bokkslot.pincode) errs.pincode = "Pincode is required";
                  else {
                    const isValid = await validateKeralaPincode(bokkslot.pincode);

                    if (!isValid) errs.pincode = "Enter a valid Kerala pincode";
                  }

                  if (!bokkslot.date) errs.date = "Date is required";
                  if (!bokkslot.time) errs.time = "Time is required";

                  seterror(errs);

                  if (Object.keys(errs).length === 0) {
                    if(!userId)
                      {
                        toast.error("please login ")
                      }

                    if (selectedcat === null) {
                      toast.error("Category is not selected");
                      return;
                    }
                    try {
                      const technicians = await fetchTechnicianbasedonavailableSlot(
                        bokkslot.pincode,
                        bokkslot.date,
                        selectedcat // Make sure this is defined in your component state
                      );
                
                      if (technicians.length > 0) {
                        toast.success("Technicians found!");
                        setisOpen(false);
                        setisbpookslot({ pincode: "", date: "", time: "" });
                        seterror({});
                        navigate('/available-technicians', {
                          state: {
                            technicians,
                            date: bokkslot.date,
                            time: bokkslot.time,
                            categoryId: selectedcat,
                            pincode: bokkslot.pincode
                          }
                        });
                      } else {
                        toast.error("No technicians available for the selected date and pincode.");
                      }
                    } catch (error: any) {
                      toast.error(error.message || "Something went wrong.");
                    }
                  }
                }}
              >
                Search
              </button>
            </DialogPanel>
          </div>
        </Dialog>

        </section>
    )
  };
  
  export default Services;
  