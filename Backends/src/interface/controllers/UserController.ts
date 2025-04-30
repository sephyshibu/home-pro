import {Request,Response} from 'express'
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
import { GetUserById } from '../../application/usecase/User/MyProfile/UserDetails';
import { EditProfile } from '../../application/usecase/User/MyProfile/EditProfile';
import { FetchTechBasedOnAvailable } from '../../application/usecase/User/Tech/fetchTech';
export class UserController{
    constructor(
        private signupuser:Signup,
        private checkemailuser:CheckEmail,
        private loginuser:LoginUser,
        private refreshtoken:RefreshToken,
        private verifyotp:VerifyOTP,
        private resendOTP:resnedOTP,
        private googleLogin:GoogleLogin,
        private forgetpasswordverifyOTP:ForgetpasswordVerifyOTP,
        private forgtepasswordresendOtp:forgetpasswordresnedOTP,
        private changePassword:changepassword,
        private fetchcat:fetchCategory,
        private getuserById:GetUserById,
        private editprofile:EditProfile,
        private fetchtechonavailable:FetchTechBasedOnAvailable
    ){}

    async signup(req:Request, res:Response):Promise<void>{
        console.log('signup')
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
            console.log(req.body)
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
                console.log(otp,details)
                const result=await this.verifyotp.verify(otp,details)
                res.status(200).json({message:result})
            } catch (err: any) {
                res.status(400).json({ message: err.message });
              }
    }

    async forgetpasswordVerifyOTP(req:Request, res:Response):Promise<void>{
        try {
            const {otp,details}=req.body
            console.log(otp,details)
            const result=await this.forgetpasswordverifyOTP.verify(otp,details)
            res.status(200).json({message:result})
            } catch (err: any) {
                res.status(400).json({ message: err.message });
              }

        
    }

    async changepassword(req:Request,res:Response):Promise<void>{
        try {
            const{password,email}=req.body
            console.log(password,email)
            const result=await this.changePassword.changepass(password,email)
            res.status(200).json({message:result})
        } catch (err: any) {
            res.status(400).json({ message: err.message });
          }
    }

    async forgetpasswordresnedOTP(req:Request, res:Response):Promise<void>{
        try {
            const {details}=req.body
            const result=await this.forgtepasswordresendOtp.resend(details)
            res.status(200).json({ message: result });
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
            console.log("google")
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
            console.log("refreshtokencontroller",token)
            const newaccesstoken=await this.refreshtoken.refresh(token);
            res.status(200).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
    }

    async fetchCategory(req:Request,res:Response):Promise<void>{
        try {
            const category=await this.fetchcat.fetch()
            res.status(200).json({category})
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }


    async fetchUserById(req:Request,res:Response){
        try {
            const {userId}=req.params
            const user=await this.getuserById.getuserById(userId)
            res.status(200).json({user})
        } catch (err: any) {
            res.status(400).json({ message: err.message });
          }
    }

    async edituser(req:Request,res:Response){
        try {
            const{userId}=req.params
            const{name, email, phone}=req.body
            const result=await this.editprofile.editprofile(userId,{name,email, phone})
            res.status(200).json({message:"user updated",user:result})
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }

    async fetchTechBasedonavailble(req:Request,res:Response):Promise<void>{
        console.log("controller")
        try {
            const{pincode,date,categoryId}=req.query
            console.log(pincode,date,categoryId)
            if(!pincode|| !date ||!categoryId){
                 res.status(400).json({message:"Missing required fields"})
            }

            const technicians=await this.fetchtechonavailable.fetchTechBasedOnAvailble(pincode as string,date as string,categoryId as string)
            console.log(technicians)
            if (!technicians || technicians.length === 0) {
                 res.status(404).json({ message: "No technicians available" });
              }
          
               res.status(200).json({ technicians });
        } catch (error: any) {
            console.error("Error fetching technicians:", error);
            res.status(500).json({ message: "Internal server error" });
          }
    }
}