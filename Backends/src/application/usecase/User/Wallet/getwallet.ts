import { walletRepository } from "../../../../domain/repository/Walletrepository"

export class FetchWallet {

    constructor(private walletrepository:walletRepository){}


    async fetchwalletbalance(id:string){
        const wallet=await this.walletrepository.findById(id)
        if(!wallet) throw new Error("wallet not found")
        return wallet
    }
}