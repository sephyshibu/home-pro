import { IWallet } from "../models/Wallet";

export interface walletRepository{
    createWallet(wallet:Omit<IWallet,"id">):Promise<IWallet>
    findById(ownerId:string):Promise<IWallet|null>
    
    // findWalletByOnwer(ownerId:string):Promise<IWallet|null>
    increasebalance(ownerId:string, balance:number):Promise<void>
    decreasebalance(ownerId:string,balance:number):Promise<void>
}