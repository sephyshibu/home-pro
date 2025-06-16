import React, { useState } from "react";
import { Dialog,DialogPanel,DialogTitle } from "@headlessui/react";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import toast from "react-hot-toast";
import { uploadImageToCloudinary } from "../../../utils/cloudinaryUpload";


interface addCategoryForm{
    name:string, 
    description:string,
    image:string, 

}

const AddCategory:React.FC=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const[error,seterror]=useState<Partial<addCategoryForm>>({})
    const[addcat, setaddcat]=useState<addCategoryForm>({
        name:"",
        description:"",
        image:""
    })
    const [imageFile, setImageFile] = useState<File | null>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setaddcat({ ...addcat, [e.target.name]: e.target.value });
      };
    const handleSubmit=async()=>{
        const newErrors: Partial<addCategoryForm> = {};
        
        if (!imageFile) newErrors.image = "Image is required";
        const validTextRegex = /^[A-Za-z0-9\s]+$/;

        if (!addcat.name.trim()) {
          newErrors.name = "Name is required";
        } else if (!validTextRegex.test(addcat.name.trim())) {
          newErrors.name = "Name must contain only letters, numbers, and spaces";
        }
      
        if (!addcat.description.trim()) {
          newErrors.description = "Description is required";
        } else if (!validTextRegex.test(addcat.description.trim())) {
          newErrors.description = "Description must contain only letters, numbers, and spaces";
        }

        seterror(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        let imageurl="";

        if(imageFile){
            const uploadurl=await uploadImageToCloudinary(imageFile)
            if(!uploadurl) return
            imageurl=uploadurl
        }
        try {
            const sanitizedName = addcat.name.trim().toLowerCase();
            const sanitizedDescription = addcat.description.trim();
            const response=await axiosInstanceadmin.post('/api/addcategory',{
                name:sanitizedName,
                description:sanitizedDescription,
                image:imageurl
            })
            toast.success(response.data.message);
            setIsOpen(false);
            setaddcat({ name: "", description: "", image: "" });
            setImageFile(null);
          } catch (error:any) {
            console.error(error);
            if (error.response?.data?.message === "category already existed") {
                toast.error("This category already added.");
              } else {
                toast.error("Something went wrong. Try again.");
              }
            setaddcat({ name: "", description: "", image: "" });
            setImageFile(null);
         
          }
    }  
    
    return(
      
            <div className="p-6">
                <button onClick={()=>setIsOpen(true)} className="bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md">
                    Add New Category
                </button>
    
                <Dialog open={isOpen} onClose={()=>setIsOpen(false)}  className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    
                    
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <DialogTitle className="text-lg font-bold">Add Category</DialogTitle>
                        <div className="mt-4 space-y-3">
                        <input
                            name="name"
                            value={addcat.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                         {error.name && <p className="text-red-500 text-center text-sm">{error.name}</p>}
                        <input
                            name="description"
                            value={addcat.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                         {error.description && <p className="text-red-500 text-center text-sm">{error.description}</p>}
                        
                        <input
                            name="file"
                            type="file"
                            accept="image/*"
                          
                            onChange={(e)=>setImageFile(e.target.files?.[0]||null)}
                            placeholder="Password"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                        {error.image&& <p className="text-red-500 text-center text-sm">{error.image}</p>}
                        
                        
                        <button
                            onClick={handleSubmit}
                            className="mt-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md"
                        >
                            Add Category
                        </button>
                        </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
        )
}

export default AddCategory