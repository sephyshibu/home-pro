import mongoose,{Schema,Document} from "mongoose";
import { IReview } from "../../../domain/models/Review";


const ReviewSchema=new mongoose.Schema<IReview>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        default:null
    },
    techId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tech",
        required:true,
        default:null
    },
    description:{
        type:String,
        required:true,
        default:""
    },
    points:{
        type:Number,
        required:true,
        default:0
    }
})

export const ReviewModel=mongoose.model<IReview>("Reviews",ReviewSchema)