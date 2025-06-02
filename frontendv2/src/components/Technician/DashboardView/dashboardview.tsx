// src/pages/TechDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import axiosInstancetech from '../../../Axios/TechAxios/axios';
import toast from 'react-hot-toast';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface MonthlyCommissionData {
  date: string;
  commission: number;
}

interface CommissionStats {
  totalOrders: number;
  totalCommission: number;
  graphData: MonthlyCommissionData[];
}

const TechDashboard: React.FC=() => {
  const techId=localStorage.getItem('techId')
  const [stats, setStats] = useState<CommissionStats>({
    totalOrders: 0,
    totalCommission: 0,
    graphData: [],
  });
  const [filter, setFilter] = useState<'month' | 'week'>('month');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const fetchData = async () => {
    try {
      const res = await axiosInstancetech.get(`/api/tech/stats/${techId}`, {
        params: {
          fromDate,
          toDate,
          filter,
        },
      });
      console.log(res.data.result)
      setStats(res.data.result);
    } catch (err:any) {
      if(err.response.status===400){
          toast.error(err.response.data.message)
      }
      else{
          console.error('Error fetching technician stats', err);
      }
      
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter, fromDate, toDate]);

  const generateLineData = () => {

    if (!stats || !Array.isArray(stats.graphData)) {
    return {
      labels: [],
      datasets: [],
    };
  }
   const all = stats.graphData.map(item => ({
    date: new Date(item.date),
    commission: item.commission,
    })).sort((a, b) => a.date.getTime() - b.date.getTime());


    return {
      labels: all.map(item => item.date.toLocaleDateString()),
      datasets: [
        {
          label: 'Tech Commission',
          data: all.map(item => item.commission),
          backgroundColor: '#FFDF00',
          borderColor: '#FFDF00',
          tension: 0.4,
          fill: false,
        },
      ],
    };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Technician Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-4 text-center">
          <h2 className="text-lg font-semibold">Total Orders</h2>
         <p className="text-xl font-bold">{stats?.totalOrders ?? 0}</p>

        </div>
        <div className="bg-white rounded-2xl shadow p-4 text-center">
          <h2 className="text-lg font-semibold">Total Commission</h2>
         <p className="text-xl font-bold">{stats?.totalCommission ?? 0}</p>

        </div>
      </div>

      <div className="flex gap-4 items-center mb-4">
        <button onClick={() => setFilter('month')} className={`px-4 py-2 rounded ${filter === 'month' ? 'bg-[#FFDF00] text-black' : 'bg-gray-200'}`}>Monthly</button>
        <button onClick={() => setFilter('week')} className={`px-4 py-2 rounded ${filter === 'week' ? 'bg-[#FFDF00] text-black' : 'bg-gray-200'}`}>Weekly</button>
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
  );
};

export default TechDashboard;