import { ITechRepository } from "../../../../domain/repository/Techrepository";

export class fetchTechwithcategory{
    constructor(private _techrepository:ITechRepository){}


    async fetchtechwithcategory(techid:string){
        const technician=await this._techrepository.fetchTechwithcategory(techid)
        if(!technician) throw new Error("technican not  found")

        return technician
    }
}