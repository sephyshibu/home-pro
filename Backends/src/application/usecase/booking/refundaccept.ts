import { IBookingRepository } from "../../../domain/repository/Bookingrepository";
import { IwalletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionModel } from "../../../infrastructure/db/schemas/TransactionMode";
import { WalletModel } from "../../../infrastructure/db/schemas/Walletmodel";

export class Refudaccept{
    constructor(private _bookingrepository:IBookingRepository,private _walletrepository:IwalletRepository){}
  
                
    async processrefund(bookingId:string){
        const booking=await this._bookingrepository.findById(bookingId)

        if(!booking) throw new Error("no bookkking found")

        if(booking.consultationpayStatus!=="completed") throw new Error("Refund not applicable")
        
        const refundamount=booking.consultationFee

        const userwallet=await this._walletrepository.findById(booking.userId.toString())

        if(!userwallet) throw new Error("user wallet not found")

     
        await this._walletrepository.increasebalance(booking.userId.toString(), refundamount)

        await TransactionModel.create({
            ownerId: userwallet.ownerId,
            userType: 'user',
            referenceId: booking.id,
            type: 'CREDIT',
            method: booking.consultationpaymethod || 'RazorPay',
            status: 'success',
            purpose: 'Refund for booking cancellation',
            amount: refundamount,
          });
          await this._bookingrepository.update(bookingId, { refundrequestAccept: true });
        
          return "Refund successfully processed to user's wallet";
        }
    }