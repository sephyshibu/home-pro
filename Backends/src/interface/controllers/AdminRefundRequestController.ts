import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { AdminMessages } from "../../domain/shared/Adminmessage/adminmessage";
import { FetchrefundRequest } from "../../application/usecase/booking/fetchrefundbookings";
import { Refudaccept } from "../../application/usecase/booking/refundaccept";


export class AdminRefundRequestController{
    constructor(
                private _fetchrefundrequest:FetchrefundRequest,
                private _refundaccept:Refudaccept,
    ){}

    async fetchingrequestrefund(req:Request,res:Response):Promise<void>{
        try {
            const result=await this._fetchrefundrequest.fetchrefundreq()
            console.log("controller", result)
            res.status(HTTPStatusCode.OK).json({message:"success", Bookings:result})
        } catch (error:any) {
            console.error("Error in fetchingrequestrefund:", error);
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: AdminMessages.SERVER.ERROR, error: error.message });
        }
    }

    async acceptingrefund(req:Request,res:Response):Promise<void>{
            try {
                const{bookingId}=req.params
                const result =await this._refundaccept.processrefund(bookingId)
                res.status(HTTPStatusCode.OK).json({message:AdminMessages.REFUND.ACCEPTED})
                
            } catch (error:any) {
                console.error("Error in refund accepted:", error);
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: AdminMessages.SERVER.ERROR, error: error.message });
            }
    }


}