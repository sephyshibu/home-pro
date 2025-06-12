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
    usercancelupdate,
    walletdetails,
    walletbalce,
    walletpayconsultationFee,
    fetchingpendingsession,
    acceptingsession,
    finalamounttopay,
    confirmfinalpayment,
    gettransactionwithbookings,
    fetchingreviewbytechfromuser,
    addingreviewbyuser,
    checkpaystatus
  
    

)


router.post(UserRoutes.SIGNUP,(req,res)=>usercontroller.signup(req,res))
router.post(UserRoutes.LOGIN,(req,res)=>usercontroller.login(req,res))
router.post(UserRoutes.REFRESH,(req,res)=>usercontroller.refreshtokenController(req,res))
router.post(UserRoutes.VERIFYOTP,(req, res)=>usercontroller.verifyotpcontroller(req,res))
router.post(UserRoutes.RESENDOTP,(req,res)=>usercontroller.resendotpcontroller(req,res))
router.post(UserRoutes.GOOGLELOGIN, (req, res) => usercontroller.googleLoginController(req, res));
router.post(UserRoutes.CHECKEMAIL,(req,res)=>usercontroller.checkEmail(req,res))
router.post(UserRoutes.CHANGEPASSWORD,(req,res)=>usercontroller.changepassword(req,res))
router.post(UserRoutes.FORGETPASSWORDVERIFYOTP,(req,res)=>usercontroller.forgetpasswordVerifyOTP(req,res))
router.post(UserRoutes.FORGETRESENDOTP,(req,res)=>usercontroller.forgetpasswordresnedOTP(req,res))
router.get(UserRoutes.FETCHCATEGORY,(req,res)=>usercontroller.fetchCategory(req,res))



// router.use(authToken); 
router.get(UserRoutes.FETCHUSER,authToken,(req,res)=>usercontroller.fetchUserById(req,res))
router.put(UserRoutes.UPDATEUSER,authToken,(req,res)=>usercontroller.edituser(req,res))
router.get(UserRoutes.TECHAVAILABLE,authToken,(req,res)=>usercontroller.fetchTechBasedonavailble(req,res))
router.get(UserRoutes.FETCHPARTICULARCATEGORY,authToken,(req,res)=>usercontroller.fetchCategoryById(req,res))
router.get(UserRoutes.FETCHTECH,authToken,(req,res)=>usercontroller.fetctechwithcat(req,res))
router.post(UserRoutes.ADDADDRESS,authToken,(req,res)=>usercontroller.addUserAddress(req,res))
router.get(UserRoutes.FETCHADDRESS,authToken,(req,res)=>usercontroller.getUserAddresses(req,res))
router.put(UserRoutes.EDITADDRESS,authToken, (req,res)=>usercontroller.editUserAddress(req,res))
router.delete(UserRoutes.DELETEADDRESS,authToken,(Req,res)=>usercontroller.deleteUserAddress(Req,res))
router.post(UserRoutes.CREATEORDER, authToken, (req, res) => usercontroller.createOrder(req, res));
router.post(UserRoutes.CONFIRMPAYMENT,authToken,(req,res)=>usercontroller.confirmpay(req,res))
router.get(UserRoutes.FETCHBOOKINGS, authToken,(req,res)=>usercontroller.fetchbookingsbyuserId(req,res))
router.post(UserRoutes.PASSWORD,authToken,(req,res)=>usercontroller.passwordChanges(req,res))
router.post(UserRoutes.PAYMENTFAILED,authToken,(req,res)=>usercontroller.Failedpayment(req,res))
router.post(UserRoutes.CONFIRMPAYMENT_RETRY,authToken,(req,res)=>usercontroller.retryconfirmpayment(req,res))
router.post(UserRoutes.UPDATECANCELREASON,authToken,(req,res)=>usercontroller.updatecancelreason(req,res))
router.get(UserRoutes.FETCHWALLET,authToken,(req,res)=>usercontroller.fetchdetailswallet(req,res))
router.get(UserRoutes.FETCHWALLETBALANCE,authToken,(req,res)=>usercontroller.fetchbalance(req,res))
router.post(UserRoutes.WALLETPAYMENT,authToken,(req,res)=>usercontroller.walletpaymentconsultationFee(req,res))
router.post(UserRoutes.ACCEPTSESSIONREQUEST,authToken,(req,res)=>usercontroller.acceptsession(req,res))
router.get(UserRoutes.FETCHSESSIONS,authToken,(req,res)=>usercontroller.fetchsessionpending(req,res))
router.post(UserRoutes.FINALPAYMENTPROCESS,authToken,(req,res)=>usercontroller.finalamountbeforeconfirm(req,res))
router.post(UserRoutes.FINALCONFIRMPAYMENT,authToken,(req,res)=>usercontroller.finalpaymentconfirm(req,res))
router.get(UserRoutes.FETCHTRANSACTIONS,authToken,(req,res)=>usercontroller.transactionwithBookings(req,res))
router.get(UserRoutes.FETCHREVIEW,authToken,(req,res)=>usercontroller.fetchreviewbytechIdfromUser(req,res))
router.post(UserRoutes.ADDREVIEW,authToken,(req,res)=>usercontroller.Addingreview(req,res))
router.get(UserRoutes.PAYMENT_STATUS_CHECK,authToken,(req,res)=>usercontroller.checkPaymentStatus(req,res))

export {router as userRouter}