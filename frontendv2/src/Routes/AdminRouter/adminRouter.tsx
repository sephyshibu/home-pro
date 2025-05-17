import { BrowserRouter as Router, Routes, Route } from 'react-router'
import '../../App.css'
import Dashboard from '../../components/Admin/DashBoard/Dashboard'
import Login from '../../components/Admin/Login/Login'
import EditCategory from '../../components/Admin/DashBoard/Editcategory'
import { Toaster } from 'react-hot-toast'
const AdminRouter=()=> {
 return(
  <>
  <Toaster/>

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admindashboard' element={<Dashboard/>}/>
      <Route path='/editcategory/:catid' element={<EditCategory/>}/>
    </Routes>
  
  </>
 
 )
}

export default AdminRouter
