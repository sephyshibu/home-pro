import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { TechMessages } from "../../domain/shared/Techmessage/techmessage";
import { LoginTech } from "../../application/usecase/Tech/LoginTech";
import { RefreshToken } from "../../application/usecase/Tech/RefreshToken";


export class TechAuthController{
    constructor(
        private _logintech:LoginTech,
        private _refreshtoken:RefreshToken,
    ){}
    async login(req:Request,res:Response):Promise<void>{
        console.log("login tech")

        try {
            const{email,password}=req.body
            const result=await this._logintech.logintech(email,password)
            res.cookie(process.env.COOKIE_NAME_TECH || "refreshtokentech", result.refreshtoken,{
                httpOnly:process.env.COOKIE_HTTPONLY==='true',
                secure:process.env.COOKIE_SECURE==='false',
                maxAge:parseInt(process.env.COOKIE_MAXAGE ||"604800000"),
            })
            res.status(HTTPStatusCode.OK).json({message:TechMessages.LOGIN_SUCCESS, tech:result.tech,token:result.accesstoken})
        } 
        catch (err:any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
          }
    }

    async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.[process.env.COOKIE_NAME_TECH||"refreshtokentech"];
            console.log("refreshtokencontrollertech",token)
            const newaccesstoken=await this._refreshtoken.refresh(token);
             console.log("in refresh token controller tech with new access tokern ",newaccesstoken)
            res.status(HTTPStatusCode.OK).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
        }
    }
}