import { TechRepository } from "../../../../domain/repository/Techrepository";

export class GetTechById{
    constructor(private techrepository:TechRepository){}

    async gettechbyid(techid:string){
        const tech= await this.techrepository.findOneTech(techid)
        if(!tech) throw new Error("No tech found")
        return tech
    }
}