import { IMessage } from "../../domain/models/Message";
import { Messagerepository } from "../../domain/repository/Messagerepository";
import { MessageModel } from "../db/schemas/MessageModel";

export class MessagerepositoryImpl implements Messagerepository{
    async create(message: Omit<IMessage, "_id" | "createdAt">): Promise<IMessage> {
        const newMsg = await MessageModel.create(message);
        return newMsg.toObject();
      }
    
      async findByConversationId(conversationId: string): Promise<IMessage[]> {
        return await MessageModel.find({ conversationId }).sort({ createdAt: 1 });
      }
}