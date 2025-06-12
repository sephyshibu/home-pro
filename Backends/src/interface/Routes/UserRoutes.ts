import express from 'express'
import { UserController } from '../controllers/UserController'
import { AuthController } from '../controllers/AuthController'
import { ProfileController } from '../controllers/ProfileController'
import { TechControllers } from '../controllers/TechControllers'
import { CategoryController } from '../controllers/CategoryController'
import { AddressController } from '../controllers/AddressController'
import {BookingController} from '../controllers/BookingControllers'
import { WalletController } from '../controllers/WalletController'
import { TransactionController } from '../controllers/TransactionController'
import { ReviewCOntroller } from '../controllers/ReviewController'

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
import { GetWallet } from '../../application/usecase/Wallet/fetchWallet'
import { FetchWallet } from '../../application/usecase/User/Wallet/getwallet'
import { WalletPayment } from '../../application/usecase/booking/WalletPayment'
import { FetchSession } from '../../application/usecase/Sessions/fetchsessions'
import { Acceptsession } from '../../application/usecase/Sessions/acceptsession'
import { FinalPayment } from '../../application/usecase/booking/makefinalpaymenty'
import { FinalPaymentconfirm } from '../../application/usecase/booking/finalconfirmpayment'
import { GetTransactionWithBookings } from '../../application/usecase/Transactions/TransactionBookingdetails'
import { FetchReviewByTechId } from '../../application/usecase/Review/fetchReview'
import { ReviewrepositoryImpl } from '../../infrastructure/repository/ReviewRepositoryImpl'
import { AddReview } from '../../application/usecase/Review/addreview'
import { CheckPaymentStatus } from '../../application/usecase/booking/paystatus'
import { UserRoutes } from '../../infrastructure/constants/userRouters'
const router=express.Router()


//dependency injectionnnn
const userRepository= new UserRepositoryImpl()
const categoryrepository= new categoryRepositoryImpl()
const techrepository= new TechRepositoryImpl()
const addressrepository= new AddressRepositoryImpl()
const bookingrepository= new bookingrepositoryImpl()
const transactionrepository = new TransactionRepositoryImpl();
const walletRepository= new walletRepositoryimpl()
const reviewrepository=new ReviewrepositoryImpl()

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
const walletdetails= new GetWallet(transactionrepository)
const walletbalce = new FetchWallet(walletRepository)
const walletpayconsultationFee= new WalletPayment(bookingrepository,walletRepository,transactionrepository)
const fetchingpendingsession=new FetchSession(bookingrepository)
const acceptingsession= new Acceptsession(bookingrepository)
const finalamounttopay= new FinalPayment(bookingrepository)
const confirmfinalpayment= new FinalPaymentconfirm(bookingrepository,walletRepository,transactionrepository,techrepository)
const gettransactionwithbookings=new GetTransactionWithBookings(transactionrepository, bookingrepository)
const fetchingreviewbytechfromuser= new FetchReviewByTechId(reviewrepository)
const addingreviewbyuser= new AddReview(reviewrepository)
const checkpaystatus= new CheckPaymentStatus(bookingrepository)

const authcontroller=new AuthController(
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
)

const profilecontroller= new ProfileController(
    getuserById,editprofile,
)

const techcontrollers=new TechControllers(
     fetchtechonavailble,
      fetchtechwithcat,
)

const categorycontroller=new CategoryController(
     getcategoryid,
)

const addresscontroller= new AddressController(
     addaddressed,
    editaddress,
    getaddressed,
    deleteaddress,
)

const bookingcontroller= new BookingController(
    createBookingUseCase,
    confirmPayment,
    fetchbook,
    handlefailpayment,
    retrypaymet,
    usercancelupdate,
    walletpayconsultationFee,
    fetchingpendingsession,
    acceptingsession,
    finalamounttopay,
    confirmfinalpayment,
    checkpaystatus
)

const walletcontroller= new WalletController(
     walletdetails,
    walletbalce,
)

const transactioncontroller=new TransactionController(
      
    gettransactionwithbookings,
)
const reviewcontroller= new ReviewCOntroller(
    fetchingreviewbytechfromuser,
    addingreviewbyuser,
)
const usercontroller= new UserController(
    passchange
)


