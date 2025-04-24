import React, { useState } from "react";
import { Dialog,DialogPanel,DialogTitle } from "@headlessui/react";
import axiosInstanceadmin from "../../axios";
import toast from "react-hot-toast";
import { uploadImageToCloudinary } from "../../lib/cloudinaryUpload";


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
        if (!addcat.name) newErrors.name = "Name is required";
        if (!addcat.description) newErrors.description = "Description is required";
        if (!imageFile) newErrors.image = "Image is required";
        
        seterror(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        let imageurl="";

        if(imageFile){
            const uploadurl=await uploadImageToCloudinary(imageFile)
            if(!uploadurl) return
            imageurl=uploadurl
        }
        try {
            await axiosInstanceadmin.post('/addcategory',{
                ...addcat,
                image:imageurl
            })
            toast.success("Category added successfully!");
            setIsOpen(false);
            setaddcat({ name: "", description: "", image: "" });
            setImageFile(null);
          } catch (err) {
            console.error(err);
            toast.error("Failed to add category.");
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
                            placeholder="Email ID"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                         {error.name && <p className="text-red-500 text-center text-sm">{error.name}</p>}
                        <input
                            name="description"
                            value={addcat.description}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                         {error.description && <p className="text-red-500 text-center text-sm">{error.description}</p>}
                        
                        <input
                            name="file"
                            type="file"
                            accept="'image/*"
                          
                            onChange={(e)=>setImageFile(e.target.files?.[0]||null)}
                            placeholder="Password"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                        />
                        
                        
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