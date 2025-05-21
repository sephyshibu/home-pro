import { walletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";

export class GetWallet{
    constructor(private _transactionrepository:TransactionRepository){}


    async fetchwalletdetails(userId:string){

        const walletdetails=await this._transactionrepository.getByOwnerId(userId)
        
        if(!walletdetails) throw new Error("no walet details")
            const filteredDetails = walletdetails.filter(txn =>
                txn.method === "Wallet" ||
                txn.purpose === "Refund for booking cancellation"
            );
            console.log("filtered", filteredDetails)
    
            return filteredDetails;
    }
}