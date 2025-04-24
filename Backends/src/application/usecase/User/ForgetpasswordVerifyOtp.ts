import bcrypt from 'bcryptjs'
import { otpCache } from '../../../infrastructure/cache/OTPCache'
import { userModel } from '../../../infrastructure/db/schemas/Usermodel'
import { WalletModel } from '../../../infrastructure/db/schemas/Walletmodel'


type OtpCacheData = {
    otp: string;
    email: string;
   
  };
  

export class ForgetpasswordVerifyOTP{
    async verify(otp:string,details:{email:string}):Promise<string>{
        const cachedData = otpCache.get<OtpCacheData>(details.email);

        if(cachedData && otp===cachedData.otp){
            
              otpCache.del(cachedData.email);
              return "Otp Verified Successfully";
            } else {
              throw new Error("Invalid OTP, Please try again");
            }
        }

    }
