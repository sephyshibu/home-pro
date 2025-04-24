import { TechRepository } from "../../../domain/repository/Techrepository";

export class BlockUnBlock{
    constructor(private techrepository:TechRepository){}

    async blockunblocktech(techid:string, isBlocked:boolean){
        const updatetech=await this.techrepository.blockunblock(techid, isBlocked)
        return updatetech
    }
}