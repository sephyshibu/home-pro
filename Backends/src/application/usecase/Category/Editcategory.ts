import { Categoryrepository } from "../../../domain/repository/categoryrepository";
import { ICategory } from "../../../domain/models/Caegory";
import { Error } from "mongoose";

export class EditCategory{
    constructor(private categoryrepository:Categoryrepository){}



    async editCategory(catid:string,data:{ name: string, description: string, image: string }):Promise<{message:string; updatecategory?:ICategory}>{
        const existingcategory=await this.categoryrepository.fetchconecategory(catid)
        if(!existingcategory){
            throw new Error("categor not found")
        }

        const updatecategory=await this.categoryrepository.editcategory(catid,data)

        return{
            message: "Category updated successfully",
            updatecategory
        }
    }
}