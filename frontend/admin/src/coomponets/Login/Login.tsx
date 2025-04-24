import React, { useState } from "react";
import axiosInstanceadmin from "../../axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addtoken } from "../../features/tokenSlice";
import logo from '../../../public/images/Logo Landscape.png'
import one from '../../../public/images/one.png'
import two from '../../../public/images/two.png'
interface LoginForm{
    email:string,
    password:string
}


const Login:React.FC=()=>{
    const[formdata,setformdata]=useState<LoginForm>({
        email:"",
        password:""
    })
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const [loading, setloading]=useState(false);
    const[error,seterror]=useState<string |null>(null)


    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setformdata((prev)=>
           ( {...prev,[e.target.name]:e.target.value}))

    }


    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        seterror(null)
        setloading(true)

        if(!formdata.email && !formdata.password){
            seterror("email and password is required")
            return
        }

        if(!formdata.email){
            seterror("Email is required")
            return
        }
        if(!formdata.password){
            seterror("password is required")
            return
        }
        
        try {
            const{email,password}=formdata
            const response=await axiosInstanceadmin.post('/login',{email,password})
            console.log("response", response)
            dispatch(addtoken({token:response.data.token}))
            console.log(response)
            console.log("login data",response.data)
            const adminId=response.data.admin._id
            localStorage.setItem("adminId",adminId)
            seterror('');
            navigate('/admindashboard');
      


        } catch (error:any) {
            console.error("login errror",error)
            seterror(error.response?.data?.message ||"Something went wrong")   
        }
        finally {
            setloading(false);
          }
    }



    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A1D56] relative overflow-hidden px-4">
      
        {/* Logo and header */}
        <div className="absolute top-10 flex flex-col items-center">
          {/* <img src={logo} alt="HomePro Logo" className="w-50 h-32 mt-60" /> */}
         
        </div>
  
        {/* Main Content */}
        <div className="flex items-center justify-center gap-8 mt-32">
          
          {/* Left Side Image */}
          <div className="hidden lg:block w-80 h-90">
            <img 
              src={one} 
              alt="Worker fixing door" 
              className="rounded-lg shadow-lg object-cover h-full w-full scale-150 -translate-x-20"
            />
          </div>
  
          {/* Center Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-20 max-w-full">
            <h2 className="text-2xl font-bold text-center text-[#0A1D56] mb-6">Admin LOGIN</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                name="email"
                placeholder="Enter Username"
                value={formdata.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formdata.password}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A9FF]"
              />
  
              {error && <p className="text-red-500 text-center text-sm">{error}</p>}
  
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00A9FF] hover:bg-[#008BD1] text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105"
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>

              
              
            </form>
          </div>
  
          {/* Right Side Image */}
          <div className="hidden lg:block w-80 h-180">
            <img 
              src={two}
              alt="Worker fixing sink" 
              className="rounded-lg shadow-lg object-cover w-full h-full scale-150 translate-x-20"
            />
          </div>
        </div>
  
        {/* Footer */}
        <div className="absolute bottom-0 mb-4 flex flex-col items-center text-white text-xs">
          <p>© 2025 HomePro</p>
        </div>
      </div>
    );
  };

export default Login

