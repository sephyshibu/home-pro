import mongoose ,{Schema,Document} from "mongoose";
import { ITech } from "../../../domain/models/Tech";


const TechSchema= new mongoose.Schema<ITech>({
    name:{
        type:String,
        required:false,
        default: ""
    },
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password:{
        type:String,
        required:true
        
    },
    phone:{
        type:String,
        unique:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    rateperhour:{
        type:Number,
        default:0
    },
    serviceablepincode:{
        type:[String],
        default:[]
    },
    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        required:false,
        default:null
    },
    noofworks:{
        type:Number,
        default:0
    },
    profileimgurl: {
      type: String,
      default: "",
    },
    workphotos: {
      type: [String],
      default: [],
    },
    consulationFee: {
        type: Number,
        default: 0,
    },
    isAvailable: {
        type: Boolean,
        default: false,
    },
    availableSlots:[
        {
            date:{type :String, required:true}
        }
    ],
    role:{
        type:String,
        default:""
    }

})

export const TechModel=mongoose.model<ITech>("Tech",TechSchema)