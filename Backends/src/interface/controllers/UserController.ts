import {Request,response,Response} from 'express'
import { Signup } from '../../application/usecase/User/Registor'
import { CheckEmail } from '../../application/usecase/User/Checkemail';
import { GoogleLogin } from '../../application/usecase/User/GoogleLogin';
import { LoginUser } from '../../application/usecase/User/LoginUser';
import { RefreshToken } from '../../application/usecase/User/RefreshToken';
import { resnedOTP } from '../../application/usecase/User/ResendOTP';
import { VerifyOTP } from '../../application/usecase/User/VerifyOTP';
import { ForgetpasswordVerifyOTP } from '../../application/usecase/User/ForgetpasswordVerifyOtp';
import { forgetpasswordresnedOTP } from '../../application/usecase/User/ForgetpasswordresendOTP';
import { changepassword } from '../../application/usecase/User/Changepassword';
import { fetchCategory } from '../../application/usecase/Admin/Fetchcategory';
import { GetUserById } from '../../application/usecase/User/MyProfile/UserDetails';
import { EditProfile } from '../../application/usecase/User/MyProfile/EditProfile';
import { FetchTechBasedOnAvailable } from '../../application/usecase/User/Tech/FetchTech';
import { GetCategoryById } from '../../application/usecase/Category/GetCategory';
import { fetchTechwithcategory } from '../../application/usecase/User/Tech/FetchTechById';
import { GetAddressById } from '../../application/usecase/Address/Getaddress';
import { AddAddress } from '../../application/usecase/Address/AddAddress';
import { Editaddress } from '../../application/usecase/Address/EditAddress';
import { DeleteAddressById } from '../../application/usecase/Address/DeleteAddress';
import { CreateBookingUseCase } from '../../application/usecase/User/Bookings/CreateBooking';
import { ConfirmPayment } from '../../application/usecase/booking/confirmPayment';
import { FetchBookingbyUserId } from '../../application/usecase/booking/fetchBookings';
import { PasswordChange } from '../../application/usecase/User/Password/Changepassword';
import { HandleFailedPayment } from '../../application/usecase/booking/handleFailedPayment';
import { RetryConfirmPayment } from '../../application/usecase/booking/retryconfirmpayment';
import { updateusercancelreason } from '../../application/usecase/booking/updateUserCancelreason';
import { GetWallet } from '../../application/usecase/Wallet/fetchWallet';
import { FetchWallet } from '../../application/usecase/User/Wallet/getwallet';
import { WalletPayment } from '../../application/usecase/booking/WalletPayment';
import { FetchSession } from '../../application/usecase/Sessions/fetchsessions';
import { Acceptsession } from '../../application/usecase/Sessions/acceptsession';
import { FinalPayment } from '../../application/usecase/booking/makefinalpaymenty';
import { FinalPaymentconfirm } from '../../application/usecase/booking/finalconfirmpayment';
import { GetTransactionWithBookings } from '../../application/usecase/Transactions/TransactionBookingdetails';
import { FetchReviewByTechId } from '../../application/usecase/Review/fetchReview';
import { AddReview } from '../../application/usecase/Review/addreview';


