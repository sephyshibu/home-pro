import { UserRepository } from "../../../domain/repository/Userrepository";
import { IUser } from "../../../domain/models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { otpCache } from "../../../infrastructure/cache/OTPCache";
import { generateOTP } from "../../service/OTPGenerator";
import { EmailService } from "../../service/EmailService";
require('dotenv').config()

export class Signup{
    constructor(private userRepository:UserRepository, private emailservice:EmailService){}

    async adduser(name:string,email:string,password:string,phone:string):Promise<{token:string}>{
        console.log(name,email,password,phone)
        const existinguser=await this.userRepository.findByEmail(email);
        if(existinguser){
            throw new Error("email already exists")
        }
        const otp=generateOTP()
        const emailsent=await this.emailservice.sendVerificationEmail(email,otp)

        if(!emailsent){
            throw new Error("Failed to send email")
        }
        otpCache.set(email, { name, email, password, phone, otp }, 300); // Save user details + otp for 5 mins
        const hashpassword=await bcrypt.hash(password,10)
        const newuser:IUser={
          
            name, 
            email,
            phone,
            password:hashpassword,
            isBlocked:false

        }
      
        const createdUser=await this.userRepository.createUser(newuser)
        console.log("created user", createdUser)

        if (!process.env.JWTSECRET) {
            throw new Error("JWT secret is not defined in the environment variables.");
        }


        const token=jwt.sign({id:createdUser._id},process.env.JWTSECRET,{expiresIn:'1d'})
        console.log("token", token)
        return {token}
    }



}