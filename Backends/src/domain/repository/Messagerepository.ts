import { IMessage } from "../models/Message";

export interface Messagerepository{
    create(message: Omit<IMessage, "_id" | "createdAt">): Promise<IMessage>;
    findByConversationId(conversationId:string):Promise<IMessage[]>
}