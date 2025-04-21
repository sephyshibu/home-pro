import { IUser } from "../models/User";

export interface UserRepository{
    createUser(user:IUser):Promise<IUser>
    findByEmail(email:string):Promise<IUser|null>
}