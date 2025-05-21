import { TechRepository } from "../../../domain/repository/Techrepository";

export class BlockUnBlock{
    constructor(private _techrepository:TechRepository){}

    async blockunblocktech(techid:string, isBlocked:boolean){
        const updatetech=await this._techrepository.blockunblock(techid, isBlocked)
        return updatetech
    }
}