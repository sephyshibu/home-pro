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
import { SearchTransaction } from "../../application/usecase/Admin/SearchBookings/searchbookings";
import { GetAdminDashboard } from "../../application/usecase/Admin/Dashboard";


export class AdminController{
    constructor(
        private _loginadmin:Login,
        private _refreshtoken:RefreshToken,
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
        private _gettransactiondetails:Gettransactions,
        private _gettransactionwithBookings:GetTransactionWithBookings,
        private _fetchrefundrequest:FetchrefundRequest,
        private _refundaccept:Refudaccept,
        private _searchuser:Searchinguser,
        private _searchtech:Searchingtech,
        private _searchcategory:Searchingcategory,
        private _searchbooking:SearchTransaction,
        private _admindashboard:GetAdminDashboard
    ){}


    async login(req:Request, res:Response):Promise<void>{
        console.log("admion Login in Controller")

        try {
            const{email, password}=req.body
            const result=await this._loginadmin.loginadmin(email,password);
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
            const sortBy=req.query.sortBy as string|'name'
            const order=req.query.order as 'asc'|'desc'||'asc'
            const page = parseInt(req.query.page as string) || 1;
            const { users, total } =await this._fetchalluser.fetch(sortBy,order,page)
            res.status(200).json({users,total})
        }catch (error: any) {
            res.status(500).json({ message: error.message });
          }
    }

    async fetchtech(req:Request,res:Response):Promise<void>{
        try {
            const sortBy=req.query.sortBy as string|'name'
            const order=req.query.order as 'asc'|'desc'||'asc'
            const page=parseInt(req.query.page as string)|| 1;
            const {tech,total}=await this._fetchalltech.fetch(sortBy,order,page)
            res.status(200).json({tech,total})
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    async fetchCategory(req:Request,res:Response):Promise<void>{
        try {
            const sortBy=req.query.sortBy as string|'name'
            const order=req.query.order as 'asc'|'desc'||'asc'
       
            const cat=await this._fetchallCategory.fetch(sortBy,order)
            res.status(200).json({cat})
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }
    async fetchTransaction(req:Request,res:Response):Promise<void>{
        console.log("fetch transaction")
        const currentPage=parseInt(req.query.page as string)||1
       
        try {
            const {transactions,totaladmincommision}=await this._gettransactiondetails.gettransaction(currentPage)
            console.log("controller transaction",transactions)
            res.status(200).json({transactions,totaladmincommision}) 
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

    

    async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.refreshtokenadmin;
             console.log("refreshtokencontrolleradmin",token)
            const newaccesstoken=await this._refreshtoken.refresh(token);
             console.log("in refresh token controller admin with new access tokern ",newaccesstoken)
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
            const updateduser=await this._blockunblock.blockunblock(userid,isBlocked)
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
            const updatecategory=await this._BlockUnblockCat.blockunblockcat(catid, isBlocked)
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
            const updatetech=await this._blockunblocktech.blockunblocktech(techid, isBlocked)
            res.status(200).json({message:"tech Updated Successfully",tech:updatetech})
        }  catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
   
    async signuptech(req:Request,res:Response):Promise<void>{
            console.log("signup tech")
    
            try {
                const{email,password, phone}=req.body
                const result=await this._signuptechs.addtech(email,password,phone)
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
            const result=await this._addcategory.addCategory(name,description, image)
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
          const category = await this._getCategoryById.getcategorybyId(catid);
          res.status(200).json({ category });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
      }

    async editcategory(req:Request,res:Response):Promise<void>{
        try {
            const{catid}=req.params
            const{ name, description, image}=req.body
            const result=await this._editcat.editCategory(catid, { name, description, image })
            res.status(200).json({ message: "Category updated", category: result })
        } catch (error:any) {
            const statuscode=error.statusCode||500
            res.status(statuscode).json({ message: error.message||"Something went wrong" });
        }
    }

    async transactionwithBookings(req:Request,res:Response):Promise<void>{
        try {
            const {transId}=req.params
            const result=await this._gettransactionwithBookings.execute(transId)
            res.status(200).json({result})
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }
    async fetchingrequestrefund(req:Request,res:Response):Promise<void>{
        try {
            const result=await this._fetchrefundrequest.fetchrefundreq()
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
                const result =await this._refundaccept.processrefund(bookingId)
                res.status(200).json({message:"refunded accepted"})
                
            } catch (error:any) {
                console.error("Error in refund accepted:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            }
    }

    async searchingUsers(req:Request,res:Response):Promise<void>{
        try {
            const{searchterm}=req.params
            const user=await this._searchuser.searchinguser(searchterm)
            res.status(200).json({user})
        } catch (error:any) {
                console.error("Error in fetch user by search:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            }
    }
    async searchingTech(req:Request,res:Response):Promise<void>{
        try {
            const{searchterm}=req.params
            const tech=await this._searchtech.searchingtech(searchterm)
            res.status(200).json({tech})
        } catch (error:any) {
                console.error("Error in fetch tech by search:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            }
    }
    async searchingCategory(req:Request,res:Response):Promise<void>{
        try {
            const{searchterm}=req.params
            const cat=await this._searchcategory.searchingcategory(searchterm)
            res.status(200).json({cat})
        } catch (error:any) {
                console.error("Error in fetch tech by search:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            }
    }

    async searchbookingtransaction(req:Request,res:Response):Promise<void>{
        try {
            const {searchterm}=req.params
            const transaction=await this._searchbooking.SearchTransactionbybookingId(searchterm)
            res.status(200).json({transaction})
        }catch (error:any) {
                console.error("Error in fetch tech by search:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
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
                     res.status(400).json({message:"Invalid date"})
                     return
                }
            }

            const result=await this._admindashboard.execute({fromDate:fromDate as string,toDate:toDate as string,filter:filter as 'week'|'month'})
            res.status(200).json({result})
        }catch (err) {
          console.error("❌ Error dashboard:", err);
          res.status(500).json({ message: "Internal server error" });
        }
    }
    

 
    
}

    
