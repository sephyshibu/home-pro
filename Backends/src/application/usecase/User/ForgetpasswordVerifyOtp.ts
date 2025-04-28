import bcrypt from 'bcryptjs'
import { otpCache } from '../../../infrastructure/cache/OTPCache'
import { userModel } from '../../../infrastructure/db/schemas/Usermodel'
import { WalletModel } from '../../../infrastructure/db/schemas/Walletmodel'


type OtpCacheData = {
    otp: string;
    details: string;
   
  };
  

export class ForgetpasswordVerifyOTP{
    async verify(otp:string,details:{email:string}):Promise<string>{
      console.log("usecase",otp, details)
        const cachedData = otpCache.get<OtpCacheData>(details.email);
        console.log(cachedData)
        if(cachedData && otp===cachedData.otp){
              console.log("sdad")
              console.log(cachedData.details)
              console.log(otp===cachedData.otp)
              otpCache.del(cachedData.details);
              return "Otp Verified Successfully";
            } else {
              throw new Error("Invalid OTP, Please try again");
            }
        }

    }
