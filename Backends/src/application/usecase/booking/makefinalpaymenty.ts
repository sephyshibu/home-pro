import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { walletRepository } from "../../../domain/repository/Walletrepository";
import { TransactionRepository } from "../../../domain/repository/Transsactionrepository";
import { IBooking } from "../../../domain/models/Bookings";
import { calculateTotalWorkMinutes } from "../../../utils/CalculateMinutes";

export class FinalPayment{
    constructor(private _bookingrepository:BookingRepository){}


    async finalpayment(bookingId:string):Promise<{rateperminute:number,totalminutes:number,totalamount:number}>{
        try {
            const booking=await this._bookingrepository.findById(bookingId)
            if(!booking) throw new Error("no bookings")

            let totalMinutes=calculateTotalWorkMinutes(booking.workTime)
            console.log("rate per  hour",booking.rateperhour)
            const ratePerMinute = booking.rateperhour! / 60;
            const workFinalAmount = Math.ceil(ratePerMinute * totalMinutes);
            return {rateperminute:ratePerMinute,totalminutes:totalMinutes,totalamount:workFinalAmount}
        } catch (error) {
            throw new Error("Error calculating final payment");
        }
    }
}
