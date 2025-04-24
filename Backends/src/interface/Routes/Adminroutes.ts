import express from 'express'
import { AdminController } from '../controllers/AdminController'
import { Login } from '../../application/usecase/Admin/LoginAdmin'
import { AdminRepositoryImpl } from '../../infrastructure/repository/AdminRepositoryImpl'
import { RefreshToken } from '../../application/usecase/Admin/RefreshToken'
import { fetchUser } from '../../application/usecase/Admin/FetchUser'
import { BlockUnblock } from '../../application/usecase/Admin/BlockUnblock'
import { UserRepositoryImpl } from '../../infrastructure/repository/UserRepositoryImpl'
import { TechRepositoryImpl } from '../../infrastructure/repository/TechRepositoryImpl'
import { Signuptech } from '../../application/usecase/Tech/Register'
import { fetchtech } from '../../application/usecase/Admin/FetchTech'
import { BlockUnBlock } from '../../application/usecase/Admin/BlockUnblockTech'
const router=express.Router()

const UserRepository=new UserRepositoryImpl()
const TechRepository = new TechRepositoryImpl()
const adminRepository= new AdminRepositoryImpl()

const loginadmin=new Login(adminRepository)
const refreshtoken= new RefreshToken()
const fetchallUser= new fetchUser(UserRepository)
const unblocblock= new BlockUnblock(UserRepository)
const fetchalltech= new fetchtech(TechRepository)
const unblockblocktech= new BlockUnBlock(TechRepository)
const addtech= new Signuptech(TechRepository)




const adminController= new AdminController(
    loginadmin,
    refreshtoken,
    fetchallUser,
    unblocblock,
    fetchalltech,
    unblockblocktech,
    addtech
)
console.log("adminrouter")
router.post('/login',(req,res)=>adminController.login(req,res))
router.get('/fetchuser',(req,res)=>adminController.fetchuser(req,res))
router.post('/refresh',(req,res)=>adminController.refreshtokenController(req,res))
router.post('/addtech',(req,res)=>adminController.signuptech(req,res))
router.patch('/user/:userid',(req,res)=>adminController.blockUnblock(req,res))
router.get('/fetchtech',(req,res)=>adminController.fetchtech(req,res))
router.patch('/tech/:techid',(req,res)=>adminController.blockunblocktechs(req,res))


export {router as adminRouter}