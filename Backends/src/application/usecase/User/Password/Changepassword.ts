import { IUserRepository } from "../../../../domain/repository/Userrepository";
import { IUser } from "../../../../domain/models/User";
import bcrypt from "bcryptjs"
import { UserprofileDTO } from "../../../dto/UserDTO";


export class PasswordChange{
    constructor(private _userrepository:IUserRepository){}


    async editpassword(userId:string,oldpassword:string,password:string):Promise<{message:string,updateuser?:UserprofileDTO}>{
 
        const existinguser =await this._userrepository.findOneuser(userId)
        if(!existinguser){
            throw new Error("user not found")
        }
        const isMatch=await bcrypt.compare(oldpassword,existinguser.password!)
         if (!isMatch) {
        throw new Error("Old password is incorrect");
    }

        console.log(existinguser)
        try {

            const newpassword = await bcrypt.hash(password, 10);
            console.log("New hashed password:", newpassword);
    
            const updateuser = await this._userrepository.edituser(userId, { password: newpassword });
            console.log("Update complete:", updateuser);
    
            return {
                message: "Password updated successfully",
               updateuser: updateuser ?? undefined // convert null to undefined
            };
        } catch (error) {
            console.error("Error while updating password:", error);
            throw new Error("Update failed");
        }
    }
}