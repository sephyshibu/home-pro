import { IUser } from "../../domain/models/User";
import { userModel } from "../db/schemas/Usermodel";


export class UserRepository{
    async createUser(userdata:IUser):Promise<IUser>{
        return userModel.create(userdata)

    }
    async findByEmail(email:string):Promise<IUser|null>{
        const user=await userModel.findOne({email})
        return user?user.toObject():null
    }
}