import { IConversation } from "../../../domain/models/Converstaion";
import { IMessage } from "../../../domain/models/Message";
import { ConversationRepository } from "../../../domain/repository/Conversationrepository";
import { Messagerepository } from "../../../domain/repository/Messagerepository";
import { Types } from "mongoose";

export class ChatService{
    constructor(private conversationrepository:ConversationRepository, private messagerepository:Messagerepository){}

    async getorcreateconverstaion(user1:string,user2:string):Promise<IConversation>{
        return await this.conversationrepository.findOrCreateConversation(user1,user2)
    }

    async getMessagesForConversation(conversationId: string): Promise<IMessage[]> {
        return await this.messagerepository.findByConversationId(conversationId);
    }

    async sendMessage(conversationId: string, senderId: string, message: string): Promise<IMessage> {
        return await this.messagerepository.create({  conversationId: new Types.ObjectId(conversationId), 
                                                     senderId, message ,seen:false});
      }



}