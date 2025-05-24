import { IReview } from "../../domain/models/Review";
import { Reviewrepository } from "../../domain/repository/Reviewrepository";
import { ReviewModel } from "../db/schemas/ReviewModel";
import mongoose from "mongoose";

export class ReviewrepositoryImpl implements Reviewrepository{
    async fetchreviewbyTechId(techId: string): Promise<IReview[] | null> {
        console.log("review techId", techId)
        try {
            
            const reviews=await ReviewModel.find({ techId: new mongoose.Types.ObjectId(techId) }).populate('userId', 'name')
            if(!reviews){
                return null
            }
            console.log("fetching reviews",reviews)
            
            return reviews
        } catch (error) {
                console.error("Error fetching reviwws:", error);
                return null;
              }
    }
    // async fetchreviewbyuserId(userId: string): Promise<IReview[] | null> {
        
    // }
    async addreview(review: IReview): Promise<IReview> {
        console.log("in implimentation",review)
        const newreview=await ReviewModel.create(review)
        return newreview.save()
    }
}