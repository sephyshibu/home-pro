import {EmailService} from '../../../application/service/EmailService'
import { otpCache } from '../../../infrastructure/cache/OTPCache'
import { generateOTP } from '../../service/OTPGenerator'

export class resnedOTP{
    constructor(private emailService:EmailService){}
    async resend(details:any):Promise<string>{
        const{name, email,password, phone}=details

        const otp=generateOTP()

        const emailsent=await this.emailService.sendVerificationEmail(email, otp)


        if(!emailsent){
            throw new Error("Failed to resend OTP");
        }

        otpCache.set(email,{name, email, password, phone, otp},300)
        return "OTP Resend Successfully";
   
    }

}