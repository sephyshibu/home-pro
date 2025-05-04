import { walletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";

export class GetWallet{
    constructor(private transactionrepository:TransactionRepository){}


    async fetchwalletdetails(userId:string){

        const walletdetails=await this.transactionrepository.getByOwnerId(userId)
        
        if(!walletdetails) throw new Error("no walet details")
        return walletdetails
    }
}