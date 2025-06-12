import { IBookingRepository } from "../../../domain/repository/Bookingrepository";


export class FetchSession{
    constructor(private _bookingrepository:IBookingRepository){}


    async fetchpendingsession(bookingId:string){
        try {
            const booking=await this._bookingrepository.findById(bookingId)
            if(!booking)  throw new Error("no bokings found")
            console.log("booking", booking)
            const pendingsession=booking.sessionRequests?.filter((req)=>req.status==="pending")
           console.log("pendiong session", pendingsession)
            return pendingsession
        } catch (error) {
            console.error("Error fetching pending sessions:", error);
        }
    }
}