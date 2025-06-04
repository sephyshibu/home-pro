import React, { useEffect, useState } from "react";
import { useLocation,useSearchParams } from "react-router";
import { fetchTechById } from "../../../api/UserApi/fetchtechbyid";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import {persistor} from '../../../app/store'
import { ReviewDetails } from "../../../api/UserApi/Review/fetchreview";

interface Technician{
  _id:string
  name:string,
  email:string,
  phone:string,
  serviceablepincode:string[],
  rateperhour:number,
  noofworks:number,
  profileimgurl:string,
  consulationFee:number,
  categoryid:{
    _id:string,
    name:string,
    description:string
  }
}
interface Review {
  userId: {
    _id: string;
    name: string;
  };
  description: string;
  points: number;
}




const TechnicianProfile:React.FC=()=> {
  const location=useLocation()
  const [searchParams] = useSearchParams();

  const state = location.state || {
    techid: searchParams.get('techid'),
    categoryId: searchParams.get('categoryId'),
    time: searchParams.get('time'),
    date: searchParams.get('date'),
    pincode: searchParams.get('pincode'),
  };

  const { techid, categoryId, time, date, pincode } = state;
  const navigate=useNavigate()
  const[technician,settechnician]=useState<Technician>({
    _id:'',
    name: '',
    email: '',
    phone: '',
    rateperhour: 0,
    serviceablepincode: [],
    noofworks: 0,
    profileimgurl: '',
    consulationFee: 0,
    categoryid:{
      _id:"",
      name:"",
      description:""
    }
  })
  const[review,setreview]=useState<Review[]>([])
  const [currentReviewPage, setCurrentReviewPage] = useState(0);
  const reviewsPerPage = 2;

  const totalPages = Math.ceil(review.length / reviewsPerPage);
  const startIdx = currentReviewPage * reviewsPerPage;
  const currentReviews = review.slice(startIdx, startIdx + reviewsPerPage);

  const handleNext = () => {
    if (currentReviewPage < totalPages - 1) {
      setCurrentReviewPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentReviewPage > 0) {
      setCurrentReviewPage((prev) => prev - 1);
    }
  };


  useEffect(()=>{


    const fetchtech=async()=>{
      try {
        const [techresponse, reviewresponse]=await Promise.all([fetchTechById(techid), ReviewDetails(techid)]) 
        settechnician(techresponse)
        setreview(reviewresponse)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }

    }
    fetchtech()

  },[])
  const userId=localStorage.getItem('userId')
const handleLoginLogout=async()=>{
                if(userId){
                    localStorage.removeItem('userId')
                    await persistor.purge()
                    navigate('/')
                }else{
                    navigate('/login')
                }
            }
  const handleBook=async(techid:string)=>{
    
         const params = new URLSearchParams({
        techid,
        date,
        time,
        categoryId,
        pincode
      });

      navigate(`/proceedpayment?${params.toString()}`);
  }


  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <NavLink to="/" className="text-lg font-semibold text-sky-600 hover:underline">🏠 Home</NavLink>
          <button
            onClick={handleLoginLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Logout
          </button>
        </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Details */}
        <div className="col-span-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Technician Profile</h2>
          <div className="bg-white p-6 rounded flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Left side - details */}
            <div className="flex-1 space-y-3 text-base">
              <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
              <p><strong>Name:</strong> {technician.name}</p>
              <p><strong>Number of Works:</strong> {technician.noofworks}</p>
              <p><strong>Phone Number:</strong> {technician.phone}</p>
              <p><strong>Service Category:</strong> {technician.categoryid.name.toUpperCase()}</p>
              <p><strong>Consultation Fee:</strong> ₹{technician.consulationFee}</p>
              <p><strong>Rate per Hour:</strong> ₹ {technician.rateperhour} / hr</p>
              <p><strong>Service Districts:</strong> {technician.serviceablepincode.join(", ")}</p>
            </div>

            {/* Right side - profile image */}
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border-2 border-gray-300">
              <img
                src={technician.profileimgurl}
                alt="Technician Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          </div>
        </div>
        {/* Reviews Section */}
       <div className="col-span-6 bg-gray-100 p-4 rounded shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

        {review.length > 0 ? (
          <div className="flex items-center">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              disabled={currentReviewPage === 0}
              className="text-2xl px-2 disabled:opacity-30"
            >
              ◀
            </button>

            {/* Review Cards */}
            <div className="flex space-x-4 overflow-hidden">
              {currentReviews.map((rev, index) => (
                <div
                  key={index}
                  className="min-w-[250px] bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow duration-300"
                >
                  {/* Star Ratings */}
                  <div className="flex text-yellow-500 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < rev.points ? '★' : '☆'}</span>
                    ))}
                  </div>

                  <h4 className="font-semibold text-gray-800 mb-1">{rev.userId.name}</h4>
                  <p className="text-gray-600 text-sm">{rev.description}</p>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              disabled={currentReviewPage >= totalPages - 1}
              className="text-2xl px-2 disabled:opacity-30"
            >
              ▶
            </button>
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet for this technician.</p>
        )}
      </div>



        {/* Work Photos */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex justify-center mt-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>handleBook(techid)}>
              Book Technician
            </button>
          </div>
        </div>

        {/* Reviews Section */}
      {/* <div className="col-span-6 bg-gray-100 p-4 rounded shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {review.length > 0 ? (
          review.map((rev, index) => (
            <div key={index} className="bg-white rounded p-4 shadow mb-4">
              <p className="text-lg font-semibold">{rev.userId.name}</p>
              <p className="text-gray-600">{rev.description}</p>
              <p className="text-yellow-500">⭐ {rev.points}/5</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet for this technician.</p>
        )}
      </div> */}

      

      {/* Footer */}
      <footer className="bg-[#0F1A3C] text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h4 className="text-xl font-bold mb-2">HomePro</h4>
            <p>Your Home. Our Priority</p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Help</h5>
            <ul className="space-y-1 text-sm">
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Warranty</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">More</h5>
            <ul className="space-y-1 text-sm">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechnicianProfile;
