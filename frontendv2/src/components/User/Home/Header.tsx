import React ,{useState,useEffect}from 'react';
import {persistor} from '../../../app/store'
import { useNavigate } from 'react-router';
import logo from '../../../../public/images/Resized/Logo Landscape white-01-01.png'
import { io,Socket } from 'socket.io-client';
import { logoutuser } from '../../../features/UserSlice';
import { cleartoken } from '../../../features/tokenSlice';
import { useDispatch } from 'react-redux';
const socket: Socket = io('http://localhost:3000'); 
const Header: React.FC = () => {
   const [unreadCounts, setUnreadCounts] = useState<{ bookingId: string; count: number; technicianName: string }[]>([]);

    const [showDropdown, setShowDropdown] = useState(false);
    const userId=localStorage.getItem('userId')
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(() => {
    if (userId) {
      socket.emit('get-unread-counts', userId, (data: any[]) => {
        setUnreadCounts(data);
      });

      // Listen for updates
      socket.on('new_unread', ({ bookingId, count }) => {
        setUnreadCounts((prev:any) => {
          const existing = prev.find((item:any) => item.bookingId === bookingId);
          if (existing) {
            return prev.map((item:any) =>
              item.bookingId === bookingId ? { ...item, count } : item
            );
          }
          return [...prev, { bookingId, count }];
        });
      });

      return () => {
        socket.off('new_unread');
      };
    }
  }, [userId]);

    const handleLoginLogout=async()=>{
        if(userId){
            localStorage.removeItem('userId')
            localStorage.removeItem('persist:user');
                localStorage.removeItem('usertoken');
            
                dispatch(logoutuser());
                dispatch(cleartoken());
            // await persistor.purge()
            navigate('/')
        }else{
            navigate('/login')
        }
    }

    const handleclick=()=>{
      navigate('/myaccount')
    }

     const handleChatRedirect = (bookingId: string) => {
    navigate('/myaccount/services')
    setShowDropdown(false);
  };

    return (
      <nav className="bg-[#0A2342] text-white py-2 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
    {/* Left: Logo */}
    <div className="flex-shrink-0">
      <img src={logo} alt="HomePro Logo" className="w-52" />
    </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg">
          {/* <a href="/" className="hover:text-orange-400 transition">Home</a> */}
          {/* <a href="#" className="hover:text-orange-400 transition">Services</a> */}
          {/* <a href="#" className="hover:text-orange-400 transition">Contact</a> */}
        </div>

        {/* Right: Profile + Login/Logout */}
        <div className="flex items-center space-x-6">
       {userId && (
            <>
              <div className="relative">
                <button onClick={() => setShowDropdown(prev => !prev)}>
                  🔔
                  {unreadCounts.length > 0 && (
                    <span className="absolute top-[-5px] right-[-5px] bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {unreadCounts.reduce((acc, curr) => acc + curr.count, 0)}
                    </span>
                  )}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded">
                    {unreadCounts.length === 0 ? (
                      <div className="p-4 text-center text-sm">No unread messages</div>
                    ) : (
                      unreadCounts.map(({ bookingId, count, technicianName }) => (
                        <div
                          key={bookingId}
                          className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                          onClick={() => handleChatRedirect(bookingId)}
                        >
                         {technicianName} -TechName
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              <button onClick={handleclick}>My Profile</button>
            </>
          )}
          <button type='button' onClick={handleLoginLogout}>
            {userId?"LogOut":"Login"}
          </button>
          </div>
      </div>
    </nav>
    )
  };
  
  export default Header;
  