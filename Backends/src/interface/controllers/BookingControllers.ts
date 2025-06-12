import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";
import { userMessage } from "../../domain/shared/Usermessage/usermessage";
import { CreateBookingUseCase } from '../../application/usecase/User/Bookings/CreateBooking';
import { ConfirmPayment } from '../../application/usecase/booking/confirmPayment';
import { FetchBookingbyUserId } from '../../application/usecase/booking/fetchBookings';
import { HandleFailedPayment } from '../../application/usecase/booking/handleFailedPayment';
import { RetryConfirmPayment } from '../../application/usecase/booking/retryconfirmpayment';
import { updateusercancelreason } from '../../application/usecase/booking/updateUserCancelreason';
import { WalletPayment } from '../../application/usecase/booking/WalletPayment';
import { FetchSession } from '../../application/usecase/Sessions/fetchsessions';
import { Acceptsession } from '../../application/usecase/Sessions/acceptsession';
import { FinalPayment } from '../../application/usecase/booking/makefinalpaymenty';
import { FinalPaymentconfirm } from '../../application/usecase/booking/finalconfirmpayment';
import { CheckPaymentStatus } from '../../application/usecase/booking/paystatus';


export class BookingController{
    constructor(
        private _createBookingusecase:CreateBookingUseCase,
        private _confirmpayment:ConfirmPayment,
        private _fetchbookByUserid:FetchBookingbyUserId,
        private _failpayment:HandleFailedPayment,
        private _retrypaymet:RetryConfirmPayment,
        private _updateusercancelreasons:updateusercancelreason,
        private _walletpayconsultationFee:WalletPayment,
        private _fetchsession: FetchSession,
        private _acceptsessionrequest:Acceptsession,
        private _finalamount:FinalPayment,
        private _confirmfinalpayment:FinalPaymentconfirm,
        private _checkpay:CheckPaymentStatus

    ){}

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
          res.status(HTTPStatusCode.OK).json({ id: order.id,
            amount: order.amount,
            currency: order.currency,
         });
        } catch (err: any) {
          res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
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
              res.status(HTTPStatusCode.OK).json(result.booking);
              return
            } catch (error: any) {
                if (error.message === userMessage.PAYMENT_ALREADY_COMPLETED) {
                 res.status(HTTPStatusCode.BAD_REQUEST).json({ message: error.message });
                 return
                }

                if (error.message === userMessage.PAYMENT_ALREADY_IN_PROGRESS) {
                 res.status(409).json({ message: error.message });
                 return
                }

                console.error("Unexpected payment error:", error);
                res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.PAYMENT_FAILED_RETRY, retry: true });
                return
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
            res.status(HTTPStatusCode.BAD_REQUEST).json({ message: userMessage.MISSING_FIELDS });
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
      
          res.status(HTTPStatusCode.OK).json({ success: true, booking: result.booking });
        } catch (err) {
          console.error("❌ Error confirming payment:", err);
          res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
        }
      }
      
    

    async fetchbookingsbyuserId(req:Request,res:Response):Promise<void>{
        try {
            const page = parseInt(req.query.page as string) || 1;
            const{userId}=req.query
            const booking=await this._fetchbookByUserid.fetchBookingdetails(userId as string,page)
  
            res.status(HTTPStatusCode.OK).json(booking)
        } catch (err: any) {
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
            
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
        
            res.status(HTTPStatusCode.CREATED).json({ success: true, booking });
          } catch (error) {
            console.error("Failed to log payment failure:", error);
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message:userMessage.INTERNAL_ERROR });
          }

    }
    async updatecancelreason(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const{userremark}=req.body
          
            console.log("userremat=rk",userremark)
            const result=await this._updateusercancelreasons.updateusercanel(bookingId,userremark)
            res.status(HTTPStatusCode.OK).json({message:userMessage.UPDATE_CANCEL_REASON_SUCCESS,updatebooker:result.updatebooker})
        } catch (error) {
            console.error("Error updating cancel reason", error);
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
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
              res.status(HTTPStatusCode.OK).json({message:userMessage.SUCCESS,result});
            } catch (error:any) {
                if (error.message === "wallet not found") {
                    res.status(HTTPStatusCode.NOT_FOUND).json({ message: userMessage.NO_WALLET_AVAILABLE });
                  }
                if(error.message===userMessage.INSUFFICIENT_BALANCE){
                    res.status(HTTPStatusCode.BAD_REQUEST).json({message:userMessage.INSUFFICIENT_BALANCE})

                }
                else {
                    res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
                  }

             
            }
    }

    async fetchsessionpending(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const response=await this._fetchsession.fetchpendingsession(bookingId)
            res.status(HTTPStatusCode.OK).json(response)
        }  catch (error) {
            console.error("Error fetching pending session", error);
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
        }
    }

    async acceptsession(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const{requestId,status}=req.body
            const response=await this._acceptsessionrequest.acceptsession(bookingId,requestId,status)
            res.status(HTTPStatusCode.OK).json(response)
        }  catch (error) {
            console.error("Error accepting session", error);
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
        }
    }

    async finalamountbeforeconfirm(req:Request,res:Response):Promise<void>{
        try {
            const{bookingId}=req.params
            const result=await this._finalamount.finalpayment(bookingId)
            res.status(HTTPStatusCode.OK).json(result)
        } catch (error) {
            console.error("Error accepting session", error);
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message:userMessage.INTERNAL_ERROR });
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
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message:userMessage.MISSING_FIELDS });
                return;
              }
              const result=await this._confirmfinalpayment.makefinalpaymentconfirm(bookingId,razorpay_payment_id,"completed")
              res.status(HTTPStatusCode.OK).json({ success: true, booking: result.booking });
            } catch (err) {
              console.error("❌ Error confirming payment:", err);
              res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: userMessage.INTERNAL_ERROR });
            }
        }
        async checkPaymentStatus(req: Request, res: Response): Promise<void> {
            try {
            const { userId, techid, date } = req.query;

            if (!userId || !techid || !date) {
                res.status(HTTPStatusCode.BAD_REQUEST).json({ message:userMessage.MISSING_PARAMETERS});
                return;
            }

            const status = await this._checkpay.execute(
                userId.toString(),
                techid.toString(),
                date.toString()
            );

            res.status(HTTPStatusCode.OK).json({ status });
            } catch (error) {
            console.error("Check payment error:", error);
            res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Failed to check payment status" });
            }
        }


}