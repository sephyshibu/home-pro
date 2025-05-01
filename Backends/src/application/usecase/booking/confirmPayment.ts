import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { walletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { ITransaction } from "../../../domain/models/Transactions";
export class ConfirmPayment{
    constructor(private bookingrepository:BookingRepository,
                private walletrepository:walletRepository,
                private transactionrepository: TransactionRepository

    ){}

    async confirmPayment(bookingdata: Partial<IBooking>, paymentId: string, status: 'completed' | 'failed'): Promise<{success:boolean; booking:IBooking}> {
        if (!bookingdata.userId || !bookingdata.technicianId || !bookingdata.addressId) {
            throw new Error("Missing required fields");
          }
          console.log("usecase")
          console.log(bookingdata)
          
        let booking = await this.bookingrepository.creates({
            userId: bookingdata.userId,
            technicianId: bookingdata.technicianId,
            addressId: bookingdata.addressId,
            location: bookingdata.location!,
            booked_date: bookingdata.booked_date!,
            consultationFee: bookingdata.consultationFee!,
            consultationpaymethod: bookingdata.consultationpaymethod!,
            pincode: bookingdata.pincode!,
            consultationpayStatus: status,
            razorpayPaymentId: paymentId,
            consultationtransactionId:paymentId
        })
        if (status === "completed") {
            // No commission calculation here for now. You can add it when the final payment is processed.
            booking.consultationpayStatus = "completed"; // mark consultation payment as completed
            console.log("dfsfd")

            const wallet=await this.walletrepository.findById(booking.userId.toString())
            
            if (!wallet) {
                throw new Error("Wallet not found");
            }
            console.log("wallet",wallet)
            // Store the transaction for the user to track the consultation payment
            try {
                const res=await this.transactionrepository.create({
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
            booking.consultationpayStatus = "failed"; // If payment fails, mark it as failed
          }
          booking = await this.bookingrepository.update(booking.id!, { consultationpayStatus: booking.consultationpayStatus });

          return { success: true, booking };

        }
}