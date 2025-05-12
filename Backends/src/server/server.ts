import {App} from './app'
import { connectDB } from '../config/connectmongo'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io';
import { initSocket } from '../infrastructure/socket';

dotenv.config()


// 🧠 Initialize Socket.IO with HTTP server



const PORT=process.env.PORT||3000;

const appInstance= new App()

const app=appInstance.app
const server=http.createServer(app)

// ✅ Create Socket.IO server from HTTP server
const io = new Server(server, {
    cors: {
      origin: '*', // allow frontend to connect
      methods: ['GET', 'POST']
    }
  });
initSocket(io);


connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log('server is running in POST')
    })
})

