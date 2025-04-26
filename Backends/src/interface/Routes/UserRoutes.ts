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
import { ForgetpasswordVerifyOTP } from '../../application/usecase/User/ForgetpasswordVerifyOtp'
import { forgetpasswordresnedOTP } from '../../application/usecase/User/ForgetpasswordresendOTP'
import { changepassword } from '../../application/usecase/User/Changepassword'
import { fetchCategory } from '../../application/usecase/Admin/Fetchcategory'
import { categoryRepositoryImpl } from '../../infrastructure/repository/CategoryRepositoryImpl'
import { GetUserById } from '../../application/usecase/User/MyProfile/UserDetails'
// import { checkuserstatus } from '../../infrastructure/middleware/CheckUserStatus'

const router=express.Router()


//dependency injectionnnn
const userRepository= new UserRepositoryImpl()
const categoryrepository= new categoryRepositoryImpl()

const emailService= new EmailService()
const signupuser= new Signup(userRepository,emailService)
const checkemailUser= new CheckEmail(userRepository,emailService)
const loginuser=new LoginUser(userRepository)
const googleLogin= new GoogleLogin(userRepository)
const verifyotp= new VerifyOTP()
const forgetpassverifyotp=new ForgetpasswordVerifyOTP()
const forgetpassresendotp=new forgetpasswordresnedOTP(emailService)
const resendotp=new resnedOTP(emailService)
const refreshtoken= new RefreshToken()
const chnagepassword= new changepassword(userRepository)
const fetchcategories= new fetchCategory(categoryrepository)
const getuserById= new GetUserById(userRepository)

const usercontroller= new UserController(
    signupuser,
    checkemailUser,
    loginuser,
    refreshtoken,
    verifyotp,
    resendotp,
    googleLogin,
    forgetpassverifyotp,
    forgetpassresendotp,
    chnagepassword,
    fetchcategories,
    getuserById
    
  
    

)


router.post('/signup',(req,res)=>usercontroller.signup(req,res))
router.post('/login',(req,res)=>usercontroller.login(req,res))
router.post('/refresh',(req,res)=>usercontroller.refreshtokenController(req,res))
router.post('/verifyotp',(req, res)=>usercontroller.verifyotpcontroller(req,res))
router.post('/resendotp',(req,res)=>usercontroller.resendotpcontroller(req,res))
router.post('/googlelogin', (req, res) => usercontroller.googleLoginController(req, res));
router.post('/checkemail',(req,res)=>usercontroller.checkEmail(req,res))
router.post('/chnagepasswords',(req,res)=>usercontroller.changepassword(req,res))
router.post('/forgetpassverifyotp',(req,res)=>usercontroller.forgetpasswordVerifyOTP(req,res))
router.post('/forgetpassresendotp',(req,res)=>usercontroller.forgetpasswordresnedOTP(req,res))
router.get('/fetchcategory',(req,res)=>usercontroller.fetchCategory(req,res))
router.get('/fetchinguser/:userId',(req,res)=>usercontroller.fetchUserById(req,res))



export {router as userRouter}