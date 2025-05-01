import { Addressrepository } from "../../../domain/repository/Addressrepository";

export class DeleteAddressById{
    constructor(private addressrepository:Addressrepository){}


    async deleteaddressbyId(addressid:string){
        const address=await this.addressrepository.deleteAddressById(addressid)
        if(!address) throw new Error("address not found");
        return address;
    }
}