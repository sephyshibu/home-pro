import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { AdminMessages } from "../../domain/shared/Adminmessage/adminmessage";
import {Login} from '../../application/usecase/Admin/LoginAdmin'
import { RefreshToken } from "../../application/usecase/Admin/RefreshToken";
import { fetchUser } from "../../application/usecase/Admin/FetchUser";
import { BlockUnblock } from "../../application/usecase/Admin/BlockUnblock";
import { Signuptech } from "../../application/usecase/Tech/Register";
import { fetchtech } from "../../application/usecase/Admin/FetchTech";
import { BlockUnBlock } from "../../application/usecase/Admin/BlockUnblockTech";
import { AddCategory } from "../../application/usecase/Category/AddCategory";
import { fetchCategory } from "../../application/usecase/Admin/Fetchcategory";
import { BlockUnBlockCat } from "../../application/usecase/Admin/BlockUnBlockCategory";
import { EditCategory } from "../../application/usecase/Category/Editcategory";
import { GetCategoryById } from "../../application/usecase/Category/GetCategory";


import { Gettransactions } from "../../application/usecase/Transactions/GetTransaction";
import { GetTransactionWithBookings } from "../../application/usecase/Transactions/TransactionBookingdetails";
import { FetchrefundRequest } from "../../application/usecase/booking/fetchrefundbookings";
import { Refudaccept } from "../../application/usecase/booking/refundaccept";
import { Searchinguser } from "../../application/usecase/Admin/SearchUser/searchUser";
import { Searchingtech } from "../../application/usecase/Admin/SearchTech/searchtech";
import { Searchingcategory } from "../../application/usecase/Admin/SearchCategory/searchcategory";
import { SearchTransaction } from "../../application/usecase/Admin/SearchBookings/searchbookings";
import { GetAdminDashboard } from "../../application/usecase/Admin/Dashboard";


export class AdminController{
    constructor(
       
        private _fetchalluser:fetchUser,
        private _blockunblock:BlockUnblock,
        private _fetchalltech:fetchtech,
        private _blockunblocktech:BlockUnBlock,
        private _signuptechs:Signuptech,
        private _addcategory:AddCategory,
        private _fetchallCategory:fetchCategory,
        private _BlockUnblockCat:BlockUnBlockCat,
        private _editcat:EditCategory,
        private _getCategoryById:GetCategoryById,

 
        
  
        private _admindashboard:GetAdminDashboard
    ){}


    

    async fetchuser(req:Request,res:Response):Promise<void>{
        try {
            const sortBy=req.query.sortBy as string|'name'
            const order=req.query.order as 'asc'|'desc'||'asc'
            const page = parseInt(req.query.page as string) || 1;
            const { users, total } =await this._fetchalluser.fetch(sortBy,order,page)
            res.status(HTTPStatusCode.OK).json({users,total})
        }catch (error: any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
          }
    }

    async fetchtech(req:Request,res:Response):Promise<void>{
        try {
            const sortBy=req.query.sortBy as string|'name'
            const order=req.query.order as 'asc'|'desc'||'asc'
            const page=parseInt(req.query.page as string)|| 1;
            const {tech,total}=await this._fetchalltech.fetch(sortBy,order,page)
            res.status(HTTPStatusCode.OK).json({tech,total})
        } catch (error:any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    async fetchCategory(req:Request,res:Response):Promise<void>{
        try {
            const sortBy=req.query.sortBy as string|'name'
            const order=req.query.order as 'asc'|'desc'||'asc'
       
            const cat=await this._fetchallCategory.fetch(sortBy,order)
            res.status(HTTPStatusCode.OK).json({cat})
        } catch (error:any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
    

    

    
    async blockUnblock(req:Request, res:Response):Promise<void>{
        try {
            const{userid}=req.params
            const{isBlocked}=req.body
            console.log(userid,isBlocked)
            const updateduser=await this._blockunblock.blockunblock(userid,isBlocked)
            res.status(HTTPStatusCode.OK).json({message:AdminMessages.USER.UPDATED,user:updateduser})
        }  catch (error: any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: error.message });
        }
    }

    async blockunblockcatagory(req:Request,res:Response):Promise<void>{
        try {
            const {catid}=req.params
            const{isBlocked}=req.body
            console.log("catid", catid,isBlocked)
            const updatecategory=await this._BlockUnblockCat.blockunblockcat(catid, isBlocked)
            res.status(HTTPStatusCode.OK).json({message:AdminMessages.CATEGORY.UPDATED,cat:updatecategory})
        }  catch (error: any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: error.message });
        }
    }

    async blockunblocktechs(req:Request,res:Response):Promise<void>{
        try {
            const {techid}=req.params
            const{isBlocked}=req.body
            console.log("techid", techid,isBlocked)
            const updatetech=await this._blockunblocktech.blockunblocktech(techid, isBlocked)
            res.status(HTTPStatusCode.OK).json({message:AdminMessages.TECH.UPDATED,tech:updatetech})
        }  catch (error: any) {
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: error.message });
        }
    }
   
    async signuptech(req:Request,res:Response):Promise<void>{
            console.log("signup tech")
    
            try {
                const{email,password, phone}=req.body
                const result=await this._signuptechs.addtech(email,password,phone)
                res.status(HTTPStatusCode.OK).json(result)
            } 
            catch (err:any) {
                console.error("Signup Tech Error:", err.message);
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
              }
        }

    async addcategorys(req:Request,res:Response):Promise<void>{
        try {
            const{name, description, image}=req.body
            const result=await this._addcategory.addCategory(name,description, image)
            res.status(HTTPStatusCode.OK).json(result)
            } 
            catch (err:any) {
                console.error("Signup Tech Error:", err.message);
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
              }
    }

    async fetchCategoryById(req: Request, res: Response) {
        try {
          const { catid } = req.params;
          const category = await this._getCategoryById.getcategorybyId(catid);
          res.status(HTTPStatusCode.OK).json({ category });
        } catch (err: any) {
          res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
        }
      }

    async editcategory(req:Request,res:Response):Promise<void>{
        try {
            const{catid}=req.params
            const{ name, description, image}=req.body
            const result=await this._editcat.editCategory(catid, { name, description, image })
            res.status(HTTPStatusCode.OK).json({ message: AdminMessages.CATEGORY.UPDATED, category: result })
        } catch (error:any) {
            const statuscode=error.statusCode||HTTPStatusCode.INTERNAL_SERVER_ERROR
            res.status(statuscode).json({ message: error.message||"Something went wrong" });
        }
    }

    
    

    
    async getDashboard(req:Request,res:Response):Promise<void>{
        console.log("admin controller")
        try {
            const{fromDate,toDate,filter}=req.query
            if(fromDate&& toDate){
                const from=new Date(fromDate as string)
                const to=new Date(toDate as string)

                if(from>to){
                     res.status(HTTPStatusCode.BAD_REQUEST).json({message:"Invalid date"})
                     return
                }
            }

            const result=await this._admindashboard.execute({fromDate:fromDate as string,toDate:toDate as string,filter:filter as 'week'|'month'})
            res.status(HTTPStatusCode.OK).json({result})
        }catch (err) {
          console.error("❌ Error dashboard:", err);
          res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: AdminMessages.SERVER.ERROR });
        }
    }
    

 
    
}

    
