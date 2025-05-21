import { Categoryrepository } from "../../../domain/repository/categoryrepository";
import { ICategory } from "../../../domain/models/Caegory";


export class AddCategory{
    constructor(private _categoryrepository:Categoryrepository){}


    async addCategory(name:string, description:string, image:string):Promise<{message:string}>
    {
        const sanitizedName = name.trim().toLowerCase();
        const sanitizedDesc = description.trim();
        const existingcat=await this._categoryrepository.findByname(sanitizedName)

        if(existingcat){
            throw new Error("category already existed")
        }


        const category:ICategory={
            name:sanitizedName,
            description:sanitizedDesc,
            image,
            isBlocked:false
        }
        await this._categoryrepository.createcategory(category)
        return{message:"Category added"}
    }
}