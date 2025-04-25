import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginTech from './componenst/Login/login'
import './App.css'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<LoginTech/>}/>
      </Routes>
    </Router>
  )
 
}

export default App