router.post(UserRoutes.SIGNUP,(req,res)=>authcontroller.signup(req,res))
router.post(UserRoutes.LOGIN,(req,res)=>authcontroller.login(req,res))
router.post(UserRoutes.REFRESH,(req,res)=>authcontroller.refreshtokenController(req,res))
router.post(UserRoutes.VERIFYOTP,(req, res)=>authcontroller.verifyotpcontroller(req,res))
router.post(UserRoutes.RESENDOTP,(req,res)=>authcontroller.resendotpcontroller(req,res))
router.post(UserRoutes.GOOGLELOGIN, (req, res) => authcontroller.googleLoginController(req, res));
router.post(UserRoutes.CHECKEMAIL,(req,res)=>authcontroller.checkEmail(req,res))
router.post(UserRoutes.CHANGEPASSWORD,(req,res)=>authcontroller.changepassword(req,res))
router.post(UserRoutes.FORGETPASSWORDVERIFYOTP,(req,res)=>authcontroller.forgetpasswordVerifyOTP(req,res))
router.post(UserRoutes.FORGETRESENDOTP,(req,res)=>authcontroller.forgetpasswordresnedOTP(req,res))
router.get(UserRoutes.FETCHCATEGORY,(req,res)=>authcontroller.fetchCategory(req,res))



// router.use(authToken); 
router.get(UserRoutes.FETCHUSER,authToken,(req,res)=>profilecontroller.fetchUserById(req,res))
router.put(UserRoutes.UPDATEUSER,authToken,(req,res)=>profilecontroller.edituser(req,res))

router.get(UserRoutes.TECHAVAILABLE,authToken,(req,res)=>techcontrollers.fetchTechBasedonavailble(req,res))
router.get(UserRoutes.FETCHPARTICULARCATEGORY,authToken,(req,res)=>categorycontroller.fetchCategoryById(req,res))

router.get(UserRoutes.FETCHTECH,authToken,(req,res)=>techcontrollers.fetctechwithcat(req,res))

router.post(UserRoutes.ADDADDRESS,authToken,(req,res)=>addresscontroller.addUserAddress(req,res))
router.get(UserRoutes.FETCHADDRESS,authToken,(req,res)=>addresscontroller.getUserAddresses(req,res))
router.put(UserRoutes.EDITADDRESS,authToken, (req,res)=>addresscontroller.editUserAddress(req,res))
router.delete(UserRoutes.DELETEADDRESS,authToken,(Req,res)=>addresscontroller.deleteUserAddress(Req,res))

router.post(UserRoutes.CREATEORDER, authToken, (req, res) => bookingcontroller.createOrder(req, res));
router.post(UserRoutes.CONFIRMPAYMENT,authToken,(req,res)=>bookingcontroller.confirmpay(req,res))
router.get(UserRoutes.FETCHBOOKINGS, authToken,(req,res)=>bookingcontroller.fetchbookingsbyuserId(req,res))

router.post(UserRoutes.PASSWORD,authToken,(req,res)=>usercontroller.passwordChanges(req,res))

router.post(UserRoutes.PAYMENTFAILED,authToken,(req,res)=>bookingcontroller.Failedpayment(req,res))
router.post(UserRoutes.CONFIRMPAYMENT_RETRY,authToken,(req,res)=>bookingcontroller.retryconfirmpayment(req,res))
router.post(UserRoutes.UPDATECANCELREASON,authToken,(req,res)=>bookingcontroller.updatecancelreason(req,res))
router.post(UserRoutes.ACCEPTSESSIONREQUEST,authToken,(req,res)=>bookingcontroller.acceptsession(req,res))
router.get(UserRoutes.FETCHSESSIONS,authToken,(req,res)=>bookingcontroller.fetchsessionpending(req,res))
router.post(UserRoutes.FINALPAYMENTPROCESS,authToken,(req,res)=>bookingcontroller.finalamountbeforeconfirm(req,res))
router.post(UserRoutes.FINALCONFIRMPAYMENT,authToken,(req,res)=>bookingcontroller.finalpaymentconfirm(req,res))
router.post(UserRoutes.WALLETPAYMENT,authToken,(req,res)=>bookingcontroller.walletpaymentconsultationFee(req,res))
router.get(UserRoutes.PAYMENT_STATUS_CHECK,authToken,(req,res)=>bookingcontroller.checkPaymentStatus(req,res))


router.get(UserRoutes.FETCHWALLET,authToken,(req,res)=>walletcontroller.fetchdetailswallet(req,res))
router.get(UserRoutes.FETCHWALLETBALANCE,authToken,(req,res)=>walletcontroller.fetchbalance(req,res))


router.get(UserRoutes.FETCHTRANSACTIONS,authToken,(req,res)=>transactioncontroller.transactionwithBookings(req,res))

router.get(UserRoutes.FETCHREVIEW,authToken,(req,res)=>reviewcontroller.fetchreviewbytechIdfromUser(req,res))
router.post(UserRoutes.ADDREVIEW,authToken,(req,res)=>reviewcontroller.Addingreview(req,res))


export {router as userRouter}