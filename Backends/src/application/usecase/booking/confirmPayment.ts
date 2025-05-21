import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { walletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { ITransaction } from "../../../domain/models/Transactions";
export class ConfirmPayment{
    constructor(private _bookingrepository:BookingRepository,
                private _walletrepository:walletRepository,
                private _transactionrepository: TransactionRepository

    ){}

    async confirmPayment(bookingdata: Partial<IBooking>, paymentId: string, status: 'completed' | 'failed'): Promise<{success:boolean; booking:IBooking}> {
        if (!bookingdata.userId || !bookingdata.technicianId || !bookingdata.addressId) {
            throw new Error("Missing required fields");
          }
          console.log("usecase")
          console.log(bookingdata)
          
        let booking = await this._bookingrepository.creates({
            userId: bookingdata.userId,
            technicianId: bookingdata.technicianId,
            rateperhour: bookingdata.rateperhour, 
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
           
            booking.consultationpayStatus = "completed"; 
            console.log("dfsfd")

            const wallet=await this._walletrepository.findById(booking.userId.toString())
            
            if (!wallet) {
                throw new Error("Wallet not found");
            }
            console.log("wallet",wallet)
            // Store the transaction for the user to track the consultation payment
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
                console.log("Transaction created successfully");
              } catch (err) {
                console.error("Transaction creation failed:", err);
              }
          
        
        } else {
            booking.consultationpayStatus = "failed"; // If payment fails, mark it as failed
          }
          booking = await this._bookingrepository.update(booking.id!, { consultationpayStatus: booking.consultationpayStatus });

          return { success: true, booking };

        }
}