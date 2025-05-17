import { ICategory } from "../../../../domain/models/Caegory";
import { Categoryrepository } from "../../../../domain/repository/categoryrepository";

export class Searchingcategory{
    constructor(private _categoryrepository:Categoryrepository){}

    async searchingcategory(name:string):Promise<ICategory[]|null>{
        try {
            const category=await this._categoryrepository.fetchCategoryBySearch(name)
            return category
        } catch (error) {
            console.error("Error fetching category:", error);
            return null;
        }
       

    }
}