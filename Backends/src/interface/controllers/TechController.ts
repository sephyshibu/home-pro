import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { TechMessages } from "../../domain/shared/Techmessage/techmessage";
import { LoginTech } from "../../application/usecase/Tech/LoginTech";
import { RefreshToken } from "../../application/usecase/Tech/RefreshToken";
import { GetTechById } from "../../application/usecase/Tech/MyProfile/TechDetails";
import { EditTech } from "../../application/usecase/Tech/MyProfile/Edittech";
import { fetchCategory } from "../../application/usecase/Admin/Fetchcategory";
import { FetchBookingByTechId } from "../../application/usecase/booking/fetchBookingsByTech";
import { bookingRequestAcceptByTech } from "../../application/usecase/booking/requestaccept";
import { bookingRequestRejectByTech } from "../../application/usecase/booking/requestreject";
import { FetchUpcoming } from "../../application/usecase/booking/upcomingevents";
import { PasswordChange } from "../../application/usecase/Tech/Password/ChangePassword";
import { RequestSession } from "../../application/usecase/Sessions/requestSession";
import { fetchBookingswhichcompletedrejected } from "../../application/usecase/booking/fetchcompletedrejected";
import { FetchTransactionsinTechWallet } from "../../application/usecase/Wallet/fetchtransactiondetailsintech";
import { GetTechDashboardStatsUseCase } from "../../application/usecase/Tech/Dashboard/dashboard";
import { FetchReviewByTechId } from "../../application/usecase/Review/fetchReview";
export class techController{
    constructor(
        private _fetchtransactionintechwallet:FetchTransactionsinTechWallet,
        private _techdashboard:GetTechDashboardStatsUseCase,
        private _fetchreview:FetchReviewByTechId
    ){}

    async fetchtransactiontechwallet(req:Request,res:Response):Promise<void>{
        try {
            const{techId}=req.params

            const result=await this._fetchtransactionintechwallet.transactiondetails(techId)
            res.status(HTTPStatusCode.OK).json(result);
        } catch (err) {
          console.error("❌ Error confirming payment:", err);
          res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: TechMessages.INTERNAL_SERVER_ERROR });
        }
    }

    async getDashboardTechId(req:Request,res:Response):Promise<void>{
        console.log("techhh controller")
        try {
            const{techId}=req.params
            const{fromDate,toDate,filter}=req.query
            console.log(req.params)
            console.log(req.query)

            if(fromDate && toDate){
                const from=new Date(fromDate as string)
                const to= new Date(toDate as string)
                if(from>to){
                    res.status(HTTPStatusCode.BAD_REQUEST).json({message:TechMessages.INVALID_DATE_RANGE})
                    return
                }
            }

            const result=await this._techdashboard.execute(techId,{
                fromDate:fromDate as string,
                toDate:toDate as string,
                filter:filter as 'week'|'month'
            })
            console.log("final res", result)
            res.status(HTTPStatusCode.OK).json({result})
        } catch (err) {
          console.error("❌ Error dashboard:", err);
          res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: TechMessages.INTERNAL_SERVER_ERROR });
        }
    }

    async fetchreview(req:Request,res:Response):Promise<void>{
        try {
            const {techId}=req.params
            const result=await this._fetchreview.fetchreviewtechId(techId)
            console.log("controller",result)
            res.status(HTTPStatusCode.OK).json(result)
        }  catch (err) {
          console.error("❌ Error in review fetch:", err);
          res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: TechMessages.INTERNAL_SERVER_ERROR });
        }
    }


    

}
