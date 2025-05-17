import { TechRepository } from "../../../domain/repository/Techrepository";

export class fetchtech{
    constructor(private techrepository:TechRepository){}

    async fetch(sortBy = 'name', order: 'asc' | 'desc' = 'asc'){
        const tech=await this.techrepository.fetchTech(sortBy,order)
        return tech
    }

}