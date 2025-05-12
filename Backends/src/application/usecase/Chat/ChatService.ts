
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

}