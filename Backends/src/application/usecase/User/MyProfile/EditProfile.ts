import { UserRepository } from "../../../../domain/repository/Userrepository";
import { IUser } from "../../../../domain/models/User";

export class EditProfile{
    constructor(private userrepository:UserRepository){}


    async editprofile(userId:string,data:{name:string, email:string, phone:string}):Promise<{message:string,updateuser?:IUser}>{
        const existinguser=await this.userrepository.findOneuser(userId)
        if(!existinguser){
            throw new Error("User Not Found")
        }

        const updateuser= await this.userrepository.edituser(userId, data)
        return{
            message:"Updated Successfully",
            updateuser
        }
    }
}