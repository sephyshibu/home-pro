import { IUser } from "../../domain/models/User";
import { userModel } from "../db/schemas/Usermodel";
import { UserRepository } from "../../domain/repository/Userrepository";

export class UserRepositoryImpl implements UserRepository{
    async createUser(userdata:IUser):Promise<IUser>{
        const createdUser = await userModel.create(userdata);
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
}