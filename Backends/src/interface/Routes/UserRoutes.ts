import express from 'express'
import { UserController } from '../controllers/UserController'
import { Signup } from '../../application/usecase/User/Registor'
import { UserRepositoryImpl } from '../../infrastructure/repository/UserRepositoryImpl'


const userRepository= new UserRepositoryImpl()
const signupuser= new Signup(userRepository)
const usercontroller= new UserController(signupuser)

const router=express.Router()
router.post('/signup',(req,res)=>usercontroller.signup(req,res))
export {router as userRouter}