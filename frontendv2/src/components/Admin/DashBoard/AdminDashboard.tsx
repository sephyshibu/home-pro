import React, { useEffect, useState } from "react";
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, LineElement,PointElement,LinearScale,Tooltip,Legend, CategoryScale} from 'chart.js'
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import BookingDetails from "./Booking Details";
import { pdf } from "@react-pdf/renderer";

ChartJS.register(LineElement,PointElement,LinearScale,CategoryScale,Tooltip,Legend);

interface fetchdatas{
  _id:string,
  addressId:{
    _id:string,
    addressname:string
  }
  userId:{
    _id:string,
    name:string
  },
  technicianId:{
    _id:string,
    name:string
  },
  admincommision:number,

  booked_date: string;
  rateperhour:number,
 
  consultationFee:string,
  consultationpayStatus:string,
  finalpaymentStatus:string,

  pincode:string,

  totalFinalAmount:string

}


interface MonthlyCommisionData{
    date:string,
    commission:number
}

interface CommissionStatus{
    totalOrders:number;
    totaladmincommision:number;
    graphData:MonthlyCommisionData[]
    bookingdetails:fetchdatas[]
}

const AdminDashboards: React.FC=()=>{
    const [stats,setStats]=useState<CommissionStatus>({
        totalOrders:0,
        totaladmincommision:0,
        graphData:[],
        bookingdetails:[]
    })
    const [details,setdetails]=useState<fetchdatas[]>([])

    const [filter,setfilter]=useState<'month'|'week'>('month')
    const[fromDate,setFromDate]=useState<string>('')
    const[toDate,setToDate]=useState<string>('')


    const fetchData=async()=>{
        try {
            
            const res=await axiosInstanceadmin.get('/api/admindashboard',{
                params:{
                    fromDate,
                    toDate,
                    filter
                }
            
            })
            console.log(res.data.result)
            setStats(res.data.result)
            setdetails(res.data.result.bookingdetails)


        } catch (error) {
            console.log("error in fretchning admin dashboard",error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[fromDate,toDate,filter])

    const generateLineData=()=>{
        if(!stats || !Array.isArray(stats.graphData)){
            return {
                labels:[],
                datasets:[]
            }
        }

        const all=stats.graphData.map(item=>({
            date:new Date(item.date),
            commission:item.commission,
        })).sort((a,b)=>a.date.getTime()-b.date.getTime())

        return{
            labels:all.map(item=>item.date.toLocaleDateString()),
            datasets:[
                {
                    label:"Admin Commission",
                    data:all.map(item=>item.commission),
                    backgroundColor: '#45ae66',
                    borderColor: '#45ae66',
                    tension: 0.4,
                    fill: false,
                }
            ]
        }

    }
    const handleDownload=async()=>{
        console.log("stats booking",stats.bookingdetails)
        const blob=await pdf(<BookingDetails bookings={details}/>).toBlob()
        const url=URL.createObjectURL(blob)
        const link=document.createElement('a')
        link.href=url
        link.download=`report`
        link.click()
        URL.revokeObjectURL(url)

    }

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 mb-6">
                <div className="bg-white rounded-2xl shadow p-4 text-center">
                    <h2 className="text-lg font-semibold">Total Orders</h2>
                    <p className="text-xl font-bold #45ae66">{stats?.totalOrders ?? 0}</p>

                </div>
                <div className="bg-white rounded-2xl shadow p-4 text-center">
                    <h2 className="text-lg font-semibold">Total Commission</h2>
                    <p className="text-xl font-bold #45ae66">{stats?.totaladmincommision ?? 0}</p>
                </div>
                <div>
                    <button className="px-4 py-2 bg-red-600 text-white m-5 rounded-3xl font-semibold hover:bg-red-800 transition duration-300 ease-in-out" onClick={handleDownload}>Download PDF</button>
                </div>
            </div>
                  <div className="flex gap-4 items-center mb-4">
                    <button onClick={() => setfilter('month')} className={`px-4 py-2 rounded ${filter === 'month' ? 'bg-[#45ae66] text-white' : 'bg-gray-200'}`}>Monthly</button>
                    <button onClick={() => setfilter('week')} className={`px-4 py-2 rounded ${filter === 'week' ? 'bg-[#45ae66] text-white' : 'bg-gray-200'}`}>Weekly</button>
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border p-2 rounded" />
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border p-2 rounded" />
                  </div>
            
                  <div className="bg-white rounded-2xl shadow p-4">
                    <h2 className="text-lg font-semibold mb-2">Commission Trend</h2>
                    <Line data={generateLineData()} options={{
                      responsive: true,
                      plugins: { legend: { display: true } },
                      scales: {
                        x: { title: { display: true, text: 'Date' } },
                        y: { title: { display: true, text: 'Commission ₹' } },
                      },
                    }} />
                </div>
      
        </div>
        
    )


}

export default AdminDashboards