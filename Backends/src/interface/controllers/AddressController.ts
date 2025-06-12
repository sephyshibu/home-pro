import e, { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { userMessage } from "../../domain/shared/Usermessage/usermessage";
import { GetAddressById } from '../../application/usecase/Address/Getaddress';
import { AddAddress } from '../../application/usecase/Address/AddAddress';
import { Editaddress } from '../../application/usecase/Address/EditAddress';
import { DeleteAddressById } from '../../application/usecase/Address/DeleteAddress';

export class AddressController{
    constructor(
        private _addaddress: AddAddress,
        private _editaddress: Editaddress,
        private _getaddressbyid: GetAddressById,
        private _deleteaddress: DeleteAddressById,
    ){}

    async addUserAddress(req: Request, res: Response): Promise<void> {
        try {
            const { userId}=req.params
            const{types, addressname, street, city, state, country, pincode } = req.body;
            console.log(userId)
            console.log(req.body)
            console.log(addressname)
            const result = await this._addaddress.addaddress(
                userId,
                types,
                addressname,
                street,
                city,
                state,
                country,
                pincode
            );
            console.log("adff",result)
            res.status(HTTPStatusCode.CREATED).json({message:userMessage.ADDRESS_ADDED});
        }catch (err: any) {
            console.error("Error adding address:", err);
            const errorMessage = err?.message || "An unexpected error occurred";
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: errorMessage });
        }
    }
    async editUserAddress(req: Request, res: Response): Promise<void> {
        try {
            const { addressId } = req.params;
            const { types, addressname, street, city, state, country, pincode } = req.body;
            console.log(req.body)
            console.log("delete",addressId)
            const result = await this._editaddress.editaddress(addressId, {
                types,
                addressname,
                street,
                city,
                state,
                country,
                pincode
            });
            res.status(HTTPStatusCode.OK).json(result);
        }catch (err: any) {
            console.error("Error adding address:", err);
            const errorMessage = err?.message || "An unexpected error occurred";
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: errorMessage });
        }
    }
    async deleteUserAddress(req: Request, res: Response): Promise<void> {
        try {
            const { addressId } = req.params;
            console.log("delete",addressId)
            const deleted = await this._deleteaddress.deleteaddressbyId(addressId);
    
            if (!deleted) {
                res.status(HTTPStatusCode.NOT_FOUND).json({ message: userMessage.ADDRESS_NOT_FOUND });
                return;
            }
    
            res.status(HTTPStatusCode.OK).json({ message: userMessage.ADDRESS_DELETED });
        } catch (err: any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
        }
    }
    async getUserAddresses(req: Request, res: Response): Promise<void> {
            try {
                const { userId } = req.params;
                
                const addresses = await this._getaddressbyid.getaddressbyId(userId);
    
                res.status(HTTPStatusCode.OK).json({ addresses });
            } catch (err: any) {
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
            }
        }
}