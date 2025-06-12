import { IMessage } from "../models/Message";

export interface IMessagerepository{
    findByBookingId(bookingId:string):Promise<IMessage[]>
    save(message:IMessage):Promise<IMessage>
    markmessageasReadByBooking(bookingId:string):Promise<void>
    markmessageasReadByMessageId(messageId:string):Promise<void>
    
  countUnreadMessages(bookingId: string, receiverId: string): Promise<number>;
  markMessagesAsRead(bookingId: string, receiverId: string): Promise<void>;
  getUnreadMessageCounts(userId: string): Promise<{ bookingId: string, count: number }[]> 
}