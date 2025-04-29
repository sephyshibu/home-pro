import React from 'react';
import {persistor} from '../../app/store'
import { useNavigate } from 'react-router';
import logo from '../../../public/images/Resized/Logo Landscape white-01-01.png'
const Header: React.FC = () => {

    const userId=localStorage.getItem('userId')
    const navigate=useNavigate()


    const handleLoginLogout=async()=>{
        if(userId){
            localStorage.removeItem('userId')
            await persistor.purge()
            navigate('/')
        }else{
            navigate('/login')
        }
    }

    const handleclick=()=>{
      navigate('/myaccount')
    }
    return (
      <nav className="bg-[#0A2342] text-white py-2 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
    {/* Left: Logo */}
    <div className="flex-shrink-0">
      <img src={logo} alt="HomePro Logo" className="w-52" />
    </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg">
          <a href="/" className="hover:text-orange-400 transition">Home</a>
          <a href="#" className="hover:text-orange-400 transition">Services</a>
          <a href="#" className="hover:text-orange-400 transition">Contact</a>
        </div>

        {/* Right: Profile + Login/Logout */}
        <div className="flex items-center space-x-6">
        {userId && (   // <-- Only show if userId exists
          <button onClick={handleclick} >
            My Profile
          </button>
        )}
          <button type='button' onClick={handleLoginLogout}>
            {userId?"LogOut":"Login"}
          </button>
          </div>
      </div>
    </nav>
    )
  };
  
  export default Header;
  