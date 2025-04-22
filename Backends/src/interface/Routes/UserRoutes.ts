import express from 'express'
import { UserController } from '../controllers/UserController'
import { Signup } from '../../application/usecase/User/Registor'
import { CheckEmail } from '../../application/usecase/User/Checkemail'
import { UserRepositoryImpl } from '../../infrastructure/repository/UserRepositoryImpl'
import { EmailService } from '../../application/service/EmailService'
import { LoginUser } from '../../application/usecase/User/LoginUser'
import { GoogleLogin } from '../../application/usecase/User/GoogleLogin'
import { resnedOTP } from '../../application/usecase/User/ResendOTP'
import { VerifyOTP } from '../../application/usecase/User/VerifyOTP'
import { RefreshToken } from '../../application/usecase/User/RefreshToken'



const router=express.Router()


//dependency injectionnnn
const userRepository= new UserRepositoryImpl()
const emailService= new EmailService()
const signupuser= new Signup(userRepository)
const checkemailUser= new CheckEmail(userRepository,emailService)
const loginuser=new LoginUser(userRepository)
const googleLogin= new GoogleLogin(userRepository)
const verifyotp= new VerifyOTP()
const resendotp=new resnedOTP(emailService)
const refreshtoken= new RefreshToken()

const usercontroller= new UserController(
    signupuser,
    checkemailUser,
    loginuser,
    refreshtoken,
    verifyotp,
    resendotp,
    googleLogin,
    

)


router.post('/signup',(req,res)=>usercontroller.signup(req,res))
router.post('/login',(req,res)=>usercontroller.login(req,res))
router.post('/refresh-token',(req,res)=>usercontroller.refreshtokenController(req,res))
router.post('/verify-otp',(req, res)=>usercontroller.verifyotpcontroller(req,res))
router.post('/google-login', (req, res) => usercontroller.googleLoginController(req, res));
router.post('/check-email',(req,res)=>usercontroller.checkEmail(req,res))

export {router as userRouter}