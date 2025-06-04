import {Routes,Route,Navigate } from 'react-router'
import '../../App.css'
import "leaflet/dist/leaflet.css";
import 'leaflet-geosearch/dist/geosearch.css';
import Login from '../../components/User/Login/Logn'
import Signup from '../../components/User/Signup/Signup'
import Otp from '../../components/User/OTP/Otp'
import Home from '../../components/User/Home/Home'
import ForgetPassword from '../../components/User/Forgetpassword/Forgetpassword'
import ForgetPasswordOTp from '../../components/User/Forgetpassword/ForgetPasswordOTp'
import ChangePassword from '../../components/User/Forgetpassword/ChangePassword'
import {Toaster} from 'react-hot-toast'
import UserLayout from '../../components/User/Profile/Userlayout'
import ProfilePage from '../../components/User/Profile/ProfilePage'
import TechnicianList from '../../components/User/AvailableTech.tsx/Availabletech'
import TechnicianProfile from '../../components/User/Techprofile/Profile'
import AddressPage from '../../components/User/Profile/Address'
import PaymentPage from '../../components/User/Payment/ProceedPayment'
import ThankYouPage from '../../components/User/ThankYou/ThankYou';
import Services from '../../components/User/Profile/Service'
import ViewBookingsProfile from '../../components/User/Profile/ViewBookings';
import ChangePasswords from '../../components/User/Profile/Password';
import ThankYouPageService from '../../components/User/Thankyouservice/ThankYouService';
import WalletPage from '../../components/User/Profile/Wallet';
const UserRouter=()=> {
 

  return (
    <>
    <Toaster/>
 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={
              <Login />}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/forgetpassotp' element={<ForgetPasswordOTp/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route path='/available-technicians' element={<TechnicianList/>}/>
        <Route path='/viewprofile' element={<TechnicianProfile/>}/>
        <Route path='/proceedpayment' element={<PaymentPage/>}/>
        <Route path='/thankyou' element={<ThankYouPage/>}/>
         <Route path='/thankyouservice/:techId' element={<ThankYouPageService/>}/>
        <Route path='/viewbookingddetails' element={<ViewBookingsProfile/>}/>
        <Route path='/myaccount' element={<UserLayout />}>
          {/* When /myaccount, redirect to /myaccount/profile */}
          <Route index element={<Navigate to="profile" replace />} />
          
          {/* Child routes under /myaccount */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path='addressmanagment' element={<AddressPage/>}/>
          <Route path='services' element={<Services/>}/>
          <Route path='passwordchange' element={<ChangePasswords/>}/>
          <Route path='wallet' element={<WalletPage/>}/>
        </Route>
      
      
      </Routes>
   
    </>
    
  
  )
}

export default UserRouter
