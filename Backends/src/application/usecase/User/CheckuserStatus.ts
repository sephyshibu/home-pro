import { UserRepository } from "../../../domain/repository/Userrepository";
export class CheckUserStatus{
    constructor(private userrepository:UserRepository){}


    async checkstatus(userid:string):Promise<void>{
        const user=await this.userrepository.findById(userid)

        if(!user){
            throw new Error("user not found")
        }

        if(user.isBlocked==true){
            throw new Error("User is Blocked")

        }
    }
}