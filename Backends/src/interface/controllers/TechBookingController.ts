import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { TechMessages } from "../../domain/shared/Techmessage/techmessage";
import { FetchBookingByTechId } from "../../application/usecase/booking/fetchBookingsByTech";
import { bookingRequestAcceptByTech } from "../../application/usecase/booking/requestaccept";
import { bookingRequestRejectByTech } from "../../application/usecase/booking/requestreject";
import { FetchUpcoming } from "../../application/usecase/booking/upcomingevents";
import { RequestSession } from "../../application/usecase/Sessions/requestSession";
import { fetchBookingswhichcompletedrejected } from "../../application/usecase/booking/fetchcompletedrejected";


export class TechBookingController{
    constructor(
        private _fetchbookingbytechbeforeaccept:FetchBookingByTechId,
        private _requestacceptbytech:bookingRequestAcceptByTech,
        private _upcoming:FetchUpcoming,
        private _requestrejectbyTech:bookingRequestRejectByTech,
        private _requestsessions:RequestSession,
        private _fetchbookingwithcompleteandreject:fetchBookingswhichcompletedrejected,
    ){}

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
}