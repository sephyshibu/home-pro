import { IUserRepository } from "../../../domain/repository/Userrepository";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateAccessToken, generaterefreshtoken } from "../../../infrastructure/generateToken";

export class LoginUser{
    constructor(private _userRepository:IUserRepository){}

    async login(email:string, password:string):Promise<{user:any,accesstoken:string, refreshtoken:string}>{
        console.log("sdfwf",email, password)
        const user=await this._userRepository.findByEmail(email)
        if(!user){
            throw new Error("User Not found")
        }
        if (!user.password) {
            throw new Error("password Not found")
          }

        const match=await bcrypt.compare(password,user.password);
        if(!match){
            throw new Error("Invalid password")
        }

        if(user.isBlocked){
            throw new Error("user is Blocked by admin")
        }

        const payload={email:user.email}
        
        const accesstoken=generateAccessToken(payload)
        const refreshtoken=generaterefreshtoken(payload)

        // const accesstoken=jwt.sign({email:user.email},process.env.JWT_SECRET!, { expiresIn: "15m" });
        // const refreshtoken=jwt.sign({email: user.email }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
        
        
    return { user, accesstoken, refreshtoken };
   
    }
}