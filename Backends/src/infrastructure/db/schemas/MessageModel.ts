import mongoose,{Schema,Document} from "mongoose";
import { IMessage } from "../../../domain/models/Message";

const Messagemodel=new mongoose.Schema<IMessage>({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    senderId:{type:String, required:true},
    message:{type:String,required:true}

},{timestamps:true})

export const MessageModel= mongoose.model<IMessage>("Messages", Messagemodel);