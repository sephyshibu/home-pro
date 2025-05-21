import {EmailService} from '../../service/EmailService'
import { otpCache } from '../../../infrastructure/cache/OTPCache'
import { generateOTP } from '../../service/OTPGenerator'

export class forgetpasswordresnedOTP{
    constructor(private _emailService:EmailService){}
    async resend(details:any):Promise<string>{
        const{ email}=details
        console.log("backernd", email)
        const otp=generateOTP()

        const emailsent=await this._emailService.sendVerificationEmail(email, otp)


        if(!emailsent){
            throw new Error("Failed to resend OTP");
        }

        otpCache.set(email,{email, otp},300)
        return "OTP Resend Successfully";
   
    }

}