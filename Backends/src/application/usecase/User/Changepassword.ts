import { UserRepository } from "../../../domain/repository/Userrepository";
import bcrypt from 'bcryptjs'

export class changepassword{
    constructor(private _userrepository:UserRepository){}


    async changepass(password:string, email:string):Promise<{message:string}>{
        console.log(password, email)
        const user=await this._userrepository.findByEmailAndUpdate(password, email);
        return {message:"Password Change Successfully"}
    }
}