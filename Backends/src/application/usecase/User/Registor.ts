import { IUserRepository } from "../../../domain/repository/Userrepository";
import { IUser } from "../../../domain/models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { otpCache } from "../../../infrastructure/cache/OTPCache";
import { generateOTP } from "../../service/OTPGenerator";
import { EmailService } from "../../service/EmailService";
require('dotenv').config()

export class Signup{
    constructor(private _userRepository:IUserRepository, private _emailservice:EmailService){}

    async adduser(name:string,email:string,password:string,phone:string):Promise<{message:string}>{
        console.log(name,email,password,phone)
        const existinguser=await this._userRepository.findByEmail(email);
        if(existinguser){
            throw new Error("email already exists")
        }
        const otp=generateOTP()
        const emailsent=await this._emailservice.sendVerificationEmail(email,otp)

        if(!emailsent){
            throw new Error("Failed to send email")
        }

        otpCache.set(email, { name, email, password, phone, otp }, 300); // Save user details + otp for 5 mins
       

    return { message: "OTP sent successfully. Please verify your OTP." };
    }



}