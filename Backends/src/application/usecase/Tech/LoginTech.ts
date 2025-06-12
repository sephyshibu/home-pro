import { ITechRepository } from "../../../domain/repository/Techrepository";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export class LoginTech{
    constructor(private _techrepository:ITechRepository){}


    async logintech(email:string, password:string):Promise<{tech:any, accesstoken:string,refreshtoken:string}>{
        const tech=await this._techrepository.findByEmail(email)

        if(!tech){
            throw new Error("tech Not FOund")

        }
        if(!tech.password){
            throw new Error("password not found")
        }

        const match=await bcrypt.compare(password,tech.password);
        if(!match){
            throw new Error("Invalid password");
        }

        if(tech.isBlocked){
            throw new Error("tech is blocked by admin")
        }

        const accesstoken=jwt.sign({email:tech.email},process.env.JWT_SECRET!,{expiresIn:"15m"})
        const refreshtoken =jwt.sign({email:tech.email},process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

        return { tech, accesstoken, refreshtoken };
    }
}