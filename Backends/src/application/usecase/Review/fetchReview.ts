import { IReview } from "../../../domain/models/Review";
import { Reviewrepository } from "../../../domain/repository/Reviewrepository";

export class FetchReviewByTechId{
    constructor(private _reviewrepository:Reviewrepository){}

    async fetchreviewtechId(techId:string):Promise<IReview[]|null>{
        try {
            const reviews = await this._reviewrepository.fetchreviewbyTechId(techId);
            console.log("review",reviews)
            return reviews;
        } catch (error) {
            console.error(`Error fetching reviews for tech ID ${techId}:`, error);
            return null;
        }
    }

}