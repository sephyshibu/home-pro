import React, { useEffect, useState } from "react";
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, LineElement,PointElement,LinearScale,Tooltip,Legend, CategoryScale} from 'chart.js'
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";


ChartJS.register(LineElement,PointElement,LinearScale,CategoryScale,Tooltip,Legend);


interface MonthlyCommisionData{
    date:string,
    commission:number
}

interface CommissionStatus{
    totalOrders:number;
    totaladmincommision:number;
    graphData:MonthlyCommisionData[]
}

const AdminDashboards: React.FC=()=>{
    const [stats,setStats]=useState<CommissionStatus>({
        totalOrders:0,
        totaladmincommision:0,
        graphData:[]
    })

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