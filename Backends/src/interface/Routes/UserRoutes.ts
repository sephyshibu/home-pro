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
import { EditProfile } from '../../application/usecase/User/MyProfile/EditProfile'
import { authToken } from '../../infrastructure/middleware/CheckUserStatus'
import { TechRepositoryImpl } from '../../infrastructure/repository/TechRepositoryImpl'
import { FetchTechBasedOnAvailable } from '../../application/usecase/User/Tech/FetchTech'
import { GetCategoryById } from '../../application/usecase/Category/GetCategory'
import { fetchTechwithcategory } from '../../application/usecase/User/Tech/FetchTechById'
import { AddressRepositoryImpl } from '../../infrastructure/repository/AddressRepositoryImpl'
import { GetAddressById } from '../../application/usecase/Address/Getaddress'
import { AddAddress } from '../../application/usecase/Address/AddAddress'
import { Editaddress } from '../../application/usecase/Address/EditAddress'
import { DeleteAddressById } from '../../application/usecase/Address/DeleteAddress'
import { CreateBookingUseCase } from '../../application/usecase/User/Bookings/CreateBooking'
import { RazorpayService } from '../../infrastructure/service/RazorpayService'
import { bookingrepositoryImpl } from '../../infrastructure/repository/BookingRepositoryImpl'
import { ConfirmPayment } from '../../application/usecase/booking/confirmPayment'
import { TransactionRepositoryImpl } from '../../infrastructure/repository/TransactionRepositoryImpl'
import { walletRepositoryimpl } from '../../infrastructure/repository/WalletRepositoryimpl'
import { FetchBookingbyUserId } from '../../application/usecase/booking/fetchBookings'
import { PasswordChange } from '../../application/usecase/User/Password/Changepassword'
import { HandleFailedPayment } from '../../application/usecase/booking/handleFailedPayment'
import { RetryConfirmPayment } from '../../application/usecase/booking/retryconfirmpayment'
import { updateusercancelreason } from '../../application/usecase/booking/updateUserCancelreason'




const router=express.Router()


//dependency injectionnnn
const userRepository= new UserRepositoryImpl()
const categoryrepository= new categoryRepositoryImpl()
const techrepository= new TechRepositoryImpl()
const addressrepository= new AddressRepositoryImpl()
const bookingrepository= new bookingrepositoryImpl()
const transactionrepository = new TransactionRepositoryImpl();
const walletRepository= new walletRepositoryimpl()


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
const editprofile=new EditProfile(userRepository)
const fetchtechonavailble= new FetchTechBasedOnAvailable(techrepository)
const getcategoryid= new GetCategoryById(categoryrepository)
const fetchtechwithcat= new fetchTechwithcategory(techrepository)
const getaddressed= new GetAddressById(addressrepository)
const editaddress= new Editaddress(addressrepository)
const deleteaddress= new DeleteAddressById(addressrepository)
const addaddressed= new AddAddress(addressrepository)
const razorpayservice= new RazorpayService()
const createBookingUseCase= new CreateBookingUseCase(razorpayservice)
const confirmPayment= new ConfirmPayment(bookingrepository,walletRepository,transactionrepository)
const fetchbook=new FetchBookingbyUserId(bookingrepository)
const passchange= new PasswordChange(userRepository)
const handlefailpayment= new HandleFailedPayment(bookingrepository)
const retrypaymet=new RetryConfirmPayment(bookingrepository,walletRepository,transactionrepository)
const usercancelupdate=new updateusercancelreason(bookingrepository)
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
    getuserById,editprofile,
    fetchtechonavailble,
    getcategoryid,
    fetchtechwithcat,
    addaddressed,
    editaddress,
    getaddressed,
    deleteaddress,
    createBookingUseCase,
    confirmPayment,
    fetchbook,
    passchange,
    handlefailpayment,
    retrypaymet,
    usercancelupdate
  
    

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



// router.use(authToken); 
router.get('/fetchinguser/:userId',authToken,(req,res)=>usercontroller.fetchUserById(req,res))
router.put('/updateuser/:userId',authToken,(req,res)=>usercontroller.edituser(req,res))
router.get('/technicians/available',authToken,(req,res)=>usercontroller.fetchTechBasedonavailble(req,res))
router.get('/fetchparticularcategory/:catid',authToken,(req,res)=>usercontroller.fetchCategoryById(req,res))
router.get('/fetchtech/:techid',authToken,(req,res)=>usercontroller.fetctechwithcat(req,res))
router.post('/addaddress/:userId',authToken,(req,res)=>usercontroller.addUserAddress(req,res))
router.get('/fetchaddress/:userId',authToken,(req,res)=>usercontroller.getUserAddresses(req,res))
router.put('/editaddress/:addressId',authToken, (req,res)=>usercontroller.editUserAddress(req,res))
router.delete('/deleteaddress/:addressId',authToken,(Req,res)=>usercontroller.deleteUserAddress(Req,res))
router.post('/create-order/:userId', authToken, (req, res) => usercontroller.createOrder(req, res));
router.post('/confirm-payment',authToken,(req,res)=>usercontroller.confirmpay(req,res))
router.get('/fetchbookings/:userId', authToken,(req,res)=>usercontroller.fetchbookingsbyuserId(req,res))
router.post('/password/:userId',authToken,(req,res)=>usercontroller.passwordChanges(req,res))
router.post('/payment-failed',authToken,(req,res)=>usercontroller.Failedpayment(req,res))
router.post('/confirm-payment-retry',authToken,(req,res)=>usercontroller.retryconfirmpayment(req,res))
router.post('/updatecancelreason/:bookingId',authToken,(req,res)=>usercontroller.updatecancelreason(req,res))

export {router as userRouter}