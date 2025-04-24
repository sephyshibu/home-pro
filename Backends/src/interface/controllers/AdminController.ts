import { Request,Response } from "express";
import {Login} from '../../application/usecase/Admin/LoginAdmin'
import { RefreshToken } from "../../application/usecase/Admin/RefreshToken";
import { fetchUser } from "../../application/usecase/Admin/FetchUser";
import { BlockUnblock } from "../../application/usecase/Admin/BlockUnblock";
import { Signuptech } from "../../application/usecase/Tech/Register";
import { fetchtech } from "../../application/usecase/Admin/FetchTech";
import { BlockUnBlock } from "../../application/usecase/Admin/BlockUnblockTech";
export class AdminController{
    constructor(
        private loginadmin:Login,
        private refreshtoken:RefreshToken,
        private fetchalluser:fetchUser,
        private blockunblock:BlockUnblock,
        private fetchalltech:fetchtech,
        private blockunblocktech:BlockUnBlock,
        private signuptechs:Signuptech,
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

    async fetchtech(req:Request,res:Response):Promise<void>{
        try {
            const tech=await this.fetchalltech.fetch()
            res.status(200).json({tech})
        } catch (error) {
            
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

    async blockUnblock(req:Request, res:Response):Promise<void>{
        try {
            const{userid}=req.params
            const{isBlocked}=req.body
            console.log(userid,isBlocked)
            const updateduser=await this.blockunblock.blockunblock(userid,isBlocked)
            res.status(200).json({message:"User Updated Successfully",user:updateduser})
        }  catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async blockunblocktechs(req:Request,res:Response):Promise<void>{
        try {
            const {techid}=req.params
            const{isBlocked}=req.body
            console.log("techid", techid,isBlocked)
            const updatetech=await this.blockunblocktech.blockunblocktech(techid, isBlocked)
            res.status(200).json({message:"tech Updated Successfully",tech:updatetech})
        }  catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
   
    async signuptech(req:Request,res:Response):Promise<void>{
            console.log("signup tech")
    
            try {
                const{email,password, phone}=req.body
                const result=await this.signuptechs.addtech(email,password,phone)
                res.status(200).json(result)
            } 
            catch (err:any) {
                console.error("Signup Tech Error:", err.message);
                res.status(400).json({ message: err.message });
              }
        }
    
    }