export class UserController{
    constructor(
        private _signupuser:Signup,
        private _checkemailuser:CheckEmail,
        private _loginuser:LoginUser,
        private _refreshtoken:RefreshToken,
        private _verifyotp:VerifyOTP,
        private _resendOTP:resnedOTP,
        private _googleLogin:GoogleLogin,
        private _forgetpasswordverifyOTP:ForgetpasswordVerifyOTP,
        private _forgtepasswordresendOtp:forgetpasswordresnedOTP,
        private _changePassword:changepassword,
        private _fetchcat:fetchCategory,
        private _getuserById:GetUserById,
        private _editprofile:EditProfile,
        private _fetchtechonavailable:FetchTechBasedOnAvailable,
        private _getcatbyId:GetCategoryById,
        private _fetchtechwithcategory:fetchTechwithcategory,
        private _addaddress: AddAddress,
        private _editaddress: Editaddress,
        private _getaddressbyid: GetAddressById,
        private _deleteaddress: DeleteAddressById,
        private _createBookingusecase:CreateBookingUseCase,
        private _confirmpayment:ConfirmPayment,
        private _fetchbookByUserid:FetchBookingbyUserId,
        private _passwordchnaging:PasswordChange,
        private _failpayment:HandleFailedPayment,
        private _retrypaymet:RetryConfirmPayment,
        private _updateusercancelreasons:updateusercancelreason,
        private _fetchwalletdetails:GetWallet,
        private _getwalletbalance:FetchWallet,
        private _walletpayconsultationFee:WalletPayment,
        private _fetchsession: FetchSession,
        private _acceptsessionrequest:Acceptsession,
        private _finalamount:FinalPayment,
        private _confirmfinalpayment:FinalPaymentconfirm,
        private _getTransactionwithbookings:GetTransactionWithBookings,
        private _fetchreviewbytech:FetchReviewByTechId,
        private _addreview:AddReview
     
    
    ){}

    async signup(req:Request, res:Response):Promise<void>{
        console.log('signup')
        try{
            const{name, email, password,phone}=req.body;
          
            const result=await this._signupuser.adduser(name,email,password,phone);
            res.status(201).json(result)
        }
        catch (err:any) {
            res.status(400).json({ message: err.message });
          }
    }

