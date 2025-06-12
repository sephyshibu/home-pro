import { ICategoryrepository } from "../../../domain/repository/categoryrepository";
import { ICategory } from "../../../domain/models/Caegory";
import { Error } from "mongoose";

export class EditCategory{
    constructor(private _categoryrepository:ICategoryrepository){}



    async editCategory(catid:string,data:{ name: string, description: string, image: string }):Promise<{message:string; updatecategory?:ICategory}>{
        
        const existingcategory=await this._categoryrepository.fetchconecategory(catid)
        if(!existingcategory){
            throw new Error("categor not found")
        }

        const updatecategory=await this._categoryrepository.editcategory(catid,data)

        return{
            message: "Category updated successfully",
            updatecategory
        }
    }
}