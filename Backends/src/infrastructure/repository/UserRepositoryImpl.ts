import { IUser } from "../../domain/models/User";
import { userModel } from "../db/schemas/Usermodel";
import { IUserRepository } from "../../domain/repository/Userrepository";
import bcrypt from 'bcryptjs'
import { adminusermapper } from "../utils/adminusermapper";
import { UserprofileDTO } from "../../application/dto/UserDTO";


export class UserRepositoryImpl implements IUserRepository{
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

    async findByEmailAndUpdate(password: string, email: any): Promise<IUser | null> {
        console.log("dffp",password,email.email)
        const hash=await bcrypt.hash(password,10);
        const user=await userModel.findOneAndUpdate(
            {email:email.email},
            {password:hash},
            {new:true}
        )
        if(!user){
            throw new Error("User not found")

        }
        return user
    }

    async findByGoogleId(googleId: string): Promise<IUser | null> {
        const user=await userModel.findOne({googleId})
        return user?user.toObject():null
    }
    async fetchUser(sortBy: string = 'name', order: 'asc' | 'desc' = 'asc', skip:number, limit:number):Promise<{users:UserprofileDTO[]|null,total: number}>{
        const sortOrder = order === 'asc' ? 1 : -1;
        const [users, total] = await Promise.all([
            userModel
            .find()
            .collation({ locale: 'en', strength: 2 })
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit),
            userModel.countDocuments()
        ]);
        const safeuser=users.map(adminusermapper)

        return { users:safeuser, total };
    }

    async fetchUsersBySearch(username: string): Promise<IUser[]|null> {
        try {
            console.log("usermame",username)
            const usernames=username.trim().split(/\s+/)
            const regex=usernames.map((word=>`(?=.*\\b${word}\\w*)`))
                                  .join('')

            const users=await userModel.find({name:{$regex:regex,$options:'i'}})
            return users
            
        } catch (error) {
            console.error("Error finding user:", error);
            return null;
          }
    }

    async blockunblock(userid: string, isBlocked: boolean): Promise<IUser> {
        const user=await userModel.findByIdAndUpdate(
            userid,
            {isBlocked},
            {new:true}
        )
        if(!user){
            throw new Error("User not found")

        }
        return user

    }
    async findById(userid: string): Promise<{ isBlocked: boolean; email: string } | null> {
        try {
            const user = await userModel.findById(userid);
            if (!user) {
              return null;
            }
            return { isBlocked: user.isBlocked, email: user.email }; 
          } catch (error) {
            console.error("Error finding user:", error);
            return null;
          }
    }

    async findOneuser(userId: string): Promise<IUser | null> {
        return await userModel.findById(userId)
    }

    async edituser(userId: string, update: Partial<IUser>): Promise<IUser> {
        console.log("edittii")
        console.log("eduit user", update)
        const updated=await userModel.findByIdAndUpdate(userId,update,{new:true})
        if(!updated) throw new Error("User Updated failedd")
        return updated
    }

   
}