import React, { useState } from "react";

import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Changepasswordapi } from "../../../api/UserApi/Changepassword/password";

interface ChangePasswordform{
    oldpassword:string,
    password:string,
    confirmpassword:string,
    
    

}


const ChangePasswords:React.FC=()=>{
    console.log("cdsihiwdhvi")
    const[formdata,setformdata]=useState<ChangePasswordform>({
        oldpassword:"",
        password:"",
        confirmpassword:"",
       
    })
    const userId=localStorage.getItem("userId")
    const[loading,setloading]=useState(false)
    const[error,seterror]=useState<Partial<ChangePasswordform>>({})
    const navigate=useNavigate()
    

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setformdata((prev)=>({
            ...prev,
            [e.target.name]: e.target.value

        }))
        
    }

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        seterror({})
        setloading(true)

        let formErrors:any={}
        let isValid=true

        
        // Password validation (at least 6 characters, one uppercase, one lowercase, one special character)
         const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
        if (!formdata.password) {
            formErrors.password = 'Password is required.';
            isValid = false;
        } else if (!passwordPattern.test(formdata.password)) {
            formErrors.password = 'Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, and one special character.';
            isValid = false;
        }
      // Confirm password validation
        if (formdata.confirmpassword !== formdata.password) {
            formErrors.confirmpassword = 'Passwords do not match.';
            isValid = false;
        }

        
        // If any validation fails, set error messages
        seterror(formErrors);

        // If any validation fails, return early
        if (!isValid) {
          setloading(false)
           return
        }

        try {
            const{password,oldpassword}=formdata

            if(!userId){
                console.log("dwfh  no uerId")
                navigate('/login')
                return
            }
            console.log(password)
            const result=await Changepasswordapi(userId,oldpassword,password)
      
         
            toast.success(result)
            
        } catch (error:any) {
            // Get clean error message
            const errorMessage =
              error.message ||
              error?.response?.data?.message ||
              "Something went wrong";

            toast.error(errorMessage); // show the message properly

            seterror(error.response?.data?.message ||"Something went wrong")   
        }
        finally {
            setloading(false);
          }


    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Password Change</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <form onSubmit={handleSubmit} className="space-y-5">

               <input
                type="password"
                name="oldpassword"
                placeholder="Enter old password"
                value={formdata.oldpassword}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]"
                />
          
              
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={formdata.password}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]"
                />
               

           
              {error.password && <p className="text-red-500 text-center text-sm">{error.password}</p>}
              <input
                type="password"
                name="confirmpassword"
                placeholder="Enter Confirmpassword"
                value={formdata.confirmpassword}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]"
              />
              {error.confirmpassword&& <p className="text-red-500 text-center text-sm">{error.confirmpassword}</p>}
              
  
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00A9FF] hover:bg-[#008BD1] text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105"
              >
                {loading ? "Changingg..." : "Change Password"}
              </button>
  
              
            </form>
          </div>
  
          
        </div>
        </div>
  
      
    )
}
export default ChangePasswords