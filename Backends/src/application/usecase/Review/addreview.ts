import { IReviewrepository } from "../../../domain/repository/Reviewrepository";
import { IReview } from "../../../domain/models/Review";

export class AddReview{
    constructor(private _reviewrepository:IReviewrepository){}

    async addreview(userId:string, techId:string,description:string, points:number):Promise<{message:string}>{
        
        try {
            const review:IReview={
                userId,techId,description,points
            }
            await this._reviewrepository.addreview(review)
            return{message:"added review, Thank You"}
        } catch (err) {
                console.error("Review added error:", err);
                 return { message: "Failed to add review" }; 
              }
    }
}