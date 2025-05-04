import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { fetchrefunndallreq } from '../../api/Refund/fetchrefundrequest';
import { acceptrefundrequest } from '../../api/Refund/Acceptrefund';

interface bookingdeatils {
  _id: string;
  username: string;
  userphone: string;
  techname: string;
  Category: string;
  techStatus: 'Accepted' | 'Rejected' | 'pending';
  date: string;
  locationUrl: string;
  rateperhour: number;
  techphone: string;
  consultationFee: string;
  consultationpaymentStatus: string;
  workaddress: string;
  totalhours: number;
  userremark: string;
  techremark: string;
  refundrequestAccept:boolean
}

const RefundRequest: React.FC = () => {
  const [refundreq, setrefundreq] = useState<bookingdeatils[] | null>([]);
  const navigate = useNavigate();
  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    const fetchrefundreq = async () => {
      if (!adminId) {
        navigate('/');
        return;
      }
      try {
        const refundreqdetails = await fetchrefunndallreq();
        const filtered = refundreqdetails.filter((req: bookingdeatils) => !req.refundrequestAccept);
        setrefundreq(filtered);
      } catch (error) {
        console.error('Error fetching refund request:', error);
      }
    };
    fetchrefundreq();
  }, []);

  const AcceptRefund = async (id: string) => {
    try {
      const response = await acceptrefundrequest(id);
      toast.success(response.message);
      setrefundreq(prev => prev ? prev.filter(req => req._id !== id) : []);
    } catch (error) {
      console.error('Error accepting refund request:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex justify-center items-start p-8">
        <div className="bg-white p-6 rounded-xl w-full max-w-7xl shadow-md">
          <h1 className="text-xl font-semibold mb-6 text-center text-gray-800">Refund Requests</h1>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm text-gray-800">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-3 py-2 text-left">User Name</th>
                  <th className="px-3 py-2 text-left">Contact</th>
                  <th className="px-3 py-2 text-left">Technician</th>
                  <th className="px-3 py-2 text-left">Consultation Fee</th>
                  <th className="px-3 py-2 text-left">Tech Status</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">User Remark</th>
                  <th className="px-3 py-2 text-left">Payment Status</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {refundreq && refundreq.length > 0 ? (
                  refundreq.map((req) => (
                    <tr key={req._id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2">{req.username}</td>
                      <td className="px-3 py-2">{req.userphone}</td>
                      <td className="px-3 py-2">{req.techname}</td>
                      <td className="px-3 py-2">₹{req.consultationFee}</td>
                      <td className="px-3 py-2">{req.techStatus}</td>
                      <td className="px-3 py-2">{req.date}</td>
                      <td className="px-3 py-2">{req.userremark}</td>
                      <td className="px-3 py-2">{req.consultationpaymentStatus}</td>
                      <td className="px-3 py-2 text-center">
                        <button
                          className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 transition"
                          onClick={() => AcceptRefund(req._id)}
                        >
                          Accept
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-gray-500">
                      No refund requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white text-sm py-6 mt-10">
        <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-4">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-lg mb-2">🏠 HomePro</h3>
            <p>Your Home. Our Priority</p>
          </div>
          <div className="space-y-2">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Help Center</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RefundRequest;
