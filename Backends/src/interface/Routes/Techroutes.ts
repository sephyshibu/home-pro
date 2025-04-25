import express from 'express'
import { techController } from '../controllers/TechController'
import { LoginTech } from '../../application/usecase/Tech/LoginTech'
import { RefreshToken } from '../../application/usecase/Tech/RefreshToken'
import { TechRepositoryImpl } from '../../infrastructure/repository/TechRepositoryImpl'


const router=express.Router()

const techrepository= new TechRepositoryImpl()
const logintechs= new LoginTech(techrepository)
const refreshtoken= new RefreshToken()


const TechController= new techController(
    logintechs,
    refreshtoken
)

router.post('/login',(req,res)=>TechController.login(req,res))

export{router as techRouter}
