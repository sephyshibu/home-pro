import {App} from './app'
import { connectDB } from '../config/connectmongo'
import dotenv from 'dotenv'
import http from 'http'
import { initializeSocket } from '../infrastructure/socket';

dotenv.config()


// 🧠 Initialize Socket.IO with HTTP server



const PORT=process.env.PORT||3000;

const appInstance= new App()

const app=appInstance.app
const server=http.createServer(app)


initializeSocket(server);


connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log('server is running in POST')
    })
})

