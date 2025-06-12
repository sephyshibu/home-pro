import { IAddressrepository } from "../../../domain/repository/Addressrepository";
import { IAddress } from "../../../domain/models/Address";
import { Error } from "mongoose";

export class Editaddress{
    constructor(private _addressrepository:IAddressrepository){}



    async editaddress(addressid:string,data:{ types: string,addressname:string,street:string,city: string,state: string,country: string, pincode:string}):Promise<{message:string; updateaddress?:IAddress}>{
       console.log("edit",data)
       console.log("id",addressid)
        const existingaddress=await this._addressrepository.fetchoneaddress(addressid)
        if(!existingaddress){
            throw new Error("adress not found")
        }

        const updateaddress=await this._addressrepository.editaddress(addressid,data)

        return{
            message: "Address updated successfully",
            updateaddress
        }
    }
}