import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { walletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { calculateTotalWorkMinutes } from "../../../utils/CalculateMinutes";
import { TechRepository } from "../../../domain/repository/Techrepository";
export class FinalPaymentconfirm{
   constructor(private bookingrepository:BookingRepository, private walletrepository:walletRepository,  private transactionrepository:TransactionRepository, private techrepository:TechRepository){}


   async makefinalpaymentconfirm(bookingId:string,paymentId:string, status:"completed"): Promise<{success:boolean; booking:IBooking}>{
    const booking=await this.bookingrepository.findById(bookingId)
    if(!booking) throw new Error("no booking founded")

    let totalMinutes=calculateTotalWorkMinutes(booking.workTime)
    const ratePerMinute = booking.rateperhour!/60;
    const workFinalAmount = Math.ceil(ratePerMinute * totalMinutes);
    const totalFinalAmount = workFinalAmount + booking.consultationFee;

    const adminCommission = Math.ceil(totalFinalAmount * 0.05);
    const technicianCommission = totalFinalAmount - adminCommission;
    await this.techrepository.increasenoofworks(booking.technicianId.toString())
    const result=await this.bookingrepository.update(bookingId,{
        workFinalAmount:workFinalAmount,
        totalFinalAmount:totalFinalAmount,
        admincommision:adminCommission,
        techcommision:technicianCommission,
        finalpaymethod:"RazorPay",
        finalpayStatus:status,
        razorpayFinalPaymentId:paymentId,
        finalpaymenttransactionId:paymentId
    })
    const wallet=await this.walletrepository.findById(booking.userId.toString())
    console.log("user walalet", wallet)
    if(!wallet) throw new Error("no wallet founded")

    try {
        const res=await this.transactionrepository.create({
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