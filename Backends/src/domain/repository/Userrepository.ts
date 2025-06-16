import { IUser } from "../models/User";
import { UserprofileDTO } from "../../application/dto/UserDTO";
export interface IUserRepository{
    createUser(user:IUser):Promise<IUser>
    findByEmail(email:string):Promise<IUser|null>
    findByGoogleId(googleId:string):Promise<IUser|null>
    fetchUser(sortBy: string, order: 'asc' | 'desc', skip:number, limit:number):Promise<{users:IUser[]|null,total: number}>;
    blockunblock(userid:string, isBlocked:boolean):Promise<IUser>
    findByEmailAndUpdate(password:string, email:string):Promise<IUser|null>
    findById(userid:string):Promise<{ isBlocked: boolean; email: string }|null>
    findOneuserProfile(userId: string): Promise<UserprofileDTO | null> 
    findOneuser(userId:string):Promise<IUser|null>
    edituser(userId:string, update:Partial<IUser>):Promise<UserprofileDTO|null>
    fetchUsersBySearch(username:string):Promise<IUser[]|null>
}