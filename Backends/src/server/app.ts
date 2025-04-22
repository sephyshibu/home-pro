import express ,{Application} from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import { userRouter } from '../interface/Routes/UserRoutes'


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
            origin: ['http://localhost:5173', 'http://localhost:5174'],
            credentials:true
        }))
        this.app.use(express.json())
    }

    private setRoutes():void{
        this.app.use('/',userRouter)
    }
}