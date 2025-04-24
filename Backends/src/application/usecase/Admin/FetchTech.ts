import { TechRepository } from "../../../domain/repository/Techrepository";

export class fetchtech{
    constructor(private techrepository:TechRepository){}

    async fetch(){
        const tech=await this.techrepository.fetchTech()
        return tech
    }

}