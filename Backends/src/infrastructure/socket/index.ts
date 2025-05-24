import {Server,Socket} from 'socket.io'
import http from 'http'
import { ChatService } from '../../application/usecase/Chat/ChatService'
import { MessagerepositoryImpl } from '../repository/MessageImpl'
import { MessageModel } from '../db/schemas/MessageModel'

const messageUseCases = new ChatService(new MessagerepositoryImpl());
export const initSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
   

    // Join booking room
    socket.on('join-room', (bookingId: string) => {
      socket.join(bookingId);
    });

    // Handle send message
    socket.on('send-message', async (message) => {
      
      const savedmessage=await messageUseCases.sendMessage(message);
      io.to(savedmessage.bookingId.toString()).emit('receive-message', message);
          const unreadCount = await messageUseCases.countUnreadMessages(
          message.bookingId,
          message.receiverId
        );

      socket.to(savedmessage.bookingId.toString()).emit('new_unread', {
          bookingId: savedmessage.bookingId,
          unreadCount,
          
        });
    });

    socket.on('get-unread-counts', async (userId: string, callback) => {
    const unreadCounts = await messageUseCases.getUnreadCountsByBooking(userId);
    
    callback(unreadCounts);
  });


//this is needed below one chat ioepned


     // Mark messages as read when the chat box is opened
    socket.on('chat-box-opened', async (bookingId: string) => {
      await messageUseCases.markmessagebybooking(bookingId); // Mark all messages as read
      io.to(bookingId).emit('messages-marked-as-read', bookingId); // Emit confirmation
    });

    // Mark individual message as read
   socket.on('mark_read', async ({ userId, bookingId }) => {
    await MessageModel.updateMany(
      { receiverId: userId, bookingId, isRead: false },
      { $set: { isRead: true } }
    );

    // Notify sender to remove unread dot if needed
    socket.to(bookingId).emit('messages_read', { bookingId });
  });

    // Fetch all messages
    socket.on('fetch-messages', async (bookingId: string, callback) => {
      const messages = await messageUseCases.getMessages(bookingId);
      callback(messages);
    });
    


    socket.on('disconnect', () => {
    console.log("disconnect")
    });
  });
};
