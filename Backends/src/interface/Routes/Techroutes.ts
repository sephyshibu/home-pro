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
const router=express.Router()

const techrepository= new TechRepositoryImpl()
const categoryrepository= new categoryRepositoryImpl()
const bookingrepository=new bookingrepositoryImpl()


const logintechs= new LoginTech(techrepository)
const refreshtoken= new RefreshToken()
const fetchTechById= new GetTechById(techrepository)
const editprofile=new EditTech(techrepository)
const fetchCategories=new fetchCategory(categoryrepository)
const fetchbookingbeforeacceptbytech= new FetchBookingByTechId(bookingrepository)


const TechController= new techController(
    logintechs,
    refreshtoken,
    fetchTechById,
    editprofile,
    fetchCategories,
    fetchbookingbeforeacceptbytech
)

router.post('/login',(req,res)=>TechController.login(req,res))



router.get('/fetchtechprofile/:techId',authToken,(req,res)=>TechController.fetchTechById(req,res))
router.put('/updatetech/:techId',authToken,(req,res)=>TechController.edittechs(req,res))
router.get('/fetchcategories',authToken,(req,res)=>TechController.fetchCategory(req,res))
router.get('/request/:techId',authToken,(req,res)=>TechController.fetchRequestByTech(req,res))
export{router as techRouter}
