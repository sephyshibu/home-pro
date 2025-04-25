import React, { useEffect, useState } from "react";
import axiosInstanceuser from "../../axios";
import { useNavigate,useLocation } from "react-router";

import logo from '../../../public/images/Resized/Logo Landscape white-01-01.png'

const Otp:React.FC=()=>{
    const[otp,setotp]=useState({otp:""})
    const[error,seterror]=useState('')
    const[msg,setmsg]=useState('')
    const[min,setmin]=useState(1)
    const[sec,setsec]=useState(0)
    const[timerActive,settimeractive]=useState(false)
    const navigate=useNavigate()
    const location=useLocation() 
    const details=location.state?.details
    console.log(details)

    useEffect(()=>{
        let interval:ReturnType<typeof setInterval> 
        if(min>0 ||sec>0){
            interval=setInterval(()=>{
                if(sec>0){
                    setsec((prev)=>prev-1)
                }else if(min>0){
                    setmin((prev)=>prev-1)
                    setsec(59)
                }
            },1000)
        }else{
            settimeractive(true)
        }

        return()=>clearInterval(interval)
    }),[min,sec]

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setotp({...otp,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        try {
            const response=await axiosInstanceuser.post('/verifyotp',{otp:otp.otp,details})
            setmsg(response.data.message)
            seterror('');
            navigate('/login');
          } catch (err: any) {
            seterror(err.response?.data?.message || 'Something went wrong.');
            setmsg('');
          }
    }

    const handleResend=async()=>{
        try {
            await axiosInstanceuser.post('/resendotp',{details})
            setmsg('OTP resent successfully!');
            seterror('');
            setmin(1);
            setsec(0);
            settimeractive(false);
          } catch (err: any) {
            seterror(err.response?.data?.message || 'Something went wrong.');
            setmsg('');
          }
    }


    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A1D56] relative overflow-hidden px-4">
            {/* Logo and header */}
        <div className="absolute -top-10 flex flex-col items-center z-10">
          <img src={logo} alt="HomePro Logo" className="w-80 h-39 mt-34" />
         
        </div>
        <div  className="flex items-center justify-center gap-8 mt-32">

            
          <div className="bg-white rounded-2xl shadow-lg p-20 max-w-full">
            <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>
            <form className="flex flex-col space-y-4 w-80" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter OTP"
                    name="otp"
                    value={otp.otp}
                    onChange={handleChange}/>


                    <button type="submit" className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition">
                       Verify OTP 
                    </button>

                    <div className="text-center">
                        <p className="text-gray-700">
                            Time Remaining: <span className="font-semibold">{min}:{sec < 10 ? `0${sec}` : sec}</span>
                        </p>
                    </div>

                    {timerActive && (
                    <button
                        type="button"
                        onClick={handleResend}
                        className="text-red-600 underline"
                        disabled={min > 0 || sec > 0}
                    >
                        Resend OTP
                    </button>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    {msg && <p className="text-green-500">{msg}</p>}
            </form>
            </div>
           
            </div>
            
        </div>
    )
}

export default Otp