import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { TechModel } from "../../../infrastructure/db/schemas/techModel";
export class bookingRequestAcceptByTech{
    constructor(private bookingrepository:BookingRepository){}

    async bookingreacceptbytech(bookingId:string):Promise<{success:boolean}>{
        const acceptbookings=  await this.bookingrepository.update(bookingId, { isconfirmedbyTech: "accepted" });
        if(!acceptbookings) throw new Error("error in accepting")

        const booking=await this.bookingrepository.findById(bookingId)
        console.log("bookingsss",booking)
        if(!booking|| !booking.technicianId||!booking.booked_date){
            throw new Error("booking details is missing")

        }

       await TechModel.findByIdAndUpdate(booking.technicianId, {
        $addToSet: { bookedSlots: { date: booking.booked_date } },
      },
      { new: true })
        
        console.log("usecase",acceptbookings)
        return{success:true}
    }

}