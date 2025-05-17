import { Request,Response } from "express";
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

export class AdminController{
    constructor(
        private loginadmin:Login,
        private refreshtoken:RefreshToken,
        private fetchalluser:fetchUser,
        private blockunblock:BlockUnblock,
        private fetchalltech:fetchtech,
        private blockunblocktech:BlockUnBlock,
        private signuptechs:Signuptech,
        private addcategory:AddCategory,
        private fetchallCategory:fetchCategory,
        private BlockUnblockCat:BlockUnBlockCat,
        private editcat:EditCategory,
        private getCategoryById:GetCategoryById,
        private gettransactiondetails:Gettransactions,
        private gettransactionwithBookings:GetTransactionWithBookings,
        private fetchrefundrequest:FetchrefundRequest,
        private refundaccept:Refudaccept,
        private searchuser:Searchinguser,
        private searchtech:Searchingtech,
        private searchcategory:Searchingcategory
    ){}


    async login(req:Request, res:Response):Promise<void>{
        console.log("admion Login in Controller")

        try {
            const{email, password}=req.body
            const result=await this.loginadmin.loginadmin(email,password);
            res.cookie("refreshtokenadmin", result.refreshtoken,{
                httpOnly:true,
                secure:false,
                maxAge:7*24*60*60*1000,
            })
            res.status(200).json({message:"Login Success", admin:result.admin,token:result.accesstoken})
        }
        catch (err:any) {
            res.status(400).json({ message: err.message });
          }
    }

    async fetchuser(req:Request,res:Response):Promise<void>{
        try {
            const user=await this.fetchalluser.fetch()
            res.status(200).json({user})
        }catch (error: any) {
            res.status(500).json({ message: error.message });
          }
    }

    async fetchtech(req:Request,res:Response):Promise<void>{
        try {
            const tech=await this.fetchalltech.fetch()
            res.status(200).json({tech})
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    async fetchCategory(req:Request,res:Response):Promise<void>{
        try {
            const cat=await this.fetchallCategory.fetch()
            res.status(200).json({cat})
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    async fetchTransaction(req:Request,res:Response):Promise<void>{
        console.log("fetch transaction")
        try {
            const transaction=await this.gettransactiondetails.gettransaction()
            console.log("controller transaction",transaction)
            res.status(200).json({transaction}) 
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    

    async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.refreshtokenadmin;
            const newaccesstoken=await this.refreshtoken.refresh(token);
            res.status(200).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
    }

    async blockUnblock(req:Request, res:Response):Promise<void>{
        try {
            const{userid}=req.params
            const{isBlocked}=req.body
            console.log(userid,isBlocked)
            const updateduser=await this.blockunblock.blockunblock(userid,isBlocked)
            res.status(200).json({message:"User Updated Successfully",user:updateduser})
        }  catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async blockunblockcatagory(req:Request,res:Response):Promise<void>{
        try {
            const {catid}=req.params
            const{isBlocked}=req.body
            console.log("catid", catid,isBlocked)
            const updatecategory=await this.BlockUnblockCat.blockunblockcat(catid, isBlocked)
            res.status(200).json({message:"category Updated Successfully",cat:updatecategory})
        }  catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async blockunblocktechs(req:Request,res:Response):Promise<void>{
        try {
            const {techid}=req.params
            const{isBlocked}=req.body
            console.log("techid", techid,isBlocked)
            const updatetech=await this.blockunblocktech.blockunblocktech(techid, isBlocked)
            res.status(200).json({message:"tech Updated Successfully",tech:updatetech})
        }  catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
   
    async signuptech(req:Request,res:Response):Promise<void>{
            console.log("signup tech")
    
            try {
                const{email,password, phone}=req.body
                const result=await this.signuptechs.addtech(email,password,phone)
                res.status(200).json(result)
            } 
            catch (err:any) {
                console.error("Signup Tech Error:", err.message);
                res.status(400).json({ message: err.message });
              }
        }

    async addcategorys(req:Request,res:Response):Promise<void>{
        try {
            const{name, description, image}=req.body
            const result=await this.addcategory.addCategory(name,description, image)
            res.status(200).json(result)
            } 
            catch (err:any) {
                console.error("Signup Tech Error:", err.message);
                res.status(400).json({ message: err.message });
              }
    }

    async fetchCategoryById(req: Request, res: Response) {
        try {
          const { catid } = req.params;
          const category = await this.getCategoryById.getcategorybyId(catid);
          res.status(200).json({ category });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
      }

    async editcategory(req:Request,res:Response):Promise<void>{
        try {
            const{catid}=req.params
            const{ name, description, image}=req.body
            const result=await this.editcat.editCategory(catid, { name, description, image })
            res.status(200).json({ message: "Category updated", category: result })
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }

    async transactionwithBookings(req:Request,res:Response):Promise<void>{
        try {
            const {transId}=req.params
            const result=await this.gettransactionwithBookings.execute(transId)
            res.status(200).json({result})
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }
    async fetchingrequestrefund(req:Request,res:Response):Promise<void>{
        try {
            const result=await this.fetchrefundrequest.fetchrefundreq()
            console.log("controller", result)
            res.status(200).json({message:"success", Bookings:result})
        } catch (error:any) {
            console.error("Error in fetchingrequestrefund:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    async acceptingrefund(req:Request,res:Response):Promise<void>{
            try {
                const{bookingId}=req.params
                const result =await this.refundaccept.processrefund(bookingId)
                res.status(200).json({message:"refunded accepted"})
                
            } catch (error:any) {
                console.error("Error in refund accepted:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            }
    }

    async searchingUsers(req:Request,res:Response):Promise<void>{
        try {
            const{searchterm}=req.params
            const user=await this.searchuser.searchinguser(searchterm)
            res.status(200).json({user})
        } catch (error:any) {
                console.error("Error in fetch user by search:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            }
    }
    async searchingTech(req:Request,res:Response):Promise<void>{
        try {
            const{searchterm}=req.params
            const tech=await this.searchtech.searchingtech(searchterm)
            res.status(200).json({tech})
        } catch (error:any) {
                console.error("Error in fetch tech by search:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            }
    }
    async searchingCategory(req:Request,res:Response):Promise<void>{
        try {
            const{searchterm}=req.params
            const cat=await this.searchcategory.searchingcategory(searchterm)
            res.status(200).json({cat})
        } catch (error:any) {
                console.error("Error in fetch tech by search:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            }
    }
    

 
    
}

    
