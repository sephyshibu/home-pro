import { Addressrepository } from "../../domain/repository/Addressrepository";
import { IAddress } from "../../domain/models/Address";
import { AddressModel } from "../db/schemas/AddressModel";

export class AddressRepositoryImpl implements Addressrepository {
    async fetchaddress(userId: string): Promise<IAddress[] | null> {
        console.log("userId", userId)
      const addresses = await AddressModel.find({ userId });
      console.log(addresses)
      return addresses.length ? addresses : null;
    }
  
    async addaddress(address: Partial<IAddress>): Promise<IAddress> {
        console.log("adress",address)
      const newAddress =await AddressModel.create(address);
      return  newAddress.save();
    }
  
    async findByaddressName(addressname: string): Promise<IAddress | null> {
      return await AddressModel.findOne({ addressname });
    }
  
    async fetchoneaddress(addressid: string): Promise<IAddress | null> {
      return await AddressModel.findById(addressid);
    }
  
    async editaddress(addressid: string, update: Partial<IAddress>): Promise<IAddress> {
      const updated = await AddressModel.findByIdAndUpdate(addressid, update, { new: true });
      if (!updated) {
        throw new Error("Address not found or failed to update.");
      }
      return updated;
    }

    async deleteAddressById(addressId: string): Promise<boolean> {
        const result = await AddressModel.findByIdAndDelete(addressId);
        return result !== null;
    }
  }