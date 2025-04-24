import { BrowserRouter as Router, Routes,Route } from 'react-router'
import './App.css'
import Login from './components/Login/Logn'
import Signup from './components/Signup/Signup'
import Otp from './components/OTP/Otp'
import Home from './components/Home/Home'
import ForgetPassword from './components/Forgetpassword/Forgetpassword'
import ForgetPasswordOTp from './components/Forgetpassword/ForgetPasswordOTp'
import ChangePassword from './components/Forgetpassword/ChangePassword'
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
      </Routes>
    </Router>
  
  )
}

export default App
