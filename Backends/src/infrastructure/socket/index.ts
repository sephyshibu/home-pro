import {Server,Socket} from 'socket.io'
import http from 'http'
import { ChatService } from '../../application/usecase/Chat/ChatService'
import { MessagerepositoryImpl } from '../repository/MessageImpl'


const messageUseCases = new ChatService(new MessagerepositoryImpl());
export const initSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join booking room
    socket.on('join-room', (bookingId: string) => {
      socket.join(bookingId);
    });

    // Handle send message
    socket.on('send-message', async (message) => {
      await messageUseCases.sendMessage(message);
      io.to(message.bookingId).emit('receive-message', message);
      
      
      if (message.senderId !== message.receiverId) { // Avoid notifying the sender
        io.to(message.receiverId).emit('notify', {
          title: 'New Message',
          body: message.message,
          bookingId: message.bookingId,
        });
      }
    });

    // Fetch all messages
    socket.on('fetch-messages', async (bookingId: string, callback) => {
      const messages = await messageUseCases.getMessages(bookingId);
      callback(messages);
    });
    


    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
