// models/BookingModel.ts
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  technicianId: { type: mongoose.Types.ObjectId, required: true },
  addressId: { type: mongoose.Types.ObjectId, required: true },
  location: {
    lat: Number,
    lng: Number,
  },
  booked_date: String,
  rateperhour:Number,
  workstatus: { type: String, enum: ['pending', 'progress', 'paused', 'completed'], default: 'pending' },
  totalhours:Number,
  isStartAccept:{type:Boolean ,default:false},
  isEndAccept:{type:Boolean ,default:false},
  ispauseAccept:{type:Boolean ,default:false},
  isconfirmedByTech:{ type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  techremark:String, 
  userremark:String,
  pincode:String,
  consultationFee: Number,
  workTime: [
    {
      start: Date,
      end: Date,
    },
  ],
  workFinalAmount: Number,
  totalFinalAmount: Number,
  admincommision:Number,
  techcommission:Number,
  consultationpaymethod: { type: String, enum: ['RazorPay', 'Wallet'], default: '' },
  finalpaymethod: { type: String, enum: ['RazorPay', 'Wallet'], default: '' },
  consultationpayStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  finalpayStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  razorpayPaymentId: String,
  razorpayFinalPaymentId:String,
  consultationtransactionId:String, 
  finalpaymenttransactionId:String,
}, {
  timestamps: true,
});

export default mongoose.model("Booking", bookingSchema);
