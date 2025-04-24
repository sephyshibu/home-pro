import { Categoryrepository } from "../../../domain/repository/categoryrepository";
export class BlockUnBlockCat{
    constructor(private categoryrepository:Categoryrepository){}

    async blockunblockcat(catid:string, isBlocked:boolean){
        const updatecat=await this.categoryrepository.blockunblockcat(catid,isBlocked)
        return updatecat
    }
}