import { Types } from "mongoose";

export interface IMessage{
    _id:string, 
    conversationId:Types.ObjectId,
    senderId:string,
    message:string,
    seen:boolean,
    createdAt:Date
}