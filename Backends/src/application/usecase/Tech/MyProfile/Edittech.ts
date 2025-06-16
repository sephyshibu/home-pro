import { ITechRepository } from "../../../../domain/repository/Techrepository";
import { ITech } from "../../../../domain/models/Tech";
import { TechProfileDTO } from "../../../dto/TechProfileDTO";

export class EditTech{
    constructor(private _techrepository:ITechRepository){}


    async edittech(techId:string,data: {
      name:string,
        email: string;
        phone: string;
        rateperhour: number;
        serviceablepincode: string[];
        categoryid:string,
        noofworks: number;
        profileimgurl: string;
        consulationFee: number;
        workphotos: string[];
      }):Promise<{message:string,updatetech?:TechProfileDTO}>{
        const existingtech=await this._techrepository.findOneTech(techId)
        console.log("existing tech inside edittech in  usecase",existingtech)
        if(!existingtech){
            throw new Error("tech Not found")
        }

        const updatetech=await this._techrepository.edittech(techId, data)
        console.log("updated tech", updatetech)
        return {
            message:"Updarted",
            updatetech:updatetech??undefined
        }
      }
}