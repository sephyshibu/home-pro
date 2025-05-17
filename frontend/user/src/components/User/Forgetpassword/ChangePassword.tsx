import React, { useState } from "react";
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { useNavigate,useLocation } from "react-router";

import logo from '../../../../public/images/Resized/Logo Landscape white-01-01.png'
interface ChangePasswordform{
    
    password:string,
    confirmpassword:string,
    
    

}


const ChangePassword:React.FC=()=>{
    const[formdata,setformdata]=useState<ChangePasswordform>({
        
        password:"",
        confirmpassword:"",
       
    })
    const location=useLocation()
    const[loading,setloading]=useState(false)
    const[error,seterror]=useState<Partial<ChangePasswordform>>({})
    const navigate=useNavigate()
    const email=location.state.details

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
            const{password}=formdata
            const response=await axiosInstanceuser.post('/chnagepasswords',{password,email})
      
            navigate('/login')
            console.log(response?.data?.message)
            
        } catch (error:any) {
            console.error("signup errror",error)
            seterror(error.response?.data?.message ||"Something went wrong")   
        }
        finally {
            setloading(false);
          }


    }

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A1D56] relative overflow-hidden px-4">
      
        {/* Logo and header */}
        <div className="absolute -top-10 flex flex-col items-center z-10">
          <img src={logo} alt="HomePro Logo" className="w-80 h-39 mt-34" />
         
        </div>
        {/* Main Content */}
        <div className="flex items-center justify-center gap-8 mt-32">
          
         
  
          {/* Center Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-20 max-w-full">
            <h2 className="text-2xl font-bold text-center text-[#0A1D56] mb-6">USER SIGNUP</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Left Side Image */}
          
              
              <input
                type="password"
                name="password"
                placeholder="Enter password"
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
  
        {/* Footer */}
        <div className="absolute bottom-0 mb-4 flex flex-col items-center text-white text-xs">
          <p>© 2025 HomePro</p>
        </div>
      </div>
    )
}
export default ChangePassword