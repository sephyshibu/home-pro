import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginTech from './componenst/Login/login'
import Dashboard from './componenst/Dashboard/Dashboard'
import './App.css'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<LoginTech/>}/>
        <Route path='/techdashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
 
}

export default App
