import { ICategory } from "../../domain/models/Caegory";
import { CategoryModel } from "../db/schemas/categoryModel";
import { Categoryrepository } from "../../domain/repository/categoryrepository";

export class categoryRepositoryImpl implements Categoryrepository{
    async createcategory(category: ICategory): Promise<ICategory> {
        const createdcat=await CategoryModel.create(category)
        console.log("created cat", createdcat)
        return createdcat
    }

    async findByCategoryId(categoryid: string): Promise<ICategory | null> {
        const cat=await CategoryModel.findById(categoryid)
        return cat
    }

    async findByname(name: string): Promise<ICategory | null> {
        const cat=await CategoryModel.findOne({name})
        return cat
    }

    async fetchcategory(): Promise<ICategory[]> {
        const cat=await CategoryModel.find()
        return cat
    }

    async blockunblockcat(catid: string, isBlocked: boolean): Promise<ICategory> {
            const cat=await CategoryModel.findByIdAndUpdate(
                catid,
                {isBlocked},
                {new:true}
            )
    
            if(!cat){
                throw new Error("Cat Not found")
            }
            return cat
        }
}