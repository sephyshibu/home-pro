import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchingdashboard } from "../../../api/TechApi/Fetchdetails/fetchdetails";
interface Dashboarddetails{
    totalorder:number,
    totalsales:number,

}
const DashBoard=async()=>{
    const navigate=useNavigate()
    const[details,setdetails]=useState<Dashboarddetails |null>(null)
    const techId=localStorage.getItem('techId')

    useEffect(()=>{
        const fetchdetails=async()=>{

            if(!techId){
                navigate('/tech')
                return
            }

            try {
                const response=await fetchingdashboard(techId)
                console.log("responsde",response)
                setdetails(response.data.details)
            } catch (error) {
                console.log("eerror in fetching details",error)
            }
        }
        fetchdetails()
    },[])

    return(
        <div>
            <p>{!details}</p>
        </div>
    )
}

export default DashBoard