import { TransactionRepository } from "../../domain/repository/Transsactionrepository";
import { ITransaction } from "../../domain/models/Transactions";
import { TransactionModel } from "../db/schemas/TransactionMode";
import mongoose from "mongoose";
export class TransactionRepositoryImpl implements TransactionRepository {
    async create(transaction: Omit<ITransaction, "id">): Promise<ITransaction> {
        console.log("efewf")
      const newTx = await TransactionModel.create(transaction);
      const saved = await newTx.save();
      return {
        id: (saved._id as mongoose.Types.ObjectId).toString(),
        ...transaction,
      };
    }
  
    async getByOwnerId(ownerId: string): Promise<ITransaction[]> {
      const transactions = await TransactionModel.find({ ownerId }) ;
      return transactions.map((tx) => ({
        id: (tx._id as mongoose.Types.ObjectId).toString(),
        ownerId: tx.ownerId.toString(),
        userType: tx.userType,
        referenceId: tx.referenceId,
        type: tx.type,
        method: tx.method,
        status: tx.status,
        purpose: tx.purpose,
        amount: tx.amount,

      }));
    }
  }