import { Categoryrepository } from "../../../domain/repository/categoryrepository";

export class GetCategoryById{
    constructor(private _categoryrepository:Categoryrepository){}


    async getcategorybyId(catid:string){
        const category=await this._categoryrepository.fetchconecategory(catid)
        if(!category) throw new Error("Category not found");
        return category;
    }
}