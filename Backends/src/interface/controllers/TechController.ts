import { Request,Response } from "express";
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

export class techController{
    constructor(
        private logintech:LoginTech,
        private refreshtoken:RefreshToken,
        private gettechbyid:GetTechById,
        private edittech:EditTech,
        private fetchcat:fetchCategory,
        private fetchbookingbytechbeforeaccept:FetchBookingByTechId,
        private requestacceptbytech:bookingRequestAcceptByTech,
        private upcoming:FetchUpcoming,
        private passwordhcange:PasswordChange,
        private requestrejectbyTech:bookingRequestRejectByTech,
        private requestsessions:RequestSession,
        private fetchbookingwithcompleteandreject:fetchBookingswhichcompletedrejected,
        private fetchtransactionintechwallet:FetchTransactionsinTechWallet
    ){}

    async login(req:Request,res:Response):Promise<void>{
        console.log("login tech")

        try {
            const{email,password}=req.body
            const result=await this.logintech.logintech(email,password)
            res.cookie("refreshtokentech", result.refreshtoken,{
                httpOnly:true,
                secure:false,
                maxAge:7*24*60*60*1000,
            })
            res.status(200).json({message:"Login Success", tech:result.tech,token:result.accesstoken})
        } 
        catch (err:any) {
            res.status(400).json({ message: err.message });
          }
    }

    async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.refreshtokentech;
            console.log("refreshtokencontrollertech",token)
            const newaccesstoken=await this.refreshtoken.refresh(token);
             console.log("in refresh token controller tech with new access tokern ",newaccesstoken)
            res.status(200).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
    }

    async fetchTechById(req:Request, res:Response){
        try {
            const{techId}=req.params
           const tech= await this.gettechbyid.gettechbyid(techId)
           res.status(200).json({tech})
        } catch (err: any) {
            res.status(400).json({ message: err.message });
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
            const result= await this.edittech.edittech(techId,{name,email,
                phone,
                rateperhour,
                serviceablepincode,
                categoryid,
                noofworks,
                profileimgurl,
                consulationFee,
                workphotos})
            
                res.status(200).json({message:"tech updated",tech:result})
            } catch (error:any) {
                res.status(400).json({ message: error.message });
            }
    }

    async fetchCategory(req:Request,res:Response):Promise<void>{
        try {
            const category=await this.fetchcat.fetch()
            res.status(200).json({category})
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    async fetchRequestByTech(req:Request,res:Response):Promise<void>{
        try {
            const{techId}=req.params
            const bokings=await this.fetchbookingbytechbeforeaccept.fetchBookingDetailsRequest(techId)
            console.log("contoller", bokings)
            res.status(200).json({bokings})
        } catch (err: any) {
            res.status(500).json({ message: err.message });
            
        }
    }

    async bookingrequest(req:Request, res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const result=await this.requestacceptbytech.bookingreacceptbytech(bookingId)
            console.log("controller",result)
            res.status(200).json({result})
        } catch (err: any) {
            res.status(500).json({ message: err.message });
            
        }
    }

    async bookingsrejectedbytech(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const{reason}=req.body

            const result=await this.requestrejectbyTech.bookingreacceptbytech(bookingId,reason)
            console.log(result)
            res.status(200).json({result})
        }  catch (err: any) {
            res.status(500).json({ message: err.message });
            
        }

    }

    async fetchupcomingevnts(req:Request,res:Response):Promise<void>{
        try {
            const{techId}=req.params
            const booking=await this.upcoming.fetchupcoming(techId)
            console.log("controller", booking)
            res.status(200).json({booking})

        } catch (err: any) {
            res.status(500).json({ message: err.message });
            
        }
    }

    async passwordChanges(req:Request, res:Response):Promise<void>{
        try {
        
            const{techId}=req.params
            const{password}=req.body
            console.log(req.body)
            const result=await this.passwordhcange.editpassword(techId, password)
            res.status(200).json({message:result.message})
        } catch (err: any) {
            res.status(500).json({ message: err.message });
            
        }
    }
    async requestressions(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const {types}=req.body

            const result=await this.requestsessions.requestsession(bookingId, types)
            res.status(200).json(result)
        } catch (err: any) {
            res.status(500).json({ message: err.message });
            
        }
    }

    async completeandrejectbookings(req:Request,res:Response):Promise<void>{
        try {
            const{techId}=req.params
            const result=await this.fetchbookingwithcompleteandreject.fetchBookingscommpletereject(techId)
            res.status(200).json({booking:result})
        } catch (err: any) {
            res.status(500).json({ message: err.message });
            
        }
    }

    async fetchtransactiontechwallet(req:Request,res:Response):Promise<void>{
        try {
            const{techId}=req.params

            const result=await this.fetchtransactionintechwallet.transactiondetails(techId)
            res.status(200).json(result);
        } catch (err) {
          console.error("❌ Error confirming payment:", err);
          res.status(500).json({ message: "Internal server error" });
        }
    }


    

}
