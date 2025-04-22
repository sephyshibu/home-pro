import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginuser } from "../../features/UserSlice";
import { addtoken } from "../../features/tokenSlice";
import { useNavigate } from "react-router";
import { GoogleOAuthProvider,GoogleLogin ,CredentialResponse} from "@react-oauth/google";
import { gapi } from "gapi-script";
import { jwtDecode } from "jwt-decode";
import axiosInstanceuser from "../../axios";
interface LoginForm{
    email:string,
    password:string
}
interface GooglePayload{
    email:string,
    sub:string,
    name:string
}

const Login:React.FC=()=>{
    const clientId="699319272981-124dj113d9a2aqbmo2s756u6152bher2.apps.googleusercontent.com"

    const[formdata,setformdata]=useState<LoginForm>({
        email:"",
        password:""
    })
    const [loading, setloading]=useState(false);
    const[error,seterror]=useState<string |null>(null)
    // const [msg, setMsg] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(()=>{
        function start(){
            gapi.client.init({
                clientId:clientId,
                scope:""
            })
        } 

        gapi.load('client:auth2', start)
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setformdata((prev)=>
           ( {...prev,[e.target.name]:e.target.value}))

    }

    const handleGoogleLogin=async(credentialresponse:CredentialResponse)=>{
        console.log("fdaa")
        if(credentialresponse?.credential){
            try {
                console.log(credentialresponse);

                const credential=jwtDecode<GooglePayload>(credentialresponse.credential)
                console.log(credential)

                const{email, sub, name}=credential

                console.log(email)
                const response=await axiosInstanceuser.post('/googlelogin',{email,sub, name})
                console.log(response?.data)
            } catch (err: any) {
                if (err.response && err.response.data && err.response.data.message) {
                  seterror(err.response.data.message); // Server's custom message
                } else {
                  seterror('Something went wrong. Please try again.');
                }
                
              }
        }

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
            const response=await axios.post('/login',formdata)
            dispatch(loginuser(response.data.user))
            dispatch(addtoken({token:response.data.token}))
            seterror('');
            navigate('/');
            console.log("login data",response.data)


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
        <div className="absolute top-8 flex flex-col items-center">
          <img src="/your-logo.png" alt="HomePro Logo" className="w-32 h-32 mb-2" />
          <h1 className="text-white text-3xl font-bold">HomePro</h1>
          <p className="text-white text-sm">Your Home. Our Priority</p>
        </div>
  
        {/* Main Content */}
        <div className="flex items-center justify-center gap-8 mt-32">
          
          {/* Left Side Image */}
          <div className="hidden lg:block w-64">
            <img 
              src="/left-worker.png" 
              alt="Worker fixing door" 
              className="rounded-lg shadow-lg object-cover h-80 w-full"
            />
          </div>
  
          {/* Center Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-20 max-w-full">
            <h2 className="text-2xl font-bold text-center text-[#0A1D56] mb-6">USER LOGIN</h2>
            
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

              <GoogleOAuthProvider clientId={clientId}>
                <div>
                    <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={()=>{
                                seterror("google login failed")
                            }}
                        />
                </div>
              </GoogleOAuthProvider>
  
              <div className="text-center text-sm text-gray-600 mt-3">
                <a href="#" className="hover:underline">Forgot Password?</a><br />
                <a href="#" className="hover:underline">Don't have an account?</a>
              </div>
            </form>
          </div>
  
          {/* Right Side Image */}
          <div className="hidden lg:block w-64">
            <img 
              src="/right-worker.png" 
              alt="Worker fixing sink" 
              className="rounded-lg shadow-lg object-cover h-80 w-full"
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