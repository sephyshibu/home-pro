import { UserRepository } from "../../../domain/repository/Userrepository";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export class LoginUser{
    constructor(private userRepository:UserRepository){}

    async login(email:string, password:string):Promise<{user:any,accesstoken:string, refreshtoken:string}>{
        console.log("sdfwf",email, password)
        const user=await this.userRepository.findByEmail(email)
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

        const accesstoken=jwt.sign({email:user.email},process.env.JWT_SECRET!, { expiresIn: "15m" });
        const refreshtoken=jwt.sign({email: user.email }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
        
        
    return { user, accesstoken, refreshtoken };
   
    }
}