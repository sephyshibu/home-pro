import { Outlet, NavLink } from 'react-router-dom'

const TechnicianLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <div className="bg-yellow-400 p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-900">HomePro</div>
        
        {/* Center Navigation */}
        <div className="flex space-x-6 text-black font-semibold">
          <NavLink to="/events" className="hover:underline">Upcoming Events</NavLink>
          <NavLink to="/requests" className="hover:underline">Requests</NavLink>
          <NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink>
        </div>

        {/* Right Side Profile */}
        <div className="font-medium cursor-pointer">
          My Profile ▼
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
