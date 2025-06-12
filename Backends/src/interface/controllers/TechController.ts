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
        private _logintech:LoginTech,
        private _refreshtoken:RefreshToken,
        private _gettechbyid:GetTechById,
        private _edittech:EditTech,
        private _fetchcat:fetchCategory,
        private _fetchbookingbytechbeforeaccept:FetchBookingByTechId,
        private _requestacceptbytech:bookingRequestAcceptByTech,
        private _upcoming:FetchUpcoming,
        private _passwordhcange:PasswordChange,
        private _requestrejectbyTech:bookingRequestRejectByTech,
        private _requestsessions:RequestSession,
        private _fetchbookingwithcompleteandreject:fetchBookingswhichcompletedrejected,
        private _fetchtransactionintechwallet:FetchTransactionsinTechWallet,
        private _techdashboard:GetTechDashboardStatsUseCase,
        private _fetchreview:FetchReviewByTechId
    ){}

    async login(req:Request,res:Response):Promise<void>{
        console.log("login tech")

        try {
            const{email,password}=req.body
            const result=await this._logintech.logintech(email,password)
            res.cookie(process.env.COOKIE_NAME_TECH || "refreshtokentech", result.refreshtoken,{
                httpOnly:process.env.COOKIE_HTTPONLY==='true',
                secure:process.env.COOKIE_SECURE==='false',
                maxAge:parseInt(process.env.COOKIE_MAXAGE ||"604800000"),
            })
            res.status(HTTPStatusCode.OK).json({message:TechMessages.LOGIN_SUCCESS, tech:result.tech,token:result.accesstoken})
        } 
        catch (err:any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
          }
    }

    async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.[process.env.COOKIE_NAME_TECH||"refreshtokentech"];
            console.log("refreshtokencontrollertech",token)
            const newaccesstoken=await this._refreshtoken.refresh(token);
             console.log("in refresh token controller tech with new access tokern ",newaccesstoken)
            res.status(HTTPStatusCode.OK).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
        }
    }

    async fetchTechById(req:Request, res:Response){
        try {
            const{techId}=req.params
           const tech= await this._gettechbyid.gettechbyid(techId)
           res.status(HTTPStatusCode.OK).json({tech})
        } catch (err: any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
          }
    }

    async edittechs(req:Request,res:Response){
        console.log("tech")
        try {
            const{techId}=req.params
            const{name,email,
                phone,
                rateperhour,
                serviceablepincode,
                categoryid,
                noofworks,
                profileimgurl,
                consulationFee,
                workphotos}=req.body

            console.log(req.body)
            const result= await this._edittech.edittech(techId,{name,email,
                phone,
                rateperhour,
                serviceablepincode,
                categoryid,
                noofworks,
                profileimgurl,
                consulationFee,
                workphotos})
            
                res.status(HTTPStatusCode.OK).json({message:TechMessages.EDIT_TECH_SUCCESS,tech:result})
            } catch (error:any) {
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message: error.message });
            }
    }

    async fetchCategory(req:Request,res:Response):Promise<void>{
        try {
            const category=await this._fetchcat.fetch()
            res.status(HTTPStatusCode.OK).json({category})
        } catch (error:any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    async fetchRequestByTech(req:Request,res:Response):Promise<void>{
        try {
            const{techId}=req.params
            const bokings=await this._fetchbookingbytechbeforeaccept.fetchBookingDetailsRequest(techId)
            console.log("contoller", bokings)
            res.status(HTTPStatusCode.OK).json({bokings})
        } catch (err: any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
            
        }
    }

    async bookingrequest(req:Request, res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const result=await this._requestacceptbytech.bookingreacceptbytech(bookingId)
            console.log("controller",result)
            res.status(HTTPStatusCode.OK).json({result})
        } catch (err: any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
            
        }
    }

    async bookingsrejectedbytech(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const{reason}=req.body

            const result=await this._requestrejectbyTech.bookingreacceptbytech(bookingId,reason)
            console.log(result)
            res.status(HTTPStatusCode.OK).json({result})
        }  catch (err: any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
            
        }

    }

    async fetchupcomingevnts(req:Request,res:Response):Promise<void>{
        try {
            const{techId}=req.params
            const booking=await this._upcoming.fetchupcoming(techId)
            console.log("controller", booking)
            res.status(HTTPStatusCode.OK).json({booking})

        } catch (err: any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
            
        }
    }

    async passwordChanges(req:Request, res:Response):Promise<void>{
        try {
        
            const{techId}=req.params
            const{password}=req.body
            console.log(req.body)
            const result=await this._passwordhcange.editpassword(techId, password)
            res.status(HTTPStatusCode.OK).json({message:result.message})
        } catch (err: any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
            
        }
    }
    async requestressions(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const {types}=req.body

            const result=await this._requestsessions.requestsession(bookingId, types)
            res.status(HTTPStatusCode.OK).json(result)
        } catch (err: any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
            
        }
    }

    async completeandrejectbookings(req:Request,res:Response):Promise<void>{
        try {
            const{techId}=req.params
            const result=await this._fetchbookingwithcompleteandreject.fetchBookingscommpletereject(techId)
            res.status(HTTPStatusCode.OK).json({booking:result})
        } catch (err: any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
            
        }
    }

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
