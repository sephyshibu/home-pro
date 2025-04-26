import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

const UserLayout: React.FC = () => {
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
          <NavLink to="password" className="block hover:bg-sky-700 py-2 px-4 rounded-lg">Password</NavLink>
          <NavLink to="services" className="block hover:bg-sky-700 py-2 px-4 rounded-lg">My Services</NavLink>
          <NavLink to="addresses" className="block hover:bg-sky-700 py-2 px-4 rounded-lg">Addresses</NavLink>
          <NavLink to="wallet" className="block hover:bg-sky-700 py-2 px-4 rounded-lg">Wallet</NavLink>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        <Outlet /> {/* This will render the nested route */}
      </div>
    </div>
  )
}

export default UserLayout
