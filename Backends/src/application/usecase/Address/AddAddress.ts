import { Addressrepository } from "../../../domain/repository/Addressrepository";
import { IAddress } from "../../../domain/models/Address";

export class AddAddress{
    constructor(private addressrepository:Addressrepository){}

    async addaddress(userId:string,type: string,addressname:string,street:string,city: string,state: string,country: string, pincode:string,):Promise<{message:string}>{
        const sanitizedaddressname=addressname.trim().toLowerCase()
        const existing=await this.addressrepository.findByaddressName(sanitizedaddressname)
        if(existing){
            throw new Error("this address is already added")
        } 

        const address:IAddress={
            userId,
            type,
            addressname:sanitizedaddressname,
            street,
            city,
            state,
            country, pincode

        }

        await this.addressrepository.addaddress(address)
        return {message:"add address successfully"}
    }
}