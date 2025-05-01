import { IWallet } from "../models/Wallet";

export interface walletRepository{
    createWallet(wallet:Omit<IWallet,"id">):Promise<IWallet>
    findById(ownerId:string):Promise<IWallet|null>
    // findWalletByOnwer(ownerId:string):Promise<IWallet|null>
    // updatebalance(ownerId:string, balance:number):Promise<void>
}