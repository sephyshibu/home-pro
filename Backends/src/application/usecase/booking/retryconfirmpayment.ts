import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { walletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { ITransaction } from "../../../domain/models/Transactions";
export class RetryConfirmPayment{
    constructor(private _bookingrepository:BookingRepository,
                private _walletrepository:walletRepository,
                private _transactionrepository: TransactionRepository

    ){}

    async retryconfirmPayment(bookingdata: Partial<IBooking>, paymentId: string, status: 'completed' | 'failed'): Promise<{success:boolean; booking:IBooking}> {
        if (!bookingdata.userId || !bookingdata.id) {
            throw new Error("Missing required fields");
          }
          console.log("usecase")
          console.log(bookingdata)
          
          let booking = await this._bookingrepository.findById(bookingdata.id?.toString()!); // Add bookingId in body

          if (!booking) {
            throw new Error("Booking not found for retry");
          }
          
          // If payment is successful
          if (status === "completed") {
            booking.consultationpayStatus = "completed";
            booking.razorpayPaymentId = paymentId;
            booking.consultationtransactionId = paymentId;

            const wallet=await this._walletrepository.findById(booking.userId.toString())
            
            if (!wallet) {
                throw new Error("Wallet not found");
            }
            console.log("wallet",wallet)
        try {
              const res=await this._transactionrepository.create({
              ownerId: booking.userId.toString(),
              userType:wallet.userType,
              type: "DEBIT",
              amount: booking.consultationFee,
              referenceId: booking.id!.toString(),
              method: "RazorPay",
              status: "success",
              purpose: "Consultation Payment",
            });
            console.log("res", res)
            console.log("✅ Transaction created successfully");
          } catch (err) {
            console.error("❌ Transaction creation failed:", err);
          }

          
          } else {
            booking.consultationpayStatus = "failed";
          }
          
          booking = await this._bookingrepository.update(booking.id!, { consultationpayStatus: booking.consultationpayStatus, razorpayPaymentId: paymentId ,rateperhour:booking.rateperhour});
          
          return { success: true, booking };
}
}