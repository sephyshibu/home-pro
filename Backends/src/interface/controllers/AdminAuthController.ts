import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { AdminMessages } from "../../domain/shared/Adminmessage/adminmessage";
import {Login} from '../../application/usecase/Admin/LoginAdmin'
import { RefreshToken } from "../../application/usecase/Admin/RefreshToken";

export class AdminAuthController{
    constructor(
         private _loginadmin:Login,
        private _refreshtoken:RefreshToken,
    ){}

    async login(req:Request, res:Response):Promise<void>{
            console.log("admion Login in Controller")
    
            try {
                const{email, password}=req.body
                const result=await this._loginadmin.loginadmin(email,password);
                res.cookie(process.env.COOKIE_NAME_ADMIN||"refreshtokenadmin", result.refreshtoken,{
                    httpOnly:process.env.COOKIE_HTTPONLY==='true',
                    secure:process.env.COOKIE_SECURE==='false',
                    maxAge:parseInt(process.env.COOKIE_MAXAGE ||"604800000"),
                })
                res.status(HTTPStatusCode.OK).json({message:AdminMessages.AUTH.LOGIN_SUCCESS, admin:result.admin,token:result.accesstoken})
            }
            catch (err:any) {
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
              }
        }

        async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.[process.env.COOKIE_NAME_ADMIN||"refreshtokenadmin"];
             console.log("refreshtokencontrolleradmin",token)
            const newaccesstoken=await this._refreshtoken.refresh(token);
             console.log("in refresh token controller admin with new access tokern ",newaccesstoken)
            res.status(HTTPStatusCode.OK).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
        }
    }

}