import { Addressrepository } from "../../../domain/repository/Addressrepository";
import { IAddress } from "../../../domain/models/Address";

export class AddAddress{
    constructor(private addressrepository:Addressrepository){}

    async addaddress(userId:string,types: string,addressname:string,street:string,city: string,state: string,country: string, pincode:string,):Promise<{message:string}>{
        console.log("types", types)
        const sanitizedaddressname=addressname.trim().toLowerCase()
        console.log(sanitizedaddressname)
        const existing=await this.addressrepository.findByAddressName(userId,sanitizedaddressname)
        console.log('existing',existing)
        if(existing){
            console.log("existin")
            throw new Error("This address is already added");
        } 
        console.log("dasdf")

        const address:IAddress={
            userId,
            types,
            addressname:sanitizedaddressname,
            street,
            city,
            state,
            country, pincode

        }
        console.log("badcda",address)

        await this.addressrepository.addaddress(address)
        return {message:"add address successfully"}
    }
}