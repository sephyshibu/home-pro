import { ITechRepository } from "../../../domain/repository/Techrepository"
export class ChecktechStatus{
    constructor(private _techrepository:ITechRepository){}


    async checkstatus(userid:string):Promise<void>{
        const tech=await this._techrepository.findById(userid)

        if(!tech){
            throw new Error("tech not found")
        }

        if(tech.isBlocked==true){
            throw new Error("tech is Blocked")

        }
    }
}