import { IAddress } from "../models/Address";

export interface Addressrepository{
    fetchaddress(userId:string):Promise<IAddress[]|null>
    addaddress(address:IAddress):Promise<IAddress>
    findByaddressName(addressname:string):Promise<IAddress|null>
    fetchoneaddress(addressid:string):Promise<IAddress|null>
    editaddress(addressid:string,update:Partial<IAddress>):Promise<IAddress>
    deleteAddressById(addressid:string):Promise<boolean>
}