import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { AdminMessages } from "../../domain/shared/Adminmessage/adminmessage";
import { Gettransactions } from "../../application/usecase/Transactions/GetTransaction";
import { GetTransactionWithBookings } from "../../application/usecase/Transactions/TransactionBookingdetails";


export class AdminTransactionController{
    constructor(
        private _gettransactiondetails:Gettransactions,
        private _gettransactionwithBookings:GetTransactionWithBookings,
    ){}

    async fetchTransaction(req:Request,res:Response):Promise<void>{
            console.log("fetch transaction")
            const currentPage=parseInt(req.query.page as string)||1
           
            try {
                const {transactions,totaladmincommision}=await this._gettransactiondetails.gettransaction(currentPage)
                console.log("controller transaction",transactions)
                res.status(HTTPStatusCode.OK).json({transactions,totaladmincommision}) 
            } catch (error:any) {
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }

        async transactionwithBookings(req:Request,res:Response):Promise<void>{
        try {
            const {transId}=req.params
            const result=await this._gettransactionwithBookings.execute(transId)
            res.status(HTTPStatusCode.OK).json({result})
        } catch (error:any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: error.message });
        }
    }

}