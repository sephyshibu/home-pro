import { ITechRepository } from "../../../../domain/repository/Techrepository"
import { ITech } from "../../../../domain/models/Tech"
import bcrypt from "bcryptjs"


export class PasswordChange{
    constructor(private _techrepository:ITechRepository){}


    async editpassword(techId:string,password:string):Promise<{message:string,updatetech?:ITech}>{
 
        const existingtech =await this._techrepository.findOneTech(techId)
        if(!existingtech){
            throw new Error("tech not found")
        }
        console.log(existingtech)
        try {
            const newpassword = await bcrypt.hash(password, 10);
            console.log("New hashed password:", newpassword);
    
            const updatetech = await this._techrepository.edittech(techId, { password: newpassword });
            console.log("Update complete:", updatetech);
    
            return {
                message: "Password updated successfully",
                updatetech
            };
        } catch (error) {
            console.error("Error while updating password:", error);
            throw new Error("Update failed");
        }
    }
}