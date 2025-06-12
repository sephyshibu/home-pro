import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { userMessage } from "../../domain/shared/Usermessage/usermessage";
import { Signup } from '../../application/usecase/User/Registor'
import { CheckEmail } from '../../application/usecase/User/Checkemail';
import { GoogleLogin } from '../../application/usecase/User/GoogleLogin';
import { LoginUser } from '../../application/usecase/User/LoginUser';
import { RefreshToken } from '../../application/usecase/User/RefreshToken';
import { resnedOTP } from '../../application/usecase/User/ResendOTP';
import { VerifyOTP } from '../../application/usecase/User/VerifyOTP';
import { ForgetpasswordVerifyOTP } from '../../application/usecase/User/ForgetpasswordVerifyOtp';
import { forgetpasswordresnedOTP } from '../../application/usecase/User/ForgetpasswordresendOTP';
import { changepassword } from '../../application/usecase/User/Changepassword';
import { fetchCategory } from '../../application/usecase/Admin/Fetchcategory';  


export class AuthController{
    constructor(
        private _signupuser:Signup,
        private _checkemailuser:CheckEmail,
        private _loginuser:LoginUser,
        private _refreshtoken:RefreshToken,
        private _verifyotp:VerifyOTP,
        private _resendOTP:resnedOTP,
        private _googleLogin:GoogleLogin,
        private _forgetpasswordverifyOTP:ForgetpasswordVerifyOTP,
        private _forgtepasswordresendOtp:forgetpasswordresnedOTP,
        private _changePassword:changepassword,
        private _fetchcat:fetchCategory
    ){}

     async signup(req:Request, res:Response):Promise<void>{
        console.log('signup')
        try{
            const{name, email, password,phone}=req.body;
          
            const result=await this._signupuser.adduser(name,email,password,phone);
            res.status(HTTPStatusCode.CREATED).json(result)
        }
        catch (err:any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
          }
    }

    async checkEmail(req:Request, res:Response):Promise<void>{
        try {
            const {email}=req.body
            const result=await this._checkemailuser.execute(email)
            res.status(HTTPStatusCode.OK).json(result)
        } catch (error:any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: error.message });
        }
    }

    async login(req:Request,res:Response):Promise<void>{
        try {
          
            const{email,password}=req.body
            console.log(req.body)
            const result=await this._loginuser.login(email, password)
            res.cookie(process.env.COOKIE_NAME_USER ||"refreshtokenuser", result.refreshtoken,{
                httpOnly:process.env.COOKIE_HTTPONLY==='true',
                secure:process.env.COOKIE_SECURE==='false',
                maxAge:parseInt(process.env.COOKIE_MAXAGE || "604800000"),
            })
            res.status(HTTPStatusCode.OK).json({message:userMessage.LOGIN_SUCCESS, user:result.user,token:result.accesstoken})

        }catch (err: any) {
      res.status(err.statusCode || HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
    }




    async verifyotpcontroller(req:Request, res:Response):Promise<void>{
            try {
                const{otp, details}=req.body;
                console.log(otp,details)
                const result=await this._verifyotp.verify(otp,details)
                res.status(HTTPStatusCode.OK).json({message:result})
            } catch (err: any) {
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
              }
    }

    async forgetpasswordVerifyOTP(req:Request, res:Response):Promise<void>{
        try {
            const {otp,details}=req.body
            console.log(otp,details)
            const result=await this._forgetpasswordverifyOTP.verify(otp,details)
            res.status(HTTPStatusCode.OK).json({message:result})
            } catch (err: any) {
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
              }

        
    }

    async changepassword(req:Request,res:Response):Promise<void>{
        try {
            const{password,email}=req.body
            console.log(password,email)
            const result=await this._changePassword.changepass(password,email)
            res.status(HTTPStatusCode.OK).json({message:result})
        } catch (err: any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
          }
    }

    async forgetpasswordresnedOTP(req:Request, res:Response):Promise<void>{
        try {
            const {details}=req.body
            const result=await this._forgtepasswordresendOtp.resend(details)
            res.status(HTTPStatusCode.OK).json({ message: result });
        } catch (err: any) {
          res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
        }

      
    }


    async resendotpcontroller(req:Request,res:Response):Promise<void>{
        try {
            const{details}=req.body
            const result=await this._resendOTP.resend(details)
            res.status(HTTPStatusCode.OK).json({ message: result });
        } catch (err: any) {
          res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
        }
    }

    async googleLoginController(req:Request, res:Response):Promise<void>{
        try {
            console.log("google")
            const{email, sub, name}=req.body
            const result=await this._googleLogin.GoogleLogin(email, sub, name);
            res.status(HTTPStatusCode.OK).json({ message: userMessage.GOOGLE_LOGIN_SUCCESS, user: result.user, token: result.token });
        } catch (err: any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
            }
    }

    async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.[process.env.COOKIE_NAME_USER||"refreshtokenuser"];
            console.log("refreshtokencontroller",token)
            const newaccesstoken=await this._refreshtoken.refresh(token);
            console.log("in refresh token controller with new access tokern ",newaccesstoken)
            res.status(HTTPStatusCode.OK).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
        }
    }

    async fetchCategory(req:Request,res:Response):Promise<void>{
        try {
            const category=await this._fetchcat.fetch()
            res.status(HTTPStatusCode.OK).json({category})
        } catch (error:any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}