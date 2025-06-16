import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import toast from "react-hot-toast";
import { uploadImageToCloudinary } from "../../../utils/cloudinaryUpload"; // <-- Make sure this exists

import { useDispatch } from "react-redux";

import { cleartoken } from "../../../features/AdmintokenSlice";
import { logoutadmin } from "../../../features/AdminSlice";
import logo from '../../../../public/images/Resized/Logo Landscape.png'
interface Category {
  name: string;
  description: string;
  image: string;
}

const EditCategory: React.FC = () => {
  const { catid } = useParams<{ catid: string }>();
  const adminId=localStorage.getItem('adminId')


  const [formData, setFormData] = useState<Category>({
    name: "",
    description: "",
    image: ""
  });
  const navigate=useNavigate()
    const dispatch=useDispatch()
  
    const handleLogOut=async()=>{
      if(adminId){
        localStorage.removeItem('adminId')
        
      localStorage.removeItem('persist:admin');
      localStorage.removeItem('admintoken');
  
      dispatch(logoutadmin());
      dispatch(cleartoken());
        // await persistor.purge()
        navigate('/admin')
      }else{
        navigate('/admin/admindashboard')
      }
    }

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!catid) return;
      try {
        const res = await axiosInstanceadmin.get(`/api/category/${catid}`);
        setFormData(res.data.category);
      } catch (error) {
        toast.error("Failed to load category data");
      }
    };

    fetchCategory();
  }, [catid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!catid) return;
    setLoading(true);
    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const uploaded = await uploadImageToCloudinary(imageFile);
        if (!uploaded) {
          toast.error("Image upload failed");
          setLoading(false);
          return;
        }
        imageUrl = uploaded;
      }

      await axiosInstanceadmin.patch(`/api/editcategory/${catid}`, {
        name: formData.name.trim().toLowerCase(),
        description: formData.description.trim(),
        image: imageUrl
      });

      toast.success("Category updated successfully");
      navigate("/admin/admindashboard");
    } catch (error:any) {
      console.error(error);
      const errormessage=error.response.data.message||"Update Failed";

      toast.error(errormessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <div className="bg-[#8EB69B] text-white flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="HomePro Logo" className="h-10" />
      </div>
      <button
        type="button"
        onClick={handleLogOut}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white"
      >
        {adminId ? "LogOut" : "LogIn"}
      </button>
    </div>
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
        
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        placeholder="Name"
      />

      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        placeholder="Description"
      />

      {formData.image && !imageFile && (
        <img src={formData.image} alt="Current" className="mb-4 w-full h-48 object-cover rounded" />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="w-full border p-2 mb-4 rounded"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
    </>
  );
};

export default EditCategory;
