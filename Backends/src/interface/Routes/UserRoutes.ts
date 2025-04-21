import express from 'express'
import { UserController } from '../controllers/UserController'
import { Signup } from '../../application/usecase/User/Registor'
import { UserRepository } from '../../infrastructure/repository/UserRepository'


const userRepository= new UserRepository()
const signupuser= new Signup(userRepository)
const usercontroller= new UserController(signupuser)

export const router=express.Router()
router.post('/signup',(req,res)=>usercontroller.signup(req,res))
