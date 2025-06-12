import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { userMessage } from "../../domain/shared/Usermessage/usermessage";
import { FetchReviewByTechId } from '../../application/usecase/Review/fetchReview';
import { AddReview } from '../../application/usecase/Review/addreview';

export class ReviewCOntroller{
    constructor(
          
        private _fetchreviewbytech:FetchReviewByTechId,
        private _addreview:AddReview,
    ){}

     async fetchreviewbytechIdfromUser(req:Request,res:Response):Promise<void>{
        try {
            const {techId}=req.params
            console.log("controller in user review techId", techId)
            if(!techId){
                res.status(HTTPStatusCode.BAD_REQUEST).json({message:userMessage.MISSING_TECH_ID})
                return
            }

            const result=await this._fetchreviewbytech.fetchreviewtechId(techId)
            res.status(HTTPStatusCode.OK).json({reviews:result})

        } catch (err) {
              console.error("❌ Error in fetching review:", err);
              res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
            }
    }

    async Addingreview(req:Request,res:Response):Promise<void>{
        try {
            const{userId,techId, description, points}=req.body
            console.log("adding review", req.body)
            const response=await this._addreview.addreview(userId,techId,description,points)
            res.status(HTTPStatusCode.OK).json(response)
        } catch (err) {
              console.error("❌ Error in adding review:", err);
              res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message:userMessage.INTERNAL_ERROR });
            }
    }
     
}