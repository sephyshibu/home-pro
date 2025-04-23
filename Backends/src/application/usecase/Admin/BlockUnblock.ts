import { UserRepository } from "../../../domain/repository/Userrepository";

export class BlockUnblock{
    constructor(private userrepository:UserRepository){}

    async blockunblock(userId:string, isBlocked:boolean){
        const updateuser= await this.userrepository.blockunblock(userId,isBlocked)
        return updateuser
    }
}