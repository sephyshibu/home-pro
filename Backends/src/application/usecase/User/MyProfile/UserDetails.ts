import { UserRepository } from "../../../../domain/repository/Userrepository";

export class GetUserById{
    constructor(private userrepository:UserRepository){}


    async getuserById(userId:string){
        const user=await this.userrepository.findOneuser(userId)
        if(!user) throw new Error("No user found")
        return user

    }
}