import React, { useEffect, useState } from "react";
import axiosInstanceadmin from "../../axios";


interface User{
    _id:string,
    name:string,
    email:string,
    phone:string,
    isBlocked:boolean
}

const User:React.FC=()=>{
    const[user,setuser]=useState<User[]>([])
    const[loading,setloading]=useState<boolean>(false)


    useEffect(()=>{
        fetchuser()
    },[])

    const fetchuser=async()=>{
        try {
            const response=await axiosInstanceadmin.get('/fetchuser')
            setuser(response.data.user)
        } catch (error) {
            console.error('Failed to fetch users', error);
            
        }
    }

    const handleToggle=async(userid:string,isBlocked:boolean)=>{
        try {
            const updatedstatus=!isBlocked
            const response=await axiosInstanceadmin.patch(`/user/${userid}`,{isBlocked:updatedstatus})
            console.log(response)
            fetchuser()
        } catch (error) {
            console.error("Error toggling block status", error);
        }
    }

    return(
        <div className="flex-grow p-8">
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">User List</h2>
          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading...</div>
          ) : (
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="text-gray-600 uppercase text-sm leading-normal">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                 
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {user.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6">
                      No Users Found
                    </td>
                  </tr>
                ) : (
                  user.map((use) => (
                    <tr key={use._id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="px-6 py-4">{use.name}</td>
                      <td className="px-6 py-4">{use.email}</td>
                      <td className="px-6 py-4">{use.isBlocked ? "Blocked" : "Active"}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggle(use._id, use.isBlocked)}
                          className={`px-4 py-2 rounded-md text-white ${
                            use.isBlocked ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {use.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    
    )
}

export default User