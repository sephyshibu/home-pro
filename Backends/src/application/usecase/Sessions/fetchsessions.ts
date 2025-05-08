import { BookingRepository } from "../../../domain/repository/Bookingrepository";


export class FetchSession{
    constructor(private bookingrepository:BookingRepository){}


    async fetchpendingsession(bookingId:string){
        try {
            const booking=await this.bookingrepository.findById(bookingId)
            if(!booking)  throw new Error("no bokings found")
            const pendingsession=booking.sessionRequests?.filter((req)=>req.status==="pending")
            return pendingsession
        } catch (error) {
            console.error("Error fetching pending sessions:", error);
        }
    }
}