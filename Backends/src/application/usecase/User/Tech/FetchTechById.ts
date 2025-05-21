import { TechRepository } from "../../../../domain/repository/Techrepository";

export class fetchTechwithcategory{
    constructor(private _techrepository:TechRepository){}


    async fetchtechwithcategory(techid:string){
        const technician=await this._techrepository.fetchTechwithcategory(techid)
        if(!technician) throw new Error("technican not  found")

        return technician
    }
}