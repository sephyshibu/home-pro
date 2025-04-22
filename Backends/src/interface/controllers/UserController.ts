import {Request,Response} from 'express'
import { Signup } from '../../application/usecase/User/Registor'
import { CheckEmail } from '../../application/usecase/User/Checkemail';
import { GoogleLogin } from '../../application/usecase/User/GoogleLogin';
import { LoginUser } from '../../application/usecase/User/LoginUser';
import { RefreshToken } from '../../application/usecase/User/RefreshToken';
import { resnedOTP } from '../../application/usecase/User/ResendOTP';
import { VerifyOTP } from '../../application/usecase/User/VerifyOTP';


export class UserController{
    constructor(
        private signupuser:Signup,
        private checkemailuser:CheckEmail,
        private loginuser:LoginUser,
        private refreshtoken:RefreshToken,
        private verifyotp:VerifyOTP,
        private resendOTP:resnedOTP,
        private googleLogin:GoogleLogin
    ){}

    async signup(req:Request, res:Response):Promise<void>{
        try{
            const{name, email, password,phone}=req.body;
            const result=await this.signupuser.adduser(name,email,password,phone);
            res.status(201).json(result)
        }
        catch (err:any) {
            res.status(400).json({ message: err.message });
          }
    }

    async checkEmail(req:Request, res:Response):Promise<void>{
        try {
            const {email}=req.body
            const result=await this.checkemailuser.execute(email)
            res.status(200).json(result)
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req:Request,res:Response):Promise<void>{
        try {
            const{email,password}=req.body
            const result=await this.loginuser.login(email, password)
            res.cookie("refreshtokenuser", result.refreshtoken,{
                httpOnly:true,
                secure:false,
                maxAge:7*24*60*60*1000,
            })
            res.status(200).json({message:"Login Success", user:result.user,token:result.accesstoken})

        }catch (err: any) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
    }


    async verifyotpcontroller(req:Request, res:Response):Promise<void>{
            try {
                const{otp, details}=req.body;
                const result=await this.verifyotp.verify(otp,details)
                res.status(200).json({message:result})
            } catch (err: any) {
                res.status(400).json({ message: err.message });
              }
    }


    async resendotpcontroller(req:Request,res:Response):Promise<void>{
        try {
            const{details}=req.body
            const result=await this.resendOTP.resend(details)
            res.status(200).json({ message: result });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
    }

    async googleLoginController(req:Request, res:Response):Promise<void>{
        try {
            const{email, sub, name}=req.body
            const result=await this.googleLogin.GoogleLogin(email, sub, name);
            res.status(200).json({ message: "Google Login Successful", user: result.user, token: result.token });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
            }
    }

    async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.refreshtokenuser;
            const newaccesstoken=await this.refreshtoken.refresh(token);
            res.status(200).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
    }
}