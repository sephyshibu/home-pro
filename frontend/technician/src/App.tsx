import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginTech from './componenst/Login/login'
import Dashboard from './componenst/Dashboard/Dashboard'
import TechnicianLayout from './Layouts/TechLayout'
import './App.css'
import MyProfilePage from './componenst/Profile/Myacc'
function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<LoginTech/>}/>
        <Route path='/techdashboard' element={<Dashboard/>}/>
        <Route path='/myprofile' element={<TechnicianLayout/>}>
              <Route index element={<MyProfilePage/>}/>
        </Route>
           
      </Routes>
    </Router>
  )
 
}

export default App
