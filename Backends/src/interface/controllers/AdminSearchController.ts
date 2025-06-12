import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { AdminMessages } from "../../domain/shared/Adminmessage/adminmessage";
import { Searchinguser } from "../../application/usecase/Admin/SearchUser/searchUser";
import { Searchingtech } from "../../application/usecase/Admin/SearchTech/searchtech";
import { Searchingcategory } from "../../application/usecase/Admin/SearchCategory/searchcategory";
import { SearchTransaction } from "../../application/usecase/Admin/SearchBookings/searchbookings";



export class AdminSearchController{
    constructor(
              private _searchuser:Searchinguser,
                private _searchtech:Searchingtech,
                private _searchcategory:Searchingcategory,
                private _searchbooking:SearchTransaction,
    ){}

    async searchingUsers(req:Request,res:Response):Promise<void>{
        try {
            const{searchterm}=req.params
            const user=await this._searchuser.searchinguser(searchterm)
            res.status(HTTPStatusCode.OK).json({user})
        } catch (error:any) {
                console.error("Error in fetch user by search:", error);
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: AdminMessages.SERVER.ERROR, error: error.message });
            }
    }
    async searchingTech(req:Request,res:Response):Promise<void>{
        try {
            const{searchterm}=req.params
            const tech=await this._searchtech.searchingtech(searchterm)
            res.status(HTTPStatusCode.OK).json({tech})
        } catch (error:any) {
                console.error("Error in fetch tech by search:", error);
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: AdminMessages.SERVER.ERROR, error: error.message });
            }
    }
    async searchingCategory(req:Request,res:Response):Promise<void>{
        try {
            const{searchterm}=req.params
            const cat=await this._searchcategory.searchingcategory(searchterm)
            res.status(HTTPStatusCode.OK).json({cat})
        } catch (error:any) {
                console.error("Error in fetch tech by search:", error);
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: AdminMessages.SERVER.ERROR, error: error.message });
            }
    }

    async searchbookingtransaction(req:Request,res:Response):Promise<void>{
        try {
            const {searchterm}=req.params
            const transaction=await this._searchbooking.SearchTransactionbybookingId(searchterm)
            res.status(HTTPStatusCode.OK).json({transaction})
        }catch (error:any) {
                console.error("Error in fetch tech by search:", error);
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: AdminMessages.SERVER.ERROR, error: error.message });
            }
    }


}