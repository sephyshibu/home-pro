import { UserRepository } from "../../../domain/repository/Userrepository";

export class fetchUser{
    constructor(private _userrepository:UserRepository){}

    async fetch(sortBy = 'name', order: 'asc' | 'desc' = 'asc',page:number){
        const limit=5
        const skip = (page - 1) * limit;
        
        return await this._userrepository.fetchUser(sortBy,order, skip, limit)
        
    }
}