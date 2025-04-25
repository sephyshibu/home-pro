import { IUser } from "../models/User";

export interface UserRepository{
    createUser(user:IUser):Promise<IUser>
    findByEmail(email:string):Promise<IUser|null>
    findByGoogleId(googleId:string):Promise<IUser|null>
    fetchUser():Promise<IUser[]>;
    blockunblock(userid:string, isBlocked:boolean):Promise<IUser>
    findByEmailAndUpdate(password:string, email:string):Promise<IUser|null>
    findById(userid:string):Promise<{ isBlocked: boolean; email: string }|null>
}