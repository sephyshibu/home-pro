import { TechRepository } from "../../../../domain/repository/Techrepository";

export class fetchTechwithcategory{
    constructor(private techrepository:TechRepository){}


    async fetchtechwithcategory(techid:string){
        const technician=await this.techrepository.fetchTechwithcategory(techid)
        if(!technician) throw new Error("technican not  found")

        return technician
    }
}