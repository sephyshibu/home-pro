import {App} from './app'
import { connectDB } from '../config/connectmongo'
import dotenv from 'dotenv'

dotenv.config()

const PORT=process.env.PORT||3000;

const appInstance= new App()

const app=appInstance.app

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log('server is running in POST')
    })
})

