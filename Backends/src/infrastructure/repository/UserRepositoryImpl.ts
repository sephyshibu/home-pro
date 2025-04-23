import { IUser } from "../../domain/models/User";
import { userModel } from "../db/schemas/Usermodel";
import { UserRepository } from "../../domain/repository/Userrepository";

export class UserRepositoryImpl implements UserRepository{
    async createUser(userdata:IUser):Promise<IUser>{
        console.log("userdata",userdata)
        console.log("signnnnn")
        const createdUser = await userModel.create(userdata);
        console.log("Createduser",createdUser)
        return createdUser;

    }
    async findByEmail(email:string):Promise<IUser|null>{
        const user=await userModel.findOne({email})
        return user?user.toObject():null
    }

    async findByGoogleId(googleId: string): Promise<IUser | null> {
        const user=await userModel.findOne({googleId})
        return user?user.toObject():null
    }
    async fetchUser():Promise<IUser[]>{
        const users=await userModel.find()
        return users
    }
    
}