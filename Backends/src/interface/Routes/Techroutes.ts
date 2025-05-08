import express from 'express'
import { techController } from '../controllers/TechController'
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
const router=express.Router()

const techrepository= new TechRepositoryImpl()
const categoryrepository= new categoryRepositoryImpl()
const bookingrepository=new bookingrepositoryImpl()
const walletrepository= new walletRepositoryimpl()


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
const TechController= new techController(
    logintechs,
    refreshtoken,
    fetchTechById,
    editprofile,
    fetchCategories,
    fetchbookingbeforeacceptbytech,
    requestacceptbytech,
    fetchupcmingevets,
    passchnage,
    requestrejectbytech,
    requestsessionbytech
)

router.post('/login',(req,res)=>TechController.login(req,res))
router.post('/refresh',(req,res)=>TechController.refreshtokenController(req,res))


router.get('/fetchtechprofile/:techId',authToken,(req,res)=>TechController.fetchTechById(req,res))
router.put('/updatetech/:techId',authToken,(req,res)=>TechController.edittechs(req,res))
router.get('/fetchcategories',authToken,(req,res)=>TechController.fetchCategory(req,res))
router.get('/request/:techId',authToken,(req,res)=>TechController.fetchRequestByTech(req,res))
router.post('/request/:bookingId', authToken,(req,res)=>TechController.bookingrequest(req,res))
router.get('/upcmingevents/:techId', authToken,(req,res)=>TechController.fetchupcomingevnts(req,res))
router.post('/password/:techId',authToken,(req,res)=>TechController.passwordChanges(req,res))
router.post('/rejectbookings/:bookingId',authToken,(req,res)=>TechController.bookingsrejectedbytech(req,res))
router.post('/requestsession/:bookingId',authToken,(req,res)=>TechController.requestressions(req,res))
export{router as techRouter}
