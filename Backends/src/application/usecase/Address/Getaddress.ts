import { IAddressrepository } from "../../../domain/repository/Addressrepository";

export class GetAddressById{
    constructor(private _addressrepository:IAddressrepository){}


    async getaddressbyId(userId:string){
        const address=await this._addressrepository.fetchaddress(userId)
        if(!address) throw new Error("address not found");
        return address;
    }
}