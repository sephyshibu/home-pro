import express ,{Application} from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { userRouter } from '../interface/Routes/UserRoutes'
import { adminRouter } from '../interface/Routes/Adminroutes';
import { techRouter } from '../interface/Routes/Techroutes';

export class App{
    public app:Application;

    constructor(){
        dotenv.config()
        this.app=express()
        this.setMiddleware()
        this.setRoutes()
        
    }

    private setMiddleware():void{
        this.app.use(cors({
            origin: ['http://localhost:5173', 'http://localhost:5174','http://localhost:5175','https://www.home-pro.sephy.live'],
            credentials:true
        }))
        this.app.use(express.json())
        this.app.use(cookieParser())
     
    }

    private setRoutes():void{
        this.app.use('/',userRouter)
        this.app.use('/admin', adminRouter)
        this.app.use('/tech',techRouter)
    }
}