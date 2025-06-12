import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { userMessage } from "../../domain/shared/Usermessage/usermessage";
import { GetWallet } from '../../application/usecase/Wallet/fetchWallet';
import { FetchWallet } from '../../application/usecase/User/Wallet/getwallet';

export class WalletController{
    constructor(
        private _fetchwalletdetails:GetWallet,
        private _getwalletbalance:FetchWallet,
    ){}

    async fetchbalance(req:Request,res:Response):Promise<void>{
            try {
                const{userId}=req.params
              
              
               
                const result=await this._getwalletbalance.fetchwalletbalance(userId)
                res.status(HTTPStatusCode.OK).json({message:userMessage.BALANCE,balance:result.balance})
            } catch (error) {
                console.error("Error in fetching balance", error);
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
            }
        }
    
        async fetchdetailswallet(req:Request,res:Response):Promise<void>{
            try {
                console.log("enterin")
                const{userId}=req.params
                console.log(userId)
                const walletdetail=await this._fetchwalletdetails.fetchwalletdetails(userId)
                res.status(HTTPStatusCode.OK).json({walletdetail})
            } catch (error) {
                console.error("Error fetching wallet", error);
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
            }
        }
    
        
}