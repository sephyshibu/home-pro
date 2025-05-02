import { BookingRepository } from "../../../domain/repository/Bookingrepository";

export class bookingRequestAcceptByTech{
    constructor(private bookingrepository:BookingRepository){}

    async bookingreacceptbytech(bookingId:string):Promise<{success:boolean}>{
        const acceptbookings=  await this.bookingrepository.update(bookingId, { isconfirmedbyTech: "accepted" });
        console.log("usecase",acceptbookings)
        return{success:true}
    }

}