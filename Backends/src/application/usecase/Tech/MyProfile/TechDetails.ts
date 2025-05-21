import { TechRepository } from "../../../../domain/repository/Techrepository";

export class GetTechById{
    constructor(private _techrepository:TechRepository){}

    async gettechbyid(techid:string){
        const tech= await this._techrepository.findOneTech(techid)
        if(!tech) throw new Error("No tech found")
        return tech
    }
}