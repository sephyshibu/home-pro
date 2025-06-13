import { IUserRepository } from "../../../domain/repository/Userrepository";

export class BlockUnblock{
    constructor(private _userrepository:IUserRepository){}

    async blockunblock(userId:string, isBlocked:boolean){
        console.log("userID and block", userId, isBlocked)
        const updateuser= await this._userrepository.blockunblock(userId,isBlocked)
        return updateuser
    }
}