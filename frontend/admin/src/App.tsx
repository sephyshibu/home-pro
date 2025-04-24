import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
import Dashboard from './coomponets/DashBoard/Dashboard'
import Login from './coomponets/Login/Login'
import { Toaster } from 'react-hot-toast'
function App() {
 return(
  <>
  <Toaster/>
   <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admindashboard' element={<Dashboard/>}/>
    </Routes>
  </Router>
  </>
 
 )
}

export default App
