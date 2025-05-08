import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { walletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { IBooking } from "../../../domain/models/Bookings";
import { calculateTotalWorkMinutes } from "../../../utils/CalculateMinutes";

export class FinalPayment{
    constructor(private bookingrepository:BookingRepository){}


    async finalpayment(bookingId:string):Promise<{totalamount:number}>{
        try {
            const booking=await this.bookingrepository.findById(bookingId)
            if(!booking) throw new Error("no bookings")

            let totalMinutes=calculateTotalWorkMinutes(booking.workTime)
            const ratePerMinute = booking.rateperhour! / 60;
            const workFinalAmount = Math.ceil(ratePerMinute * totalMinutes);
            return {totalamount:workFinalAmount}
        } catch (error) {
            throw new Error("Error calculating final payment");
        }
    }
}
