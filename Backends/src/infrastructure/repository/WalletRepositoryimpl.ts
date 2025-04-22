import { IWallet } from "../../domain/models/Wallet";
import { walletRepository } from "../../domain/repository/Walletrepository";
import { WalletModel } from "../db/schemas/Walletmodel";

export class walletRepositoryimpl implements walletRepository{
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
}