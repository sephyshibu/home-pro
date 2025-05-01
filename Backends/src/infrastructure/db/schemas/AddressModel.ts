import mongoose ,{Schema,Document} from "mongoose";
import { IAddress } from "../../../domain/models/Address";


const AddressSchema= new mongoose.Schema<IAddress>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false,
        default:null
    },
    types:{
        type:String,
        required:true,
        default: ""
    },
    addressname:{
        type:String,
        required:true,
        unique:true
    }, 
    street:{
        type:String,
        required:true
        
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    }

})

export const AddressModel=mongoose.model<IAddress>("Address",AddressSchema)