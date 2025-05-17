import { BrowserRouter as Router, Routes,Route,Navigate } from 'react-router'
import './App.css'
import "leaflet/dist/leaflet.css";
import 'leaflet-geosearch/dist/geosearch.css';
import UserRouter from '../src/Routes/UserRouter/userRouter'
import AdminRouter from '../src/Routes/AdminRouter/adminRouter'
import TechRouter from '../src/Routes/TechRouter/techRouter'
import { Toaster } from 'react-hot-toast'
function App() {
 

  return (
    <>
    <Toaster/>
    <Router>
      <Routes>
        <Route path='/*' element={<UserRouter/>}/>
        <Route path='/admin/*' element={<AdminRouter />}/>
        <Route path='/tech/*' element={<TechRouter />}/>
        
        
      
      
      </Routes>
    </Router>
    </>
    
  
  )
}

export default App
