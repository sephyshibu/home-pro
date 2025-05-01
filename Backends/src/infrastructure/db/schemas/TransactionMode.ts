import mongoose, { Schema, Document } from "mongoose";

export interface TransactionDocument extends Document {
  ownerId: mongoose.Types.ObjectId;
  userType: 'user' | 'technician' | 'admin';
  referenceId: string;
  type: 'CREDIT' | 'DEBIT';
  method: 'RazorPay' | 'Wallet';
  status: 'success' | 'failed';
  purpose: string;
  amount: number;
}

const transactionSchema = new Schema<TransactionDocument>({
  ownerId: { type: Schema.Types.ObjectId, required: true, ref: 'Wallet' },
  userType: { type: String, enum: ['user', 'technician', 'admin'], required: true },
  referenceId: { type: String, required: true },
  type: { type: String, enum: ['CREDIT', 'DEBIT'], required: true },
  method: { type: String, enum: ['RazorPay', 'Wallet'], required: true },
  status: { type: String, enum: ['success', 'failed'], required: true },
  purpose: { type: String, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

export const TransactionModel = mongoose.model<TransactionDocument>('Transaction', transactionSchema);
