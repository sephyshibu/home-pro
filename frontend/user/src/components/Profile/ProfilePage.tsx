import React, { useEffect, useState } from "react"
import axiosInstanceuser from "../../axios"
import { useNavigate } from "react-router"
import {Dialog,DialogPanel,DialogTitle} from '@headlessui/react'
interface User{
  name:string,
  email:string,
  phone?:string
}


const ProfilePage: React.FC = () => {

  const [user, setUser] = useState<User>({
    email: '',
    name: '',
    phone: ''
  });

  const [isOpen, setIsOpen] = useState(false); // Modal open/close state
  const [editData, setEditData] = useState<User>({email: "", name: "", phone: "" });
  const userId=localStorage.getItem('userId')
  const navigate=useNavigate()


  useEffect(()=>{
    const fetchparticularuser=async(userId:string|null)=>{
      if(!userId){
        navigate('/login')
        return
      }
      try {
        const response= await axiosInstanceuser.get(`/fetchinguser/${userId}`);
        setUser(response.data.user)
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
     
    }
    fetchparticularuser(userId)
  },[navigate,userId])

  const openModal = () => {
    setEditData(user); // Copy current user data into editData
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstanceuser.put(`/updateuser/${userId}`, editData);
      setUser(editData); // Update the local state with new data
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };


    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">My Profile</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email ID</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            value={user.phone || ""}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg"
          onClick={openModal}
        >
          Edit Details
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-bold mb-4">Edit Profile</DialogTitle>

            <div className="space-y-4">
              <input
                name="name"
                value={editData.name}
                onChange={handleChange}
                placeholder="Username"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              <input
                name="email"
                value={editData.email}
                onChange={handleChange}
                placeholder="Email ID"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              <input
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfilePage;