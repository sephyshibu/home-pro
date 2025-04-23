import { Request,Response } from "express";
import {Login} from '../../application/usecase/Admin/LoginAdmin'
import { RefreshToken } from "../../application/usecase/Admin/RefreshToken";
import { fetchUser } from "../../application/usecase/Admin/FetchUser";

export class AdminController{
    constructor(
        private loginadmin:Login,
        private refreshtoken:RefreshToken,
        private fetchalluser:fetchUser
    ){}


    async login(req:Request, res:Response):Promise<void>{
        console.log("admion Login in Controller")

        try {
            const{email, password}=req.body
            const result=await this.loginadmin.loginadmin(email,password);
            res.cookie("refreshtokenadmin", result.refreshtoken,{
                httpOnly:true,
                secure:false,
                maxAge:7*24*60*60*1000,
            })
            res.status(200).json({message:"Login Success", admin:result.admin,token:result.accesstoken})
        }
        catch (err:any) {
            res.status(400).json({ message: err.message });
          }
    }

    async fetchuser(req:Request,res:Response):Promise<void>{
        try {
            const user=await this.fetchalluser.fetch()
            res.status(200).json({user})
        }catch (error: any) {
            res.status(500).json({ message: error.message });
          }
    }

    async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.refreshtokenadmin;
            const newaccesstoken=await this.refreshtoken.refresh(token);
            res.status(200).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
    }
}