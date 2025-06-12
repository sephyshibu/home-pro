import { IAddressrepository } from "../../../domain/repository/Addressrepository";

export class DeleteAddressById{
    constructor(private _addressrepository:IAddressrepository){}


    async deleteaddressbyId(addressid:string){
        const address=await this._addressrepository.deleteAddressById(addressid)
        if(!address) throw new Error("address not found");
        return address;
    }
}