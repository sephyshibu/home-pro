import { BrowserRouter as Router, Routes,Route,Navigate } from 'react-router'
import './App.css'
import Login from './components/Login/Logn'
import Signup from './components/Signup/Signup'
import Otp from './components/OTP/Otp'
import Home from './components/Home/Home'
import ForgetPassword from './components/Forgetpassword/Forgetpassword'
import ForgetPasswordOTp from './components/Forgetpassword/ForgetPasswordOTp'
import ChangePassword from './components/Forgetpassword/ChangePassword'


import UserLayout from './components/Profile/Userlayout'
import ProfilePage from './components/Profile/ProfilePage'
function App() {
 

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/forgetpassotp' element={<ForgetPasswordOTp/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        
      
        <Route path='/myaccount' element={<UserLayout />}>
          {/* When /myaccount, redirect to /myaccount/profile */}
          <Route index element={<Navigate to="profile" replace />} />
          
          {/* Child routes under /myaccount */}
          <Route path="profile" element={<ProfilePage />} />
          {/* Add more nested routes like password, services, wallet later */}
        </Route>
      
      
      </Routes>
    </Router>
  
  )
}

export default App
