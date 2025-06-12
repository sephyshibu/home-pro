import { ITechRepository } from "../../../domain/repository/Techrepository";

export class fetchtech{
    constructor(private _techrepository:ITechRepository){}

    async fetch(sortBy = 'name', order: 'asc' | 'desc' = 'asc',page:number){
        const limit=5
        const skip=(page-1)*limit
        return await this._techrepository.fetchTech(sortBy,order,skip, limit)
      
    }

}