import bcrypt from 'bcryptjs'
import { otpCache } from '../../../infrastructure/cache/OTPCache'
import { userModel } from '../../../infrastructure/db/schemas/Usermodel'
import { WalletModel } from '../../../infrastructure/db/schemas/Walletmodel'


type OtpCacheData = {
    otp: string;
    email: string;
    password: string;
    name: string;
    phone: string;
  };
  

export class VerifyOTP{
    async verify(otp:string,details:{email:string}):Promise<string>{
        const cachedData = otpCache.get<OtpCacheData>(details.email);

        if(cachedData && otp===cachedData.otp){
            const hash = await bcrypt.hash(cachedData.password, 10);

            const newUser = await userModel.create({
                username: cachedData.name,
                email: cachedData.email,
                password: hash,
                phonenumber: cachedData.phone,
              });
              await WalletModel.create({ userId: newUser._id });

              otpCache.del(cachedData.email);
              return "User created Successfully";
            } else {
              throw new Error("Invalid OTP, Please try again");
            }
        }

    }
