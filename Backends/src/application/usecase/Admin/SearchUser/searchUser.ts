import { IUser } from "../../../../domain/models/User";
import { IUserRepository } from "../../../../domain/repository/Userrepository";

export class Searchinguser{
    constructor(private _userrepository:IUserRepository){}

    async searchinguser(username:string):Promise<IUser[]|null>{
        try {
            const users=await this._userrepository.fetchUsersBySearch(username)
            return users
        } catch (error) {
            console.error("Error fetching users:", error);
            return null;
        }
       

    }
}