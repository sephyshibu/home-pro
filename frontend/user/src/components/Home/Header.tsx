import React from 'react';
import {persistor} from '../../app/store'
import { useNavigate } from 'react-router';
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
    return (
        <nav className="bg-[#0A2342] text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2">
            <img src="logo.png" className="h-8" alt="Logo" />
            HomePro
          </div>
          <nav className="space-x-6">
            <a href="/" className="hover:text-orange-400">Home</a>
            <a href="#" className="hover:text-orange-400">Services</a>
            <a href="#" className="hover:text-orange-400">Contact</a>
          </nav>
          <div className="text-sm">My Profile</div>
          <button type='button' onClick={handleLoginLogout}>
            {userId?"LogOut":"Login"}
                      </button>
        </div>
      </nav>
    )
  };
  
  export default Header;
  