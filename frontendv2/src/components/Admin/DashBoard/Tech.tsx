import React, { useState } from "react";
import { Dialog,DialogPanel,DialogTitle } from "@headlessui/react";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import toast from "react-hot-toast";

interface AddTechForm{
    email:string, 
    password:string,
    phone :string
}


const Tech:React.FC=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const[error,seterror]=useState<Partial<AddTechForm>>({})
    const[techData,settechdata]=useState<AddTechForm>({
        email:"",
        password:"",
        phone:""
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        settechdata((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()

        let formErrors:any={}
        let isValid=true 

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(!techData.email){
            formErrors.email="Email is required"
            isValid=false
        }else if(!emailPattern.test(techData.email)){
            formErrors.email="Please enter valid email"
            isValid=false
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
        if (!techData.password) {
            formErrors.password = 'Password is required.';
            isValid = false;
        } else if (!passwordPattern.test(techData.password)) {
            formErrors.password = 'Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, and one special character.';
            isValid = false;
        }

        if (!techData.phone) {
            formErrors.phone = 'Phone number is required.';
            isValid = false;
        } else if (!/^\d{10}$/.test(techData.phone)) {
            formErrors.phone = 'Phone number must be exactly 10 digits.';
            isValid = false;
        }

        seterror(formErrors);
        
        // If any validation fails, return early
        if (!isValid) {
           return
        }

        try {
            const response= await axiosInstanceadmin.post('/addtech',techData)
            toast.success(response.data.message)
            settechdata({ email: "", password: "", phone: "" }); // clear form even on error
            setIsOpen(false)


        } catch (error:any) {
            if (error.response?.data?.message === "email already existed") {
                toast.error("This email is already registered.");
              } else {
                toast.error("Something went wrong. Try again.");
              }
              settechdata({ email: "", password: "", phone: "" }); // clear form even on error
        }
    }





    return(
        <div className="p-6">
            <button onClick={()=>setIsOpen(true)} className="bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md">
                Add New Technician
            </button>

            <Dialog open={isOpen} onClose={()=>setIsOpen(false)}  className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                    <DialogTitle className="text-lg font-bold">Add Technician</DialogTitle>
                    <div className="mt-4 space-y-3">
                    <input
                        name="email"
                        value={techData.email}
                        onChange={handleChange}
                        placeholder="Email ID"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                     {error.email && <p className="text-red-500 text-center text-sm">{error.email}</p>}
                    <input
                        name="phone"
                        value={techData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                     {error.phone && <p className="text-red-500 text-center text-sm">{error.phone}</p>}
                    
                    <input
                        name="password"
                        type="password"
                        value={techData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                    {error.password && <p className="text-red-500 text-center text-sm">{error.password}</p>}
                    
                    <button
                        onClick={handleSubmit}
                        className="mt-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 px-4 rounded-md"
                    >
                        Add Technician
                    </button>
                    </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )





}
export default Tech