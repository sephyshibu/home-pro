import { IUserRepository } from "../../../domain/repository/Userrepository";
import { EmailService } from "../../service/EmailService";
import { generateOTP } from "../../service/OTPGenerator";
import { otpCache } from "../../../infrastructure/cache/OTPCache";


export class CheckEmail{
  constructor(private _userRepository:IUserRepository, private _emailService:EmailService){}

  async execute(email:string):Promise<{message:string, email?:string}>{
    const user=await this._userRepository.findByEmail(email)
    if(!user){
        throw new Error("email not found")
    }

    if(user.isBlocked){
        throw new Error("user is blocked by admin")
    }

    const otp=generateOTP()

    const emailsent=await this._emailService.sendVerificationEmail(email, otp);

    if(!emailsent){
        throw new Error("failed to send email")
    }
    otpCache.set(email, { otp, details: email }, 300);


    return { message: "successful", email };
  }

}