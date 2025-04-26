import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginTech from './componenst/Login/login'
import Dashboard from './componenst/Dashboard/Dashboard'
import TechnicianLayout from './componenst/Profile/Myacc'
import './App.css'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<LoginTech/>}/>
        <Route path='/techdashboard' element={<Dashboard/>}/>
        <Route path='/myprofile' element={<TechnicianLayout/>}/>
      </Routes>
    </Router>
  )
 
}

export default App
