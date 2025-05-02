import { UserRepository } from "../../../../domain/repository/Userrepository";
import { IUser } from "../../../../domain/models/User";
import bcrypt from "bcryptjs"


export class PasswordChange{
    constructor(private userrepository:UserRepository){}


    async editpassword(userId:string,password:string):Promise<{message:string,updateuser?:IUser}>{
 
        const existinguser =await this.userrepository.findOneuser(userId)
        if(!existinguser){
            throw new Error("user not found")
        }
        console.log(existinguser)
        try {
            const newpassword = await bcrypt.hash(password, 10);
            console.log("New hashed password:", newpassword);
    
            const updateuser = await this.userrepository.edituser(userId, { password: newpassword });
            console.log("Update complete:", updateuser);
    
            return {
                message: "Password updated successfully",
                updateuser
            };
        } catch (error) {
            console.error("Error while updating password:", error);
            throw new Error("Update failed");
        }
    }
}