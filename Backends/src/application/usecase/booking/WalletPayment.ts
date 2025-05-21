import { walletRepository } from "../../../domain/repository/Walletrepository";
import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";

export class WalletPayment{
    constructor(private _bookingrepository:BookingRepository, private _walletrepository:walletRepository,private _transactionrepository:TransactionRepository){}

    async WalletConsultationPayment(bookingdata:Partial<IBooking>,status:"completed"| "failed"):Promise<{success:boolean,booking:IBooking}>{
            if(!bookingdata.addressId||!bookingdata.userId|| !bookingdata.technicianId){
                throw new Error("missing required field")

            }
            console.log("usecase")
            console.log(bookingdata)

            const userwallet=await this._walletrepository.findById(bookingdata.userId.toString())
            console.log("userwallety",userwallet)
            if(!userwallet) throw new Error("wallt not founded")

            if(userwallet.balance<bookingdata.consultationFee!){
                throw new Error("insufficeint Balance")
            }
            
            const res=await this._walletrepository.decreasebalance(bookingdata.userId.toString(),bookingdata.consultationFee!)
            console.log(res)
            let booking=await this._bookingrepository.creates({
                userId:bookingdata.userId,
                technicianId:bookingdata.technicianId,
                rateperhour:bookingdata.rateperhour,
                addressId:bookingdata.addressId,
                location:bookingdata.location!,
                booked_date: bookingdata.booked_date!,
                consultationFee: bookingdata.consultationFee!,
                consultationpaymethod: bookingdata.consultationpaymethod!,
                pincode: bookingdata.pincode!,
                consultationpayStatus: status,     

            })
            if(status==="completed"){
                booking.consultationpayStatus="completed";

                try {
                    const res=await this._transactionrepository.create({
                        ownerId: booking.userId.toString(),
                        userType:userwallet.userType,
                        type: "DEBIT",
                        amount: booking.consultationFee,
                        referenceId: booking.id!.toString(),
                        method: "Wallet",
                        status: "success",
                        purpose: "Consultation Payment",
                      });
                      console.log("res", res)
                      console.log("Transaction created successfully");
                    } catch (err) {
                      console.error("Transaction creation failed:", err);
                    }



            }
            return {success:true,booking}
    }

    
}