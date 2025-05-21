import { UserRepository } from "../../../domain/repository/Userrepository";

export class BlockUnblock{
    constructor(private _userrepository:UserRepository){}

    async blockunblock(userId:string, isBlocked:boolean){
        const updateuser= await this._userrepository.blockunblock(userId,isBlocked)
        return updateuser
    }
}