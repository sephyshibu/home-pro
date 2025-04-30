import { IAddress } from "../models/Address";

export interface Addressrepository{
    fetchaddress(userId:string):Promise<IAddress|null>
    addaddress(address:Partial<IAddress>):Promise<IAddress>
    findByaddressName(addressname:string):Promise<IAddress|null>
}