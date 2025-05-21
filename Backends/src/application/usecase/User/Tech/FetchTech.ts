import { TechRepository } from "../../../../domain/repository/Techrepository";

export class FetchTechBasedOnAvailable {

    constructor(private _techrepository:TechRepository){}


    async fetchTechBasedOnAvailble(pincode:string, date:string, categoryId:string){
        const currentdate= new Date()
        const parsedFrontendDate = new Date(date);

        if(parsedFrontendDate<currentdate){
            throw new Error("date is not valid date")
        }
        const technician=await this._techrepository.fetchTechbasedonavilablity(pincode,date,categoryId)
        if(!technician) throw new Error("technician not found")
        return technician
    }
}