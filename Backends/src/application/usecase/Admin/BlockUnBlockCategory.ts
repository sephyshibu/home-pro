import { Categoryrepository } from "../../../domain/repository/categoryrepository";
export class BlockUnBlockCat{
    constructor(private _categoryrepository:Categoryrepository){}

    async blockunblockcat(catid:string, isBlocked:boolean){
        const updatecat=await this._categoryrepository.blockunblockcat(catid,isBlocked)
        return updatecat
    }
}