import mongoose,{Schema,Document} from "mongoose";
import { ICategory } from "../../../domain/models/Caegory";

const CategorySchema=new mongoose.Schema<ICategory>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        
    }, 
    image:{
        type:String,
        
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
})

export const CategoryModel=mongoose.model<ICategory>("Category",CategorySchema)