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
    });

     // Mark messages as read when the chat box is opened
     socket.on('chat-box-opened', async (bookingId: string) => {
      await messageUseCases.markmessagebybooking(bookingId); // Mark all messages as read
      io.to(bookingId).emit('messages-marked-as-read', bookingId); // Emit confirmation
    });

    // Mark individual message as read
    socket.on('mark-as-read', async (messageId: string) => {
      await messageUseCases.markmessagebymessageid(messageId); // Mark single message as read
      io.to(socket.id).emit('message-read', messageId); // Emit to the sender
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
