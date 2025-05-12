import { IMessage } from "../models/Message";

export interface Messagerepository{
    findByBookingId(bookingId:string):Promise<IMessage[]>
    save(message:IMessage):Promise<void>
    markmessageasReadByBooking(bookingId:string):Promise<void>
    markmessageasReadByMessageId(messageId:string):Promise<void>
}