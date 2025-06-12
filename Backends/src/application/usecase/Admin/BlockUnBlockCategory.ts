import { ICategoryrepository } from "../../../domain/repository/categoryrepository";
export class BlockUnBlockCat{
    constructor(private _categoryrepository:ICategoryrepository){}

    async blockunblockcat(catid:string, isBlocked:boolean){
        const updatecat=await this._categoryrepository.blockunblockcat(catid,isBlocked)
        return updatecat
    }
}