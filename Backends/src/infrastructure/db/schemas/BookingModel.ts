// models/BookingModel.ts
import mongoose,{Schema,Document} from "mongoose";
import { IBooking } from "../../../domain/models/Bookings";
import { timeStamp } from "console";

const BookingModel = new mongoose.Schema<IBooking>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref:"User",required: true },
  technicianId: { type: mongoose.Types.ObjectId,ref:"Tech", required: true },
  addressId: { type: mongoose.Types.ObjectId, ref:"Address",required: true },
  location: {
    lat:{type:Number},
    lng: {type:Number},
  },
  booked_date: {type:String}, 
  rateperhour:{type:Number}, 
  workstatus: { type: String, enum: ['pending', 'progress', 'paused', 'completed'], default: 'pending' },
  totalhours:{type:Number},
  isStartAccept:{type:Boolean ,default:null},
  isEndAccept:{type:Boolean ,default:null},
  isPauseAccept:{type:Boolean ,default:null},
  isconfirmedbyTech:{ type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  techremark:{type:String,default:""}, 
  userremark:{type:String,default:""}, 
  pincode:{type:String}, 
  consultationFee:{type:Number}, 
  sessionRequests: [
    {
      types: {
        type: String,
        enum: ['start', 'pause', 'resume', 'end'],
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
      requestedAt: { type: Date, default: Date.now },
      responseAt: { type: Date },
      reason: { type: String }, // Optional rejection reason
    },
  ],
  
  workTime: [
    {
      start: { type: Date },
      end: { type: Date }
    }
  ],
  workFinalAmount:{type:Number},
  totalFinalAmount:{type:Number},
  admincommision:{type:Number},
  techcommision:{type:Number},
  consultationpaymethod: { type: String, enum: ['RazorPay', 'Wallet'], default: 'RazorPay' },
  finalpaymethod: { type: String, enum: ['RazorPay', 'Wallet'], default: 'RazorPay' },
  consultationpayStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  finalpayStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  razorpayPaymentId: String,
  razorpayFinalPaymentId:{type:String,default:""}, 
  consultationtransactionId:{type:String,default:""}, 
  finalpaymenttransactionId:{type:String,default:""}, 
  refundrequestAccept:{type:Boolean, default:false},

});

export const BookingModels= mongoose.model<IBooking>("Booking", BookingModel);
