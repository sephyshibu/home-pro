import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { walletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { ITransaction } from "../../../domain/models/Transactions";
export class ConfirmPayment{
    constructor(private bookingrepository:BookingRepository,
                private walletrepository:walletRepository,
                private tarnsactionrepository:TransactionRepository
    ){}

    async confirmPayment(bookingdata: Omit<IBooking, "id">, paymentId: string, status: 'completed' | 'failed'): Promise<{success:boolean; booking:IBooking}> {

        let booking = await this.bookingrepository.create({
            ...bookingdata,
            razorpayPaymentId:paymentId,
            consultationpaymentStatus:status
        })
        if (status === "completed") {
            // No commission calculation here for now. You can add it when the final payment is processed.
            booking.consultationpaymentStatus = "completed"; // mark consultation payment as completed
      
            // Store the transaction for the user to track the consultation payment
            await this.tarnsactionrepository.create({
              ownerId: booking.userId, // assuming userId is the one making the consultation payment
              type: "DEBIT",
              amount: booking.consultationFee,
              referenceId: booking.id!, // booking id
              method: "RazorPay",
              status: "success",
              purpose: "Consultation Payment",
            } as ITransaction);
          } else {
            booking.consultationpaymentStatus = "failed"; // If payment fails, mark it as failed
          }
          booking = await this.bookingrepository.update(booking.id!, { consultationpaymentStatus: booking.consultationpaymentStatus });

          return { success: true, booking };

        }
}