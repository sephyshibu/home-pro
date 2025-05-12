import { Outlet, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {persistor} from '../componenst/app/store'
const TechnicianLayout = () => {

  const navigate=useNavigate()
  const techId=localStorage.getItem('techId')
  const handleLogOut=async()=>{
      if(techId){
          console.log(techId)
        localStorage.removeItem('techId')
        await persistor.purge()
        navigate('/')
      }else{
        navigate('/techdashboard')
      }
    }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <div className="bg-yellow-400 p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-900">HomePro</div>
        
      
          <NavLink to="/techdashboard" className="text-lg font-semibold text-sky-600 hover:underline">🏠 Home</NavLink>
        
        

        {/* Right Side Profile */}
        <div className="font-medium cursor-pointer">
        <button type="button" onClick={handleLogOut} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-black">
          {techId?"LogOut":"LogIn"}
        </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="bg-black text-white w-48 p-4 rounded-tr-2xl rounded-br-2xl space-y-4">
          <NavLink 
            to="/myprofile" 
            className={({ isActive }) => isActive ? 
              'bg-white text-black px-4 py-2 rounded-full block' : 
              'px-4 py-2 block'
            }>
            My Profile
          </NavLink>
          
          <NavLink 
            to="/myprofile/password" 
            className={({ isActive }) => isActive ? 
              'bg-white text-black px-4 py-2 rounded-full block' : 
              'px-4 py-2 block'
            }>
            Password
          </NavLink>

          <NavLink 
            to="/myprofile/services" 
            className={({ isActive }) => isActive ? 
              'bg-white text-black px-4 py-2 rounded-full block' : 
              'px-4 py-2 block'
            }>
            Services
          </NavLink>

          <NavLink 
            to="/myprofile/wallet" 
            className={({ isActive }) => isActive ? 
              'bg-white text-black px-4 py-2 rounded-full block' : 
              'px-4 py-2 block'
            }>
            Wallet
          </NavLink>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-100 p-6">
          <Outlet /> {/* 👈 This will load your child components like MyProfilePage, PasswordPage etc */}
        </div>
      </div>
    </div>
  )
}

export default TechnicianLayout
