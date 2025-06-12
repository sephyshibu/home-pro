import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { TechMessages } from "../../domain/shared/Techmessage/techmessage";
import { GetTechById } from "../../application/usecase/Tech/MyProfile/TechDetails";
import { EditTech } from "../../application/usecase/Tech/MyProfile/Edittech";
import { fetchCategory } from "../../application/usecase/Admin/Fetchcategory";
import { PasswordChange } from "../../application/usecase/Tech/Password/ChangePassword";

export class TechProfileController{
    constructor(
        private _gettechbyid:GetTechById,
        private _edittech:EditTech,
        private _fetchcat:fetchCategory,
        private _passwordhcange:PasswordChange,
    ){}
    async fetchTechById(req:Request, res:Response){
        try {
            const{techId}=req.params
           const tech= await this._gettechbyid.gettechbyid(techId)
           res.status(HTTPStatusCode.OK).json({tech})
        } catch (err: any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
          }
    }

    async edittechs(req:Request,res:Response){
        console.log("tech")
        try {
            const{techId}=req.params
            const{name,email,
                phone,
                rateperhour,
                serviceablepincode,
                categoryid,
                noofworks,
                profileimgurl,
                consulationFee,
                workphotos}=req.body

            console.log(req.body)
            const result= await this._edittech.edittech(techId,{name,email,
                phone,
                rateperhour,
                serviceablepincode,
                categoryid,
                noofworks,
                profileimgurl,
                consulationFee,
                workphotos})
            
                res.status(HTTPStatusCode.OK).json({message:TechMessages.EDIT_TECH_SUCCESS,tech:result})
            } catch (error:any) {
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message: error.message });
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

    async passwordChanges(req:Request, res:Response):Promise<void>{
            try {
            
                const{techId}=req.params
                const{password}=req.body
                console.log(req.body)
                const result=await this._passwordhcange.editpassword(techId, password)
                res.status(HTTPStatusCode.OK).json({message:result.message})
            } catch (err: any) {
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
                
            }
        }
}