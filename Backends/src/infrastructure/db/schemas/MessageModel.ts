import mongoose,{Schema,Document} from "mongoose";
import { IMessage } from "../../../domain/models/Message";

const Messagemodel=new mongoose.Schema<IMessage>({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Tech", required: true },
    message:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:()=>new Date()
    },
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
        required:true
    },
    isRead:{
        type:Boolean,
        default:false
    }


},  { timestamps: true })

export const MessageModel= mongoose.model<IMessage>("Messaging", Messagemodel);