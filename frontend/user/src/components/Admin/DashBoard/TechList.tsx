import React, { useEffect, useState } from "react";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";

interface Tech{
    _id:string,
    email:string,
    phone:string,
    isBlocked:boolean
}

const TechList:React.FC=()=>{
    const[techs, settech]=useState<Tech[]>([])
    const[loading,setloading]=useState(false)
    

    useEffect(()=>{
        fetchtech()
    },[])

    const fetchtech=async()=>{
        try {
            const response=await axiosInstanceadmin.get('/fetchtech')
            settech(response.data?.tech)
        }catch (error) {
            console.error('Failed to fetch tech', error);
            
        }
    }

    const handleToggle = async (techId: string, isBlocked: boolean) => {
  try {
    const updatedStatus = !isBlocked;
    await axiosInstanceadmin.patch(`/tech/${techId}`, { isBlocked: updatedStatus });

    // Update the specific tech in local state
    settech((prevTechs) =>
      prevTechs.map((tech) =>
        tech._id === techId ? { ...tech, isBlocked: updatedStatus } : tech
      )
    );
  } catch (error) {
    console.error("Error toggling block status", error);
  }
};



    return(
        <div className="flex-grow p-8">
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Tech List</h2>
          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading...</div>
          ) : (
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="text-gray-600 uppercase text-sm leading-normal">
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone Number</th>
                 
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {techs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6">
                      No tech Found
                    </td>
                  </tr>
                ) : (
                  techs.map((tech) => (
                    <tr key={tech._id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="px-6 py-4">{tech.email}</td>
                      <td className="px-6 py-4">{tech.phone}</td>
                      <td className="px-6 py-4">{tech.isBlocked ? "Blocked" : "Active"}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggle(tech._id, tech.isBlocked)}
                          className={`px-4 py-2 rounded-md text-white ${
                            tech.isBlocked ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {tech.isBlocked ? "Unblock" : "Block"}
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

export default TechList