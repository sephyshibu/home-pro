import mongoose,{Schema,Document} from "mongoose";
import { IAdmin } from "../../../domain/models/Admin";


const adminSchema=new mongoose.Schema<IAdmin>({
    email:{
        type:String,
        required:true,
      
    },
    password:{
        type:String,
        required:false
        
    },
})

export const AdminModel=mongoose.model<IAdmin>("Admin",adminSchema)