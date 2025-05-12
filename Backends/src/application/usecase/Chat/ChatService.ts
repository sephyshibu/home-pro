
import { IMessage } from "../../../domain/models/Message";

import { Messagerepository } from "../../../domain/repository/Messagerepository";


export class ChatService{
    constructor(private messagerepository:Messagerepository){}

    async sendMessage(message: IMessage): Promise<void> {
      await this.messagerepository.save(message);
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

}