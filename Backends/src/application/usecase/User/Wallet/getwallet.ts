import { IwalletRepository } from "../../../../domain/repository/Walletrepository"

export class FetchWallet {

    constructor(private _walletrepository:IwalletRepository){}


    async fetchwalletbalance(id:string){
        const wallet=await this._walletrepository.findById(id)
        if(!wallet) throw new Error("wallet not found")
        return wallet
    }
}