import { BrowserRouter as Router, Routes,Route } from 'react-router'
import './App.css'
import Login from './components/Login/Logn'
import Signup from './components/Signup/Signup'
import Otp from './components/OTP/Otp'

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/otp' element={<Otp/>}/>
      </Routes>
    </Router>
  
  )
}

export default App
