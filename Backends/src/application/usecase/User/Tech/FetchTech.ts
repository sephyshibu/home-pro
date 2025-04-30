import { TechRepository } from "../../../../domain/repository/Techrepository";

export class FetchTechBasedOnAvailable {

    constructor(private techrepository:TechRepository){}


    async fetchTechBasedOnAvailble(pincode:string, date:string, categoryId:string){
        const technician=await this.techrepository.fetchTechbasedonavilablity(pincode,date,categoryId)
        if(!technician) throw new Error("technician not found")
        return technician
    }
}