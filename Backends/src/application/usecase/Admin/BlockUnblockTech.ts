import { ITechRepository } from "../../../domain/repository/Techrepository";

export class BlockUnBlock{
    constructor(private _techrepository:ITechRepository){}

    async blockunblocktech(techid:string, isBlocked:boolean){
        const updatetech=await this._techrepository.blockunblock(techid, isBlocked)
        return updatetech
    }
}