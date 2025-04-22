import { IWallet } from "../models/wallet";

export interface walletRepository{
    createWallet(wallet:Omit<IWallet,"id">):Promise<IWallet>
    // findWalletByOnwer(ownerId:string):Promise<IWallet|null>
    // updatebalance(ownerId:string, balance:number):Promise<void>
}