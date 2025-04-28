import { TechRepository } from "../../../domain/repository/Techrepository"
export class ChecktechStatus{
    constructor(private techrepository:TechRepository){}


    async checkstatus(userid:string):Promise<void>{
        const tech=await this.techrepository.findById(userid)

        if(!tech){
            throw new Error("tech not found")
        }

        if(tech.isBlocked==true){
            throw new Error("tech is Blocked")

        }
    }
}