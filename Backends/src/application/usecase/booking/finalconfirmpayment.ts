import { IBooking } from "../../../domain/models/Bookings";
import { IBookingRepository } from "../../../domain/repository/Bookingrepository";
import { IwalletRepository } from "../../../domain/repository/Walletrepository";
import { ITransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { calculateTotalWorkMinutes } from "../../../utils/CalculateMinutes";
import { ITechRepository } from "../../../domain/repository/Techrepository";
export class FinalPaymentconfirm{
   constructor(private _bookingrepository:IBookingRepository, private _walletrepository:IwalletRepository,  private _transactionrepository:ITransactionRepository, private _techrepository:ITechRepository){}


   async makefinalpaymentconfirm(bookingId:string,paymentId:string, status:"completed"): Promise<{success:boolean; booking:IBooking}>{
    const booking=await this._bookingrepository.findById(bookingId)
    if(!booking) throw new Error("no booking founded")

    

    let totalMinutes=calculateTotalWorkMinutes(booking.workTime)
    const ratePerMinute = booking.rateperhour!/60;
    const workFinalAmount = Math.ceil(ratePerMinute * totalMinutes);
    const totalFinalAmount = workFinalAmount + booking.consultationFee;

    const adminCommission = Math.ceil(totalFinalAmount * 0.05);
    const technicianCommission = totalFinalAmount - adminCommission;
    await this._techrepository.increasenoofworks(booking.technicianId.toString())
    const result=await this._bookingrepository.update(bookingId,{
        workFinalAmount:workFinalAmount,
        totalFinalAmount:totalFinalAmount,
        admincommision:adminCommission,
        techcommision:technicianCommission,
        finalpaymethod:"RazorPay",
        finalpayStatus:status,
        razorpayFinalPaymentId:paymentId,
        finalpaymenttransactionId:paymentId
    })
    const wallet=await this._walletrepository.findById(booking.userId.toString())
    console.log("user walalet", wallet)
    if(!wallet) throw new Error("no wallet founded")

    try {
        const res=await this._transactionrepository.create({
            ownerId:booking.userId.toString(),
            userType:wallet.userType,
            type:"DEBIT",
            amount:workFinalAmount,
            referenceId:booking.id!.toString(),
            method:"RazorPay",
            status:"success",
            purpose:"Final Payment",
            admincommission:adminCommission,
            techniciancommision:technicianCommission

        })
        console.log("result transaction", res)
        console.log("Transaction created successfully");
       
      } catch (err) {
        console.error("Transaction creation failed:", err);
      }

      return { success: true, booking };





   }
}