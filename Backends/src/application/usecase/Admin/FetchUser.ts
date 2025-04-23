import { UserRepository } from "../../../domain/repository/Userrepository";

export class fetchUser{
    constructor(private userrepository:UserRepository){}

    async fetch(){
        const users= await this.userrepository.fetchUser()
        return users
    }
}