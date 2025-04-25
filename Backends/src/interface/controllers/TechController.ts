import { Request,Response } from "express";
import { LoginTech } from "../../application/usecase/Tech/LoginTech";
import { RefreshToken } from "../../application/usecase/Tech/RefreshToken";
export class techController{
    constructor(
        private logintech:LoginTech,
        private refreshtoken:RefreshToken
    ){}

    async login(req:Request,res:Response):Promise<void>{
        console.log("login tech")

        try {
            const{email,password}=req.body
            const result=await this.logintech.logintech(email,password)
            res.cookie("refreshtokentech", result.refreshtoken,{
                httpOnly:true,
                secure:false,
                maxAge:7*24*60*60*1000,
            })
            res.status(200).json({message:"Login Success", tech:result.tech,token:result.accesstoken})
        } 
        catch (err:any) {
            res.status(400).json({ message: err.message });
          }
    }

    async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.refreshtokentech;
            const newaccesstoken=await this.refreshtoken.refresh(token);
            res.status(200).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
    }

}
