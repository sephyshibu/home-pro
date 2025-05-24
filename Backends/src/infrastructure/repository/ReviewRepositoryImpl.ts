import { IReview } from "../../domain/models/Review";
import { Reviewrepository } from "../../domain/repository/Reviewrepository";
import { ReviewModel } from "../db/schemas/ReviewModel";


export class ReviewrepositoryImpl implements Reviewrepository{
    async fetchreviewbyTechId(techId: string): Promise<IReview[] | null> {
        try {
            
            const reviews=await ReviewModel.find({techId:techId}).populate('userId', 'name')
            if(!reviews){
                return null
            }
            
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