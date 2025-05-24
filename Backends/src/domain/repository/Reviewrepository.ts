import { IReview } from "../models/Review";

export interface Reviewrepository{
    // fetchreviewbyuserId(userId:string):Promise<IReview[]|null>
    fetchreviewbyTechId(techId:string):Promise<IReview[]|null>
    // addreview(review:IReview):Promise<IReview>
}