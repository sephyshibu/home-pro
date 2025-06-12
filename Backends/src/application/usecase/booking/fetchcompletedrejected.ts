import { IBooking } from "../../../domain/models/Bookings";
import { IBookingRepository } from "../../../domain/repository/Bookingrepository";


export class fetchBookingswhichcompletedrejected{
    constructor(private _bookingrepository:IBookingRepository){}

    async fetchBookingscommpletereject(techId:string):Promise<IBooking[]|null>{
        try {
            const booking=await this._bookingrepository.fetchcompletedandrejected(techId)
            if(!booking){
                throw new Error('no bookings')
            }
            console.log("booking details",booking)
            return booking

        
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return null;
        }
    }
}