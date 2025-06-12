
import { IMessage } from "../../../domain/models/Message";

import { IMessagerepository } from "../../../domain/repository/Messagerepository";


export class ChatService{
    constructor(private _messagerepository:IMessagerepository){}

    async sendMessage(message: IMessage): Promise<IMessage> {
      const savedmessage=await this._messagerepository.save(message);
      return savedmessage
    }
  
    async getMessages(bookingId: string): Promise<IMessage[]> {
      return this._messagerepository.findByBookingId(bookingId);
    }

    async markmessagebybooking(bookingId:string){
      return this._messagerepository.markmessageasReadByBooking(bookingId)
    }
    async markmessagebymessageid(messageId:string){
      return this._messagerepository.markmessageasReadByMessageId(messageId)
    }

    async countUnreadMessages(bookingId: string, receiverId: string): Promise<number> {
  return this._messagerepository.countUnreadMessages(bookingId, receiverId);
}

async markMessagesAsRead(bookingId: string, receiverId: string): Promise<void> {
  return this._messagerepository.markMessagesAsRead(bookingId, receiverId);
}

// returns: [{ bookingId: string, count: number }]
async getUnreadCountsByBooking(userId: string): Promise<{ bookingId: string, count: number }[]> {
  
  return this._messagerepository.getUnreadMessageCounts(userId);
}


}