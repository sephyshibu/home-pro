
import { IMessage } from "../../../domain/models/Message";

import { Messagerepository } from "../../../domain/repository/Messagerepository";


export class ChatService{
    constructor(private messagerepository:Messagerepository){}

    async sendMessage(message: IMessage): Promise<IMessage> {
      const savedmessage=await this.messagerepository.save(message);
      return savedmessage
    }
  
    async getMessages(bookingId: string): Promise<IMessage[]> {
      return this.messagerepository.findByBookingId(bookingId);
    }

    async markmessagebybooking(bookingId:string){
      return this.messagerepository.markmessageasReadByBooking(bookingId)
    }
    async markmessagebymessageid(messageId:string){
      return this.messagerepository.markmessageasReadByMessageId(messageId)
    }

    async countUnreadMessages(bookingId: string, receiverId: string): Promise<number> {
  return this.messagerepository.countUnreadMessages(bookingId, receiverId);
}

async markMessagesAsRead(bookingId: string, receiverId: string): Promise<void> {
  return this.messagerepository.markMessagesAsRead(bookingId, receiverId);
}

// returns: [{ bookingId: string, count: number }]
async getUnreadCountsByBooking(userId: string): Promise<{ bookingId: string, count: number }[]> {
  return this.messagerepository.getUnreadMessageCounts(userId);
}


}