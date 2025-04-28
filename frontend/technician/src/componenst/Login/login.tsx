import React,{useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { logintech } from "../features/TechSlice";
import { addtoken } from "../features/TokenSlice";
import { useNavigate } from "react-router";
import axiosInstancetech from "../../axios";
import logo from '../../../public/images/Resized/Logo Landscape.png'
import one from '../../../public/images/one.png'
import two from '../../../public/images/two.png'

interface LoginForm{
    email:string,
    password:string
}

const LoginTech:React.FC=()=>{

    const[formdata,setformdata]=useState<LoginForm>({
        email:"",
        password:""
    })
    const [loading, setloading]=useState(false);
    const[error,seterror]=useState<string |null>(null)
    // const [msg, setMsg] = useState<string>('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

      // ⬇️ NEW: Block already logged-in techs from accessing login page
  useEffect(() => {
    const techId = localStorage.getItem('techId');
    if (techId) {
      navigate('/techdashboard'); // Redirect if already logged in
    }
  }, [navigate]);
    

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
            setloading(false)
            return
        }

        if(!formdata.email){
            seterror("Email is required")
            setloading(false)
            return
        }
        if(!formdata.password){
            seterror("password is required")
            setloading(false)
            return
        }
        
        try {
            const{email,password}=formdata
            const response=await axiosInstancetech.post('/login',{email,password})
            dispatch(logintech(response.data.tech))
            dispatch(addtoken({token:response.data.token}))
            console.log(response)
            console.log("login tech data",response.data)
            const techId=response.data.tech._id
            localStorage.setItem("techId",techId)
            seterror('');
            navigate('/techdashboard');
      


        } catch (error:any) {
            console.error("login errror",error)
            seterror(error.response?.data?.message ||"Something went wrong")   
        }
        finally {
            setloading(false);
          }
    }

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFDF00] relative overflow-hidden px-4">
        {/* Logo */}
        <div className="absolute top-8 z-10">
          <img src={logo} alt="HomePro Logo" className="w-72" />
        </div>
      
        {/* Main Content */}
        <div className="flex items-center justify-center gap-10 mt-32 w-full max-w-6xl">
          {/* Left Image */}
          <div className="hidden lg:block w-[300px] h-[400px]">
            <img
              src={one}
              alt="Technician working"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>
          {/* Center Login Card */}
          <div className="bg-white rounded-2xl shadow-lg p-20 max-w-full">
            <h2 className="text-2xl font-bold text-center text-[#0A1D56] mb-6"></h2>
            
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
          <div className="hidden lg:block w-[300px] h-[400px]">
            <img
              src={two}
              alt="Technician working"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
          </div>
        </div>
  
        {/* Footer */}
        <div className="absolute bottom-0 mb-4 flex flex-col items-center text-white text-xs">
          <p>© 2025 HomePro</p>
        </div>
      </div>
    );


}
export default LoginTech