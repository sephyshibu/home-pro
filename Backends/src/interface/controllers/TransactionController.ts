import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { userMessage } from "../../domain/shared/Usermessage/usermessage";
import { GetTransactionWithBookings } from '../../application/usecase/Transactions/TransactionBookingdetails';

export class TransactionController{
    constructor(
        private _getTransactionwithbookings:GetTransactionWithBookings,
    ){}
        async transactionwithBookings(req:Request,res:Response):Promise<void>{
        try {
            const {transId}=req.params
            const result=await this._getTransactionwithbookings.execute(transId)
            res.status(HTTPStatusCode.OK).json({result})
        } catch (error:any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: error.message });
        }
    }

}