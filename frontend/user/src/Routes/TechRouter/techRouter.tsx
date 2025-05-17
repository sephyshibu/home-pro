import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginTech from '../../components/Technician/Login/login'
import Dashboard from '../../components/Technician/Dashboard/Dashboard'
import TechnicianLayout from '../../components/Technician/Layouts/TechLayout'
import '../../App.css'
import MyProfilePage from '../../components/Technician/Profile/Myacc'
import ChangePasswords from '../../components/Technician/Profile/Passswordchange'
import MyServicesPage from '../../components/Technician/Profile/Services'
import WalletPage from '../../components/Technician/Profile/Wallet'
import { Toaster } from 'react-hot-toast'
const TechRouter=()=> {
  return(
    <>
    <Toaster/>
 
      <Routes>
        <Route path='/' element={<LoginTech/>}/>
        <Route path='/techdashboard' element={<Dashboard/>}/>
        <Route path='/myprofile' element={<TechnicianLayout/>}>
              <Route index element={<MyProfilePage/>}/>
              <Route path='/myprofile/password' element={<ChangePasswords/>}/>
              <Route path='/myprofile/services' element={<MyServicesPage/>}/>
              <Route path='/myprofile/wallet' element={<WalletPage/>}/>
        </Route>
           
      </Routes>
    
    </>
    
  )
 
}

export default TechRouter
