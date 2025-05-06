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

    async fetchtransaction(): Promise<ITransaction[]>{
      const result=await TransactionModel.find()
      .sort({createdAt:-1})
      .populate({
        path: "referenceId",
        populate: {
          path: "userId",
          select: "name", // Only name field from user
        },
      });
  
      return result

        
    }

    async findById(id: string): Promise<ITransaction | null> {
      return await TransactionModel.findById(id);
    }
  }