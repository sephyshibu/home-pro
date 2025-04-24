import React, { useEffect, useState } from "react";
import axiosInstanceadmin from "../../axios";

interface Category{
    _id:string,
    name:string,
    description:string,
    image:string,
    isBlocked:boolean
}

const CategoryList:React.FC=()=>{
    const[category, setcategory]=useState<Category[]>([])
    const[loading,setloading]=useState(false)
    

    useEffect(()=>{
        fetchcategory()
    },[])

    const fetchcategory=async()=>{
        try {
            const response=await axiosInstanceadmin.get('/fetchcategory')
            setcategory(response.data.cat)
        }catch (error) {
            console.error('Failed to fetch Category', error);
            
        }
    }

    const handleToggle=async(catid:string, isBlocked:boolean)=>{
        try {
            const updateStatus=!isBlocked
            const response=await axiosInstanceadmin.patch(`/category/${catid}`,{isBlocked:updateStatus})
            console.log(response)
            fetchcategory()
        } catch (error) {
            console.error("Error toggling block status", error);
        }
    }


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
                 
                 
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {category.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6">
                      No category Found
                    </td>
                  </tr>
                ) : (
                  category.map((cat) => (
                    <tr key={cat._id} className="border-b border-gray-200 hover:bg-gray-100">
                      
                      <td>
                        <img src={cat.image} alt={cat.name} className="h-32 w-full object-cover rounded-md"/>
                      </td>
                      <td className="px-6 py-4">{cat.name}</td>
                      <td className="px-6 py-4">{cat.description}</td>
                      <td className="px-6 py-4">{cat.isBlocked ? "Blocked" : "Active"}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggle(cat._id, cat.isBlocked)}
                          className={`px-4 py-2 rounded-md text-white ${
                            cat.isBlocked ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {cat.isBlocked ? "Unblock" : "Block"}
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

export default CategoryList