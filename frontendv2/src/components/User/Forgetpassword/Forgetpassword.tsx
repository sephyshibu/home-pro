import React, { useState } from "react";
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import logo from '../../../../public/images/Resized/Logo Landscape white-01-01.png'
const ForgetPassword: React.FC = () => {

    interface foregtform{
        email:string
    }
    const navigate=useNavigate()

    const [formdata,setformdata]=useState<foregtform>({
        email:""
    })
    const[loading,setloading]=useState(false)
    const[error,seterror]=useState<Partial<foregtform>>({})

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setformdata((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit=async(e:React.FormEvent)=>{
            e.preventDefault()
            seterror({})
            setloading(true)
    
            let formErrors:any={}
            let isValid=true
    
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!formdata.email) {
                formErrors.email = 'Email is required.';
                isValid = false;
            } else if (!emailPattern.test(formdata.email)) {
                formErrors.email = 'Please enter a valid email address.';
                isValid = false;
            }

            seterror(formErrors)

            if (!isValid) {
                return
             }

             
             try {

                const{email}=formdata
                const response=await axiosInstanceuser.post('/checkemail',{email})
                navigate('/forgetpassotp',{state:{details:formdata}})
                console.log(response?.data?.message)
            
            } catch (error:any) {
              if(error.response.data.message=="email not found"){
                toast.error("email not found")
              }
                console.error("signup errror",error)
                seterror(error.response?.data?.message ||"Something went wrong")   
            }
            finally {
                setloading(false);
              }
            }
    
    
  return (
    <div className="min-h-screen bg-[#0A1D56] flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-6xl bg-[#0A1D56] flex flex-col md:flex-row items-center justify-center gap-8">
        
        
        <div className="absolute -top-10 flex flex-col items-center z-10">
          <img src={logo} alt="HomePro Logo" className="w-80 h-39 mt-34" />
         
        </div>
  
         

          {/* Center Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-center text-2xl font-bold mb-6 text-[#0A1D56]">RECOVER YOUR ACCOUNT</h2>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formdata.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1D56]"
              />
               {error.email && <p className="text-red-500 text-center text-sm">{error.email}</p>}
              
              <button
                type="submit"
                
                className="w-full bg-[#00B4D8] hover:bg-[#0096C7] text-white font-bold py-3 rounded-md transition"
              >
                Send OTP
              </button>
            </form>
          </div>

          
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A1D56] text-white text-xs flex flex-col md:flex-row justify-between items-center px-6 py-4">
        <p>© 2025 HomePro</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Shipping</a>
          <a href="#" className="hover:underline">Contact Us</a>
          <a href="#" className="hover:underline">Return & Exchange Policy</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};


export default ForgetPassword;
