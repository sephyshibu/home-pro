import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { userMessage } from "../../domain/shared/Usermessage/usermessage";
import { GetUserById } from '../../application/usecase/User/MyProfile/UserDetails';
import { EditProfile } from '../../application/usecase/User/MyProfile/EditProfile';

export class ProfileController{
    constructor(
        private _getuserById:GetUserById,
        private _editprofile:EditProfile,
    ){}

    async fetchUserById(req:Request,res:Response){
        try {
            const {userId}=req.params
            console.log("usder Id", userId)
            const user=await this._getuserById.getuserById(userId)
            res.status(HTTPStatusCode.OK).json({user})
        } catch (err: any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
          }
    }

    async edituser(req:Request,res:Response){
        try {
            const{userId}=req.params
            const{name, email, phone}=req.body
            const result=await this._editprofile.editprofile(userId,{name,email, phone})
            res.status(HTTPStatusCode.OK).json({message:userMessage.USER_UPDATED,user:result})
        } catch (error:any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: error.message });
        }
    }
}