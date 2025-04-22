import mongoose,{Types,Schema,Document} from "mongoose";

import { UserType } from "../../../domain/models/Wallet";

export interface WalletDocument extends Document{
     _id:Types.ObjectId,
    ownerId:mongoose.Types.ObjectId;
    userType:UserType,
    balance:number
}

const walletSchema = new Schema<WalletDocument>({
    ownerId: { type: Schema.Types.ObjectId, required: true, refPath: 'userType' },
    userType: { type: String, enum: ['user', 'technician', 'admin'], required: true },
    balance: { type: Number, default: 0 },
  });
  
export const WalletModel = mongoose.model<WalletDocument>('Wallet', walletSchema);