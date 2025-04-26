// src/layouts/TechnicianLayout.tsx
import { Outlet, NavLink } from 'react-router-dom';

const TechnicianLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <div className="bg-yellow-400 p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-900">HomePro</div>
        <div className="flex space-x-6 text-black font-semibold">
          <NavLink to="/events">Upcoming Events</NavLink>
          <NavLink to="/requests">Requests</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
        <div className="font-medium">My Profile ▼</div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="bg-black text-white w-48 p-4 rounded-tr-2xl rounded-br-2xl space-y-4">
          <NavLink to="/tech/account" className={({ isActive }) => isActive ? 'bg-white text-black px-4 py-2 rounded-full block' : 'px-4 py-2 block'}>My Profile</NavLink>
          <NavLink to="/tech/account/password" className={({ isActive }) => isActive ? 'bg-white text-black px-4 py-2 rounded-full block' : 'px-4 py-2 block'}>Password</NavLink>
          <NavLink to="/tech/account/services" className={({ isActive }) => isActive ? 'bg-white text-black px-4 py-2 rounded-full block' : 'px-4 py-2 block'}>Services</NavLink>
          <NavLink to="/tech/account/wallet" className={({ isActive }) => isActive ? 'bg-white text-black px-4 py-2 rounded-full block' : 'px-4 py-2 block'}>Wallet</NavLink>
        </div>

        {/* Page Content */}
        <div className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TechnicianLayout;
