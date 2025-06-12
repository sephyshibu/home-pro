import { Request, Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { userMessage } from "../../domain/shared/Usermessage/usermessage";
import { FetchTechBasedOnAvailable } from '../../application/usecase/User/Tech/FetchTech';
import { fetchTechwithcategory } from '../../application/usecase/User/Tech/FetchTechById';


export class TechControllers{
    constructor(
        private _fetchtechonavailable:FetchTechBasedOnAvailable,
        private _fetchtechwithcategory:fetchTechwithcategory,
    ){}

    async fetchTechBasedonavailble(req:Request,res:Response):Promise<void>{
        console.log("controller")
        try {
            const{pincode,date,categoryId}=req.query
            console.log(pincode,date,categoryId)
            if(!pincode|| !date ||!categoryId){
                 res.status(HTTPStatusCode.BAD_REQUEST).json({message:userMessage.MISSING_FIELDS})
                 return
            }

            const technicians=await this._fetchtechonavailable.fetchTechBasedOnAvailble(pincode as string,date as string,categoryId as string)
            console.log(technicians)
            if (!technicians || technicians.length === 0) {
                 res.status(HTTPStatusCode.NOT_FOUND).json({ message: userMessage.TECHNICIAN_NOT_AVAILABLE });
                 return
              }
          
               res.status(HTTPStatusCode.OK).json({ technicians });
        } catch (error: any) {

            if (error.message === "technician not found") {
                res.status(HTTPStatusCode.NOT_FOUND).json({ message: userMessage.TECHNICIAN_NOT_AVAILABLE });
              }
              else if (error.message==="date is not valid date"){
                res.status(HTTPStatusCode.BAD_REQUEST).json({message:userMessage.TECHNICIAN_SLOT_INVALID})
              }
              else if(error.message="User ID is required in headers"){
                res.status(HTTPStatusCode.BAD_REQUEST).json({message:userMessage.UNAUTHORIZED})
              }
               else {
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
              }
            console.error("Error fetching technicians:", error);
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
          }
    }

    async fetctechwithcat(req:Request, res:Response){
            try {
                console.log("fetching")
                const{techid}=req.params
                console.log("techid",techid)
                const technian=await this._fetchtechwithcategory.fetchtechwithcategory(techid)
                console.log(technian)
                res.status(HTTPStatusCode.OK).json({technian})
            } catch (err:any) {
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
            }
        }
}