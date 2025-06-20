import express from 'express'
import { techController } from '../controllers/TechController'
import { TechAuthController } from '../controllers/TechAuthController'
import { TechProfileController } from '../controllers/TechProfileController'
import { TechBookingController } from '../controllers/TechBookingController'





import { LoginTech } from '../../application/usecase/Tech/LoginTech'
import { RefreshToken } from '../../application/usecase/Tech/RefreshToken'
import { TechRepositoryImpl } from '../../infrastructure/repository/TechRepositoryImpl'
import { EditTech } from '../../application/usecase/Tech/MyProfile/Edittech'
import { GetTechById } from '../../application/usecase/Tech/MyProfile/TechDetails'
import { fetchCategory } from '../../application/usecase/Admin/Fetchcategory'
import { categoryRepositoryImpl } from '../../infrastructure/repository/CategoryRepositoryImpl'
import { authToken } from '../../infrastructure/middleware/CHeckTechStatus'
import { bookingrepositoryImpl } from '../../infrastructure/repository/BookingRepositoryImpl'
import { FetchBookingByTechId } from '../../application/usecase/booking/fetchBookingsByTech'
import { bookingRequestAcceptByTech } from '../../application/usecase/booking/requestaccept'
import { FetchUpcoming } from '../../application/usecase/booking/upcomingevents'
import { PasswordChange } from '../../application/usecase/Tech/Password/ChangePassword'
import { bookingRequestRejectByTech } from '../../application/usecase/booking/requestreject'
import { walletRepositoryimpl } from '../../infrastructure/repository/WalletRepositoryimpl'
import { RequestSession } from '../../application/usecase/Sessions/requestSession'
import { fetchBookingswhichcompletedrejected } from '../../application/usecase/booking/fetchcompletedrejected'
import { FetchTransactionsinTechWallet } from '../../application/usecase/Wallet/fetchtransactiondetailsintech'
import { TransactionRepositoryImpl } from '../../infrastructure/repository/TransactionRepositoryImpl'
import { GetTechDashboardStatsUseCase } from '../../application/usecase/Tech/Dashboard/dashboard'
import { FetchReviewByTechId } from '../../application/usecase/Review/fetchReview'
import { ReviewrepositoryImpl } from '../../infrastructure/repository/ReviewRepositoryImpl'
import { TechRoutes } from '../../infrastructure/constants/techRoutes'
const router=express.Router()

const techrepository= new TechRepositoryImpl()
const categoryrepository= new categoryRepositoryImpl()
const bookingrepository=new bookingrepositoryImpl()
const walletrepository= new walletRepositoryimpl()
const transactionrespository=new TransactionRepositoryImpl()
const reviewrepository=new ReviewrepositoryImpl()


const logintechs= new LoginTech(techrepository)
const refreshtoken= new RefreshToken()
const fetchTechById= new GetTechById(techrepository)
const editprofile=new EditTech(techrepository)
const fetchCategories=new fetchCategory(categoryrepository)
const fetchbookingbeforeacceptbytech= new FetchBookingByTechId(bookingrepository)
const requestacceptbytech= new bookingRequestAcceptByTech(bookingrepository)
const fetchupcmingevets= new FetchUpcoming(bookingrepository)
const passchnage= new PasswordChange(techrepository)
const requestrejectbytech= new bookingRequestRejectByTech(bookingrepository,walletrepository)
const requestsessionbytech= new RequestSession(bookingrepository)
const fetchcompleterejectbookings= new fetchBookingswhichcompletedrejected(bookingrepository)
const fetchtransactionintech= new FetchTransactionsinTechWallet(transactionrespository,bookingrepository)
const techdashboard=new GetTechDashboardStatsUseCase(techrepository)
const fetchreviews= new FetchReviewByTechId(reviewrepository)


const techAuthController=new TechAuthController(
    logintechs,
    refreshtoken,
)

const techprofileController= new TechProfileController(
     fetchTechById,
    editprofile,
    fetchCategories,
    passchnage,
)

const techbookingcontroller= new TechBookingController(
    fetchbookingbeforeacceptbytech,
    requestacceptbytech,
    fetchupcmingevets,
    
    requestrejectbytech,
    requestsessionbytech,
    fetchcompleterejectbookings,
)
const TechController= new techController(

   
    
    fetchtransactionintech,
    techdashboard,
    fetchreviews
    
)

router.post(TechRoutes.LOGIN,(req,res)=>techAuthController.login(req,res))
router.post(TechRoutes.REFRESH,(req,res)=>techAuthController.refreshtokenController(req,res))


router.get(TechRoutes.FETCHPROFILE,authToken,(req,res)=>techprofileController.fetchTechById(req,res))
router.put(TechRoutes.UPDATEPROFILE,authToken,(req,res)=>techprofileController.edittechs(req,res))
router.get(TechRoutes.FETCHCATEGORY,authToken,(req,res)=>techprofileController.fetchCategory(req,res))
router.post(TechRoutes.PASSWORD,authToken,(req,res)=>techprofileController.passwordChanges(req,res))


router.get(TechRoutes.FETCHTECHREQUEST,authToken,(req,res)=>techbookingcontroller.fetchRequestByTech(req,res))
router.post(TechRoutes.FETCHBOOKINGREQUEST, authToken,(req,res)=>techbookingcontroller.bookingrequest(req,res))
router.get(TechRoutes.UPCOMING_EVENTS, authToken,(req,res)=>techbookingcontroller.fetchupcomingevnts(req,res))
router.post(TechRoutes.REJECT_BOOKINGS,authToken,(req,res)=>techbookingcontroller.bookingsrejectedbytech(req,res))
router.post(TechRoutes.REQUEST_SESSIONS,authToken,(req,res)=>techbookingcontroller.requestressions(req,res))
router.get(TechRoutes.FETCH_BOOKINGS,authToken,(req,res)=>techbookingcontroller.completeandrejectbookings(req,res))


router.get(TechRoutes.FETCH_TRANSACTIONS,authToken,(req,res)=>TechController.fetchtransactiontechwallet(req,res))
router.get(TechRoutes.GETSTATSTECH,authToken,(req,res)=>TechController.getDashboardTechId(req,res))
router.get(TechRoutes.FETCH_REVIEW,(req,res)=>TechController.fetchreview(req,res))
export{router as techRouter}