    async checkEmail(req:Request, res:Response):Promise<void>{
        try {
            const {email}=req.body
            const result=await this._checkemailuser.execute(email)
            res.status(200).json(result)
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req:Request,res:Response):Promise<void>{
        try {
          
            const{email,password}=req.body
            console.log(req.body)
            const result=await this._loginuser.login(email, password)
            res.cookie("refreshtokenuser", result.refreshtoken,{
                httpOnly:true,
                secure:false,
                maxAge:7*24*60*60*1000,
            })
            res.status(200).json({message:"Login Success", user:result.user,token:result.accesstoken})

        }catch (err: any) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
    }




    async verifyotpcontroller(req:Request, res:Response):Promise<void>{
            try {
                const{otp, details}=req.body;
                console.log(otp,details)
                const result=await this._verifyotp.verify(otp,details)
                res.status(200).json({message:result})
            } catch (err: any) {
                res.status(400).json({ message: err.message });
              }
    }

    async forgetpasswordVerifyOTP(req:Request, res:Response):Promise<void>{
        try {
            const {otp,details}=req.body
            console.log(otp,details)
            const result=await this._forgetpasswordverifyOTP.verify(otp,details)
            res.status(200).json({message:result})
            } catch (err: any) {
                res.status(400).json({ message: err.message });
              }

        
    }

    async changepassword(req:Request,res:Response):Promise<void>{
        try {
            const{password,email}=req.body
            console.log(password,email)
            const result=await this._changePassword.changepass(password,email)
            res.status(200).json({message:result})
        } catch (err: any) {
            res.status(400).json({ message: err.message });
          }
    }

    async forgetpasswordresnedOTP(req:Request, res:Response):Promise<void>{
        try {
            const {details}=req.body
            const result=await this._forgtepasswordresendOtp.resend(details)
            res.status(200).json({ message: result });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }

      
    }


    async resendotpcontroller(req:Request,res:Response):Promise<void>{
        try {
            const{details}=req.body
            const result=await this._resendOTP.resend(details)
            res.status(200).json({ message: result });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
    }

    async googleLoginController(req:Request, res:Response):Promise<void>{
        try {
            console.log("google")
            const{email, sub, name}=req.body
            const result=await this._googleLogin.GoogleLogin(email, sub, name);
            res.status(200).json({ message: "Google Login Successful", user: result.user, token: result.token });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
            }
    }

    async refreshtokenController(req:Request, res:Response):Promise<void>{
        try {
            const token=req.cookies?.refreshtokenuser;
            console.log("refreshtokencontroller",token)
            const newaccesstoken=await this._refreshtoken.refresh(token);
            console.log("in refresh token controller with new access tokern ",newaccesstoken)
            res.status(200).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
    }

    async fetchCategory(req:Request,res:Response):Promise<void>{
        try {
            const category=await this._fetchcat.fetch()
            res.status(200).json({category})
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }


    async fetchUserById(req:Request,res:Response){
        try {
            const {userId}=req.params
            console.log("usder Id", userId)
            const user=await this._getuserById.getuserById(userId)
            res.status(200).json({user})
        } catch (err: any) {
            res.status(400).json({ message: err.message });
          }
    }

    async edituser(req:Request,res:Response){
        try {
            const{userId}=req.params
            const{name, email, phone}=req.body
            const result=await this._editprofile.editprofile(userId,{name,email, phone})
            res.status(200).json({message:"user updated",user:result})
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }

    async fetchTechBasedonavailble(req:Request,res:Response):Promise<void>{
        console.log("controller")
        try {
            const{pincode,date,categoryId}=req.query
            console.log(pincode,date,categoryId)
            if(!pincode|| !date ||!categoryId){
                 res.status(400).json({message:"Missing required fields"})
                 return
            }

            const technicians=await this._fetchtechonavailable.fetchTechBasedOnAvailble(pincode as string,date as string,categoryId as string)
            console.log(technicians)
            if (!technicians || technicians.length === 0) {
                 res.status(404).json({ message: "No technicians available" });
                 return
              }
          
               res.status(200).json({ technicians });
        } catch (error: any) {

            if (error.message === "technician not found") {
                res.status(404).json({ message: "No technicians available for the selected slot." });
              }
              else if (error.message==="date is not valid date"){
                res.status(400).json({message:"Date is not valid date"})
              }
              else if(error.message="User ID is required in headers"){
                res.status(400).json({message:"please login in "})
              }
               else {
                res.status(500).json({ message: "Internal server error" });
              }
            console.error("Error fetching technicians:", error);
            res.status(500).json({ message: "Internal server error" });
          }
    }

    async fetchCategoryById(req: Request, res: Response) {
        try {
          const { catid } = req.params;
          const category = await this._getcatbyId.getcategorybyId(catid);
          res.status(200).json({ category });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
        }
      }
    async fetctechwithcat(req:Request, res:Response){
        try {
            console.log("fetching")
            const{techid}=req.params
            console.log("techid",techid)
            const technian=await this._fetchtechwithcategory.fetchtechwithcategory(techid)
            console.log(technian)
            res.status(200).json({technian})
        } catch (err:any) {
            res.status(400).json({ message: err.message });
        }
    }
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
            res.status(201).json({message:"added Successfully"});
        }catch (err: any) {
            console.error("Error adding address:", err);
            const errorMessage = err?.message || "An unexpected error occurred";
            res.status(400).json({ message: errorMessage });
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
            res.status(200).json(result);
        }catch (err: any) {
            console.error("Error adding address:", err);
            const errorMessage = err?.message || "An unexpected error occurred";
            res.status(400).json({ message: errorMessage });
        }
    }
    async deleteUserAddress(req: Request, res: Response): Promise<void> {
        try {
            const { addressId } = req.params;
            console.log("delete",addressId)
            const deleted = await this._deleteaddress.deleteaddressbyId(addressId);
    
            if (!deleted) {
                res.status(404).json({ message: "Address not found or already deleted" });
                return;
            }
    
            res.status(200).json({ message: "Address deleted successfully" });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async getUserAddresses(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            
            const addresses = await this._getaddressbyid.getaddressbyId(userId);

            res.status(200).json({ addresses });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    async createOrder(req: Request, res: Response): Promise<void> {
        console.log("faf")
        try {
          const { amount } = req.body;
          const userId = req.params.userId;
          console.log(amount, userId)
      
          const order = await this._createBookingusecase.execute(amount, userId);
          console.log("Razorpay Order:", JSON.stringify(order, null, 2));

          if (!order || !order.id) {
            throw new Error("Failed to create Razorpay order.");
          }
          res.status(200).json({ id: order.id,
            amount: order.amount,
            currency: order.currency,
         });
        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }
      }
    async confirmpay(req:Request,res:Response):Promise<void>{
        try {
            const {
                userId,
                techid,
                addressId,
                location,
                date,
                amount,
                razorpay_payment_id,
              } = req.body;
              console.log("controller",req.body)
              const result=await this._confirmpayment.confirmPayment(
                {
                userId,
                technicianId: techid,
                addressId,
                location,
                booked_date: date,
                consultationFee: amount,
                consultationpaymethod: "RazorPay",
                pincode: "000000", // if available
                workstatus: "pending",
              } ,
              razorpay_payment_id,
              "completed")
              res.status(200).json(result.booking);
            } catch (error) {
              res.status(500).json({ message: "Payment failed", retry: true });
            }
    }

    async retryconfirmpayment(req: Request, res: Response): Promise<void> {
        try {
          const {
            userId,
            bookingId,
            razorpay_payment_id,
          }: { userId: string; bookingId: string; razorpay_payment_id: string } = req.body;
      
          if (!userId || !bookingId || !razorpay_payment_id) {
            res.status(400).json({ message: "Missing required fields" });
            return;
          }
          const result = await this._retrypaymet.retryconfirmPayment(
            {
              id: bookingId, // include ID explicitly
              userId,
            },
            razorpay_payment_id,
            "completed"
          );
      
          res.status(200).json({ success: true, booking: result.booking });
        } catch (err) {
          console.error("❌ Error confirming payment:", err);
          res.status(500).json({ message: "Internal server error" });
        }
      }
      
    

    async fetchbookingsbyuserId(req:Request,res:Response):Promise<void>{
        try {
            const page = parseInt(req.query.page as string) || 1;
            const{userId}=req.query
            const booking=await this._fetchbookByUserid.fetchBookingdetails(userId as string,page)
  
            res.status(200).json(booking)
        } catch (err: any) {
            res.status(500).json({ message: err.message });
            
        }
    }
    async passwordChanges(req:Request, res:Response):Promise<void>{
        try {
        
            const{userId}=req.params
            const{password,oldpassword}=req.body
            console.log(req.body)
            const result=await this._passwordchnaging.editpassword(userId, oldpassword,password)
            res.status(200).json({message:result.message})
        } catch (err: any) {
             if (err.message === "Old password is incorrect") {
                res.status(404).json({ message: "Old password is incorrect" });
              }
              else{
                    res.status(500).json({ message: err.message });
              }
            
            
        }
    }
    async transactionwithBookings(req:Request,res:Response):Promise<void>{
        try {
            const {transId}=req.params
            const result=await this._getTransactionwithbookings.execute(transId)
            res.status(200).json({result})
        } catch (error:any) {
            res.status(400).json({ message: error.message });
        }
    }
    async Failedpayment(req:Request,res:Response){
        try {
            const {
              userId,
              techid,
              addressId,
              location,
              rateperhour, // ✅ add this
              date,
              amount,
      
            } = req.body;
        
            const booking = await this._failpayment.execute({
              userId,
              technicianId:techid,
              addressId,
              location,
              booked_date:date,
              consultationFee:amount,
              consultationpayStatus: 'failed',
              rateperhour: rateperhour, // ✅ add this
              
            });
        
            res.status(201).json({ success: true, booking });
          } catch (error) {
            console.error("Failed to log payment failure:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
          }

    }
    async updatecancelreason(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const{userremark}=req.body
          
            console.log("userremat=rk",userremark)
            const result=await this._updateusercancelreasons.updateusercanel(bookingId,userremark)
            res.status(200).json({message:"Update Cancel reason",updatebooker:result.updatebooker})
        } catch (error) {
            console.error("Error updating cancel reason", error);
            res.status(500).json({ message: "Internal server error" });
        }

    }

    async fetchbalance(req:Request,res:Response):Promise<void>{
        try {
            const{userId}=req.params
          
          
           
            const result=await this._getwalletbalance.fetchwalletbalance(userId)
            res.status(200).json({message:"Balance",balance:result.balance})
        } catch (error) {
            console.error("Error in fetching balance", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async fetchdetailswallet(req:Request,res:Response):Promise<void>{
        try {
            console.log("enterin")
            const{userId}=req.params
            console.log(userId)
            const walletdetail=await this._fetchwalletdetails.fetchwalletdetails(userId)
            res.status(200).json({walletdetail})
        } catch (error) {
            console.error("Error fetching wallet", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async walletpaymentconsultationFee(req:Request,res:Response):Promise<void>{
        console.log("entered")
        try {
            const {
                userId,
                techid,
                addressId,
                location,
                rateperhour, // ✅ add this
                date,
                amount,
        
              } = req.body;
              console.log("controller",req.body)
              const result=await this._walletpayconsultationFee.WalletConsultationPayment(
                {
                userId,
                technicianId: techid,
                addressId,
                location,
                rateperhour,
                booked_date: date,
                consultationFee: amount,
                consultationpaymethod: "Wallet",
                pincode: "000000", // if available
                workstatus: "pending",
              } ,
            
              "completed")
              res.status(200).json({message:"success",result});
            } catch (error:any) {
                if (error.message === "wallet not found") {
                    res.status(404).json({ message: "No wallet available for the selected slot." });
                  }
                if(error.message==="insufficeint Balance"){
                    res.status(400).json({message:"insufficeint Balance"})

                }
                else {
                    res.status(500).json({ message: "Internal server error" });
                  }

             
            }
    }

    async fetchsessionpending(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const response=await this._fetchsession.fetchpendingsession(bookingId)
            res.status(200).json(response)
        }  catch (error) {
            console.error("Error fetching pending session", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async acceptsession(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const{requestId,status}=req.body
            const response=await this._acceptsessionrequest.acceptsession(bookingId,requestId,status)
            res.status(200).json(response)
        }  catch (error) {
            console.error("Error accepting session", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async finalamountbeforeconfirm(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const result=await this._finalamount.finalpayment(bookingId)
            res.status(200).json(result)
        } catch (error) {
            console.error("Error accepting session", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async finalpaymentconfirm(req:Request,res:Response):Promise<void>{

        try {
            const {
         
                bookingId,
                razorpay_payment_id,
              }: { bookingId: string; razorpay_payment_id: string } = req.body;
              console.log("req body", req.body)
              if ( !bookingId || !razorpay_payment_id) {
                res.status(400).json({ message: "Missing required fields" });
                return;
              }
              const result=await this._confirmfinalpayment.makefinalpaymentconfirm(bookingId,razorpay_payment_id,"completed")
              res.status(200).json({ success: true, booking: result.booking });
            } catch (err) {
              console.error("❌ Error confirming payment:", err);
              res.status(500).json({ message: "Internal server error" });
            }
        }

    async fetchreviewbytechIdfromUser(req:Request,res:Response):Promise<void>{
        try {
            const {techId}=req.params
            console.log("controller in user review techId", techId)
            if(!techId){
                res.status(400).json({message:"tech Id is missing"})
                return
            }

            const result=await this._fetchreviewbytech.fetchreviewtechId(techId)
            res.status(200).json({reviews:result})

        } catch (err) {
              console.error("❌ Error in fetching review:", err);
              res.status(500).json({ message: "Internal server error" });
            }
    }

    async Addingreview(req:Request,res:Response):Promise<void>{
        try {
            const{userId,techId, description, points}=req.body
            console.log("adding review", req.body)
            const response=await this._addreview.addreview(userId,techId,description,points)
            res.status(200).json(response)
        } catch (err) {
              console.error("❌ Error in adding review:", err);
              res.status(500).json({ message: "Internal server error" });
            }
    }

        

     
}