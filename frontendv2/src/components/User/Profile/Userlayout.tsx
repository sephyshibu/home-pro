import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { logoutuser } from '../../../features/UserSlice'
import { cleartoken } from '../../../features/tokenSlice'
import { useDispatch } from 'react-redux'

const UserLayout: React.FC = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const userId=localStorage.getItem("userId")

  const handleLoginLogout=async()=>{
          if(userId){
              localStorage.removeItem('userId')
               localStorage.removeItem('persist:user');
                              localStorage.removeItem('usertoken');
                          
                              dispatch(logoutuser());
                              dispatch(cleartoken());
              navigate('/')
          }else{
              navigate('/login')
          }
      }
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-sky-600 text-white p-6 rounded-tr-3xl rounded-br-3xl">
        <h2 className="text-2xl font-bold mb-10">HomePro</h2>
        <nav className="space-y-4">
          <NavLink to="profile" className={({ isActive }) =>
            isActive ? 'block bg-white text-sky-600 py-2 px-4 rounded-lg font-semibold' :
              'block hover:bg-sky-700 py-2 px-4 rounded-lg'
          }>My Profile</NavLink>
          <NavLink to="passwordchange" className="block hover:bg-sky-700 py-2 px-4 rounded-lg">Password</NavLink>
          <NavLink to="services" className="block hover:bg-sky-700 py-2 px-4 rounded-lg">My Services</NavLink>
          <NavLink to="addressmanagment" className="block hover:bg-sky-700 py-2 px-4 rounded-lg">Addresses</NavLink>
          <NavLink to="wallet" className="block hover:bg-sky-700 py-2 px-4 rounded-lg">Wallet</NavLink>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <NavLink to="/" className="text-lg font-semibold text-sky-600 hover:underline">🏠 Home</NavLink>
          <button
            onClick={handleLoginLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="p-10 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserLayout
