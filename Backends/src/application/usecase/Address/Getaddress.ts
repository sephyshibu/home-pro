import { Addressrepository } from "../../../domain/repository/Addressrepository";

export class GetAddressById{
    constructor(private addressrepository:Addressrepository){}


    async getaddressbyId(userId:string){
        const address=await this.addressrepository.fetchaddress(userId)
        if(!address) throw new Error("address not found");
        return address;
    }
}