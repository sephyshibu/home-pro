import React, { useEffect, useState } from "react";

import { fetchreviews } from "../../../api/TechApi/Review/fetchreview";

interface Review{
    _id:string,
    userId:{
        name:string
    },
    description:string,
    points:number
}


const Review:React.FC=()=>{

    const[review,setreview]=useState<Review[]|null>([])

    const techId=localStorage.getItem("techId")

    useEffect(()=>{
        const fetchreview=async()=>{
            if(!techId) return
            try {
                const res=await fetchreviews(techId)
                setreview(res.review)
            }  catch (error) {
                console.error("Error fetching review:", error);
            }

        }
        fetchreview()
    },[])

    return(
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-grow bg-gray-100">
                <main className="flex-grow p-6">
                    <h2 className="text-xl font-semibold mb-4">My Reviews</h2>
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-amber-300 text-black">
                            <tr>
                                <th className="py-3 px-4 text-left">Username</th>
                                <th className="py-3 px-4 text-left">Description</th>
                                <th className="py-3 px-4 text-left">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {review&& review.map((rev,idx)=>(
                                <tr key={idx} className="border-0">
                                    <td className="px-4 py-3 flex items-center space-x-4">
                                        {rev.userId.name}
                                    </td>
                                    <td className="px-4 py-3 flex items-center space-x-4">
                                        {rev.description}
                                    </td>
                                    <td className="px-4 py-3 flex items-center space-x-4">
                                        {rev.points}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    )


}

export default Review