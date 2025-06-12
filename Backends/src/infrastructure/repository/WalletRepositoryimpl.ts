import { IWallet } from "../../domain/models/Wallet";
import { IwalletRepository } from "../../domain/repository/Walletrepository";
import { WalletModel } from "../db/schemas/Walletmodel";
import mongoose from "mongoose";
export class walletRepositoryimpl implements IwalletRepository{
    async createWallet(wallet:Omit<IWallet,"id">):Promise<IWallet>{
        const newWallet=new WalletModel(wallet)
        const saved= await newWallet.save()

        return{
            id:saved._id.toString(),
            ownerId:saved.ownerId.toString(),
            userType:saved.userType,
            balance:saved.balance

        };
    }
    async findById(ownerId: string): Promise<IWallet | null> {
        try {
          // Find the wallet by ID, return null if not found

          if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            throw new Error("Invalid wallet ID format");
        }
        const wallet = await WalletModel.findOne({ ownerId }).exec();
        console.log("Wallet dep:", wallet);
        // Cast the result to IWallet interface
        if (wallet) {
            return {
            id: wallet._id.toString(),
            ownerId: wallet.ownerId.toString(),
            userType: wallet.userType,
            balance: wallet.balance,
            };
        }

        return null;
        } catch (error:any) {
        throw new Error(`Error finding wallet: ${error.message}`);
        }
    }
    async increasebalance(ownerId: string, amount: number): Promise<void> {
        await WalletModel.updateOne({ownerId},{$inc:{balance:amount}}).exec()
    }

    async decreasebalance(ownerId: string, amount: number): Promise<void> {
        console.log("decreased")
        await WalletModel.updateOne({ownerId},{$inc:{balance:-amount}})
    }
}