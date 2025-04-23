import express from 'express'
import { AdminController } from '../controllers/AdminController'
import { Login } from '../../application/usecase/Admin/LoginAdmin'
import { AdminRepositoryImpl } from '../../infrastructure/repository/AdminRepositoryImpl'
import { RefreshToken } from '../../application/usecase/Admin/RefreshToken'
import { fetchUser } from '../../application/usecase/Admin/FetchUser'
import { BlockUnblock } from '../../application/usecase/Admin/BlockUnblock'
import { UserRepositoryImpl } from '../../infrastructure/repository/UserRepositoryImpl'
const router=express.Router()

const UserRepository=new UserRepositoryImpl()
const fetchallUser= new fetchUser(UserRepository)
const unblocblock= new BlockUnblock(UserRepository)
const adminRepository= new AdminRepositoryImpl()
const loginadmin=new Login(adminRepository)
const refreshtoken= new RefreshToken()



const adminController= new AdminController(
    loginadmin,
    refreshtoken,
    fetchallUser,
    unblocblock
)
console.log("adminrouter")
router.post('/login',(req,res)=>adminController.login(req,res))
router.get('/fetchuser',(req,res)=>adminController.fetchuser(req,res))
router.post('/refresh',(req,res)=>adminController.refreshtokenController(req,res))
router.patch('/user/:userid',(req,res)=>adminController.blockUnblock(req,res))


export {router as adminRouter}