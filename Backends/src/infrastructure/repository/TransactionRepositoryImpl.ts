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
      console.log("ownerId",ownerId)
      const objectId = new mongoose.Types.ObjectId(ownerId); // ✅ cast to ObjectId

      const transactions = await TransactionModel.find({ ownerId: objectId });
      console.log("igsdi",transactions)
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
        admincommission:tx.admincommission,
        techniciancommision:tx.techniciancommision

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

    async getbyTechnicianId(techId: string): Promise<ITransaction[] | null> {
        const transactions=await TransactionModel.find()
                                                  .populate({
                                                    path:"referenceId",
                                                    model:"Booking",
                                                    select:"technicianId userId workstatus",
                                                    populate:{
                                                             path:"userId",
                                                             model:"User",
                                                            select:"name"
                                                    }
                                                  })
                                                  
        console.log("transactions",transactions)
        const filteredTransactions = transactions.filter((tx) => {
          const booking = tx.referenceId as any;
          return (
            booking?.technicianId?.toString() === techId &&
            booking?.workstatus === "completed"
          );
        });
      
        // Map to final response format, including username
        return filteredTransactions.map((tx) => {
          const booking = tx.referenceId as any;
          const username = booking?.userId?.name || "Unknown";
      
          return {
            id: (tx._id as mongoose.Types.ObjectId).toString(),
            ownerId: tx.ownerId.toString(),
            userType: tx.userType,
            referenceId:
              tx.referenceId instanceof mongoose.Types.ObjectId
                ? tx.referenceId.toString()
                : booking._id.toString(),
            type: tx.type,
            method: tx.method,
            status: tx.status,
            purpose: tx.purpose,
            amount: tx.amount,
            admincommission: tx.admincommission,
            techniciancommision: tx.techniciancommision,
            username,
          };
        });
    }
  }