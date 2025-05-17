import { UserRepository } from "../../../domain/repository/Userrepository";

export class fetchUser{
    constructor(private userrepository:UserRepository){}

    async fetch(sortBy = 'name', order: 'asc' | 'desc' = 'asc'){
        const users= await this.userrepository.fetchUser(sortBy,order)
        return users
    }
}