import mongoose, { Schema, Document } from "mongoose";
import { ITransaction } from "../../../domain/models/Transactions";


const transactionSchema = new mongoose.Schema<ITransaction>({
  ownerId: { type: Schema.Types.ObjectId, required: true, ref: 'Wallet' },
  userType: { type: String, enum: ['user', 'technician', 'admin'], required: true },
  referenceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Booking'},
  type: { type: String, enum: ['CREDIT', 'DEBIT'], required: true },
  method: { type: String, enum: ['RazorPay', 'Wallet'], required: true },
  status: { type: String, enum: ['success', 'failed'], required: true },
  purpose: { type: String, required: true },
  amount: { type: Number, required: true },
  techniciancommision:{type:Number,required:false, default:0},
  admincommission:{type:Number, required:false, default:0}

}, { timestamps: true });

export const TransactionModel = mongoose.model<ITransaction>('Transaction', transactionSchema);
