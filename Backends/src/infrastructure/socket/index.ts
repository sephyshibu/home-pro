import {Server} from 'socket.io'
import http from 'http'
import { ChatService } from '../../application/usecase/Chat/ChatService'
import { ConversationModelImpl } from '../repository/ConversationrepositoryImpl'
import { MessagerepositoryImpl } from '../repository/MessageImpl'

export const initializeSocket = (server: http.Server) => {
    console.log("sockettt")
    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:5175","http://localhost:5174"] ,// your frontend URL
        methods: ["GET", "POST"]
      }
    });
  
    const chatService = new ChatService(
      new ConversationModelImpl(),
      new MessagerepositoryImpl()
    );
  
    io.on("connection", (socket) => {
      console.log("User connected");
  
      socket.on("join_room", async ({ userId, receiverId }) => {
        const conversation = await chatService.getorcreateconverstaion(userId, receiverId);
        socket.join(conversation._id.toString());
      });
  
      socket.on("send_message", async ({ senderId, receiverId, message }) => {
        const conversation = await chatService.getorcreateconverstaion(senderId, receiverId);
        const newMessage = await chatService.sendMessage(conversation._id, senderId, message);
  
        io.to(conversation._id.toString()).emit("receive_message", newMessage);
      });
  
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  };