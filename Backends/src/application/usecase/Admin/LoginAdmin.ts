import { IAdminRepository } from "../../../domain/repository/Adminrepository";
import { IAdmin } from "../../../domain/models/Admin";
import dotenv from 'dotenv'
dotenv.config()
import { AdminModel } from "../../../infrastructure/db/schemas/AdminModel";
import { WalletModel } from "../../../infrastructure/db/schemas/Walletmodel";
import { userModel } from "../../../infrastructure/db/schemas/Usermodel";
import jwt from 'jsonwebtoken'

export class Login{
    constructor (private adminrepository:IAdminRepository){}

    async loginadmin(email:string, password:string):Promise<{admin:any, accesstoken:string, refreshtoken:string}>{
        console.log("loginn",email,password)
        const adminEmail=process.env.ADMIN_EMAIL
        const adminpassword=process.env.ADMIN_PASSWORD

        if(email===adminEmail){

            const admin= await this.adminrepository.findByEmail(email)

            if(!admin){
                const newadmin= await AdminModel.create({
                    email:email,
                    password:password
                })
                await WalletModel.create({
                    ownerId:newadmin._id,
                    userType:"admin"
                })
                const accesstoken=jwt.sign({email:newadmin.email},process.env.JWT_SECRET!, { expiresIn: "15m" });
                const refreshtoken=jwt.sign({email: newadmin.email }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
                return {admin:newadmin,accesstoken, refreshtoken}
            }else{
                if (password !=adminpassword) {
                    throw new Error("Invalid password for admin.");
                }
                console.log(admin.password)
                const accesstoken=jwt.sign({email:admin.email},process.env.JWT_SECRET!, { expiresIn: "15m" });
                const refreshtoken=jwt.sign({email: admin.email }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
            return {admin:admin,accesstoken, refreshtoken}


            }
        }else{
            throw new Error("Unauthorized email. Only admin login is allowed here.");
        }
    }

   


}