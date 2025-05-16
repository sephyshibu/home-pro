import express from 'express'
import { AdminController } from '../controllers/AdminController'
import { Login } from '../../application/usecase/Admin/LoginAdmin'
import { AdminRepositoryImpl } from '../../infrastructure/repository/AdminRepositoryImpl'
import { RefreshToken } from '../../application/usecase/Admin/RefreshToken'
import { fetchUser } from '../../application/usecase/Admin/FetchUser'
import { BlockUnblock } from '../../application/usecase/Admin/BlockUnblock'
import { UserRepositoryImpl } from '../../infrastructure/repository/UserRepositoryImpl'
import { TechRepositoryImpl } from '../../infrastructure/repository/TechRepositoryImpl'
import { Signuptech } from '../../application/usecase/Tech/Register'
import { fetchtech } from '../../application/usecase/Admin/FetchTech'
import { BlockUnBlock } from '../../application/usecase/Admin/BlockUnblockTech'
import { fetchCategory } from '../../application/usecase/Admin/Fetchcategory'
import { AddCategory } from '../../application/usecase/Category/AddCategory'
import { categoryRepositoryImpl } from '../../infrastructure/repository/CategoryRepositoryImpl'
import { BlockUnBlockCat } from '../../application/usecase/Admin/BlockUnBlockCategory'
import { EditCategory } from '../../application/usecase/Category/Editcategory'
import { GetCategoryById } from '../../application/usecase/Category/GetCategory'
import { Gettransactions } from '../../application/usecase/Transactions/GetTransaction'
import { TransactionRepositoryImpl } from '../../infrastructure/repository/TransactionRepositoryImpl'
import { GetTransactionWithBookings } from '../../application/usecase/Transactions/TransactionBookingdetails'
import { bookingrepositoryImpl } from '../../infrastructure/repository/BookingRepositoryImpl'
import { FetchrefundRequest } from '../../application/usecase/booking/fetchrefundbookings'
import { Refudaccept } from '../../application/usecase/booking/refundaccept'
import { walletRepositoryimpl } from '../../infrastructure/repository/WalletRepositoryimpl'
import { EmailService } from '../../application/service/EmailService'
import { authToken } from '../../infrastructure/middleware/CheckAdminStatus'
const router=express.Router()

const UserRepository=new UserRepositoryImpl()
const TechRepository = new TechRepositoryImpl()
const adminRepository= new AdminRepositoryImpl()
const categoryrepository=new categoryRepositoryImpl()
const transactionrepository=new TransactionRepositoryImpl()
const bookingrepository= new bookingrepositoryImpl()
const walletrepository=new walletRepositoryimpl()
const emailservices=new EmailService()

const loginadmin=new Login(adminRepository)
const refreshtoken= new RefreshToken()
const fetchallUser= new fetchUser(UserRepository)
const unblocblock= new BlockUnblock(UserRepository)
const fetchalltech= new fetchtech(TechRepository)
const unblockblocktech= new BlockUnBlock(TechRepository)
const addtech= new Signuptech(TechRepository,emailservices)
const fetchcat= new fetchCategory(categoryrepository)
const addcat= new AddCategory(categoryrepository)
const blockcat= new BlockUnBlockCat(categoryrepository)
const editcategory=new EditCategory(categoryrepository)
const getcategorybyId= new GetCategoryById(categoryrepository)
const gettransaction=new Gettransactions(transactionrepository)
const gettransactionwithbookings=new GetTransactionWithBookings(transactionrepository, bookingrepository)
const fetchrefundrequestwithremark= new FetchrefundRequest(bookingrepository)
const refundaccepted= new Refudaccept(bookingrepository,walletrepository)
const adminController= new AdminController(
    loginadmin,
    refreshtoken,
    fetchallUser,
    unblocblock,
    fetchalltech,
    unblockblocktech,
    addtech,
    addcat,
    fetchcat,
    blockcat,
    editcategory,
    getcategorybyId,
    gettransaction,
    gettransactionwithbookings,
    fetchrefundrequestwithremark,
    refundaccepted
   
)
console.log("adminrouter")
router.post('/login',(req,res)=>adminController.login(req,res))
router.get('/fetchuser',authToken,(req,res)=>adminController.fetchuser(req,res))
router.post('/refresh',(req,res)=>adminController.refreshtokenController(req,res))
router.post('/addtech',authToken,(req,res)=>adminController.signuptech(req,res))
router.patch('/user/:userid',authToken,(req,res)=>adminController.blockUnblock(req,res))
router.get('/fetchtech',authToken,(req,res)=>adminController.fetchtech(req,res))
router.patch('/tech/:techid',authToken,(req,res)=>adminController.blockunblocktechs(req,res))
router.get('/fetchcategory',authToken,(req,res)=>adminController.fetchCategory(req,res))
router.post('/addcategory',authToken,(req,res)=>adminController.addcategorys(req,res))
router.patch('/category/:catid',authToken,(req,res)=>adminController.blockunblockcatagory(req,res))
router.patch('/editcategory/:catid',authToken,(req,res)=>adminController.editcategory(req,res))
router.get('/category/:catid',authToken,(req,res)=>adminController.fetchCategoryById(req,res))
router.get('/fetchtransactions',authToken,(req,res)=>adminController.fetchTransaction(req,res))
router.get('/fetchtransactionwithBookings/:transId',authToken,(req,res)=>adminController.transactionwithBookings(req,res))
router.get('/fetchrefundreqall',authToken,(req,res)=>adminController.fetchingrequestrefund(req,res))
router.post('/acceptrefund/:bookingId',authToken,(req,res)=>adminController.acceptingrefund(req,res))



export {router as adminRouter}