import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
import Dashboard from './coomponets/DashBoard/Dashboard'
import Login from './coomponets/Login/Login'

function App() {
 return(
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admindashboard' element={<Dashboard/>}/>
    </Routes>
  </Router>
 )
}

export default App
