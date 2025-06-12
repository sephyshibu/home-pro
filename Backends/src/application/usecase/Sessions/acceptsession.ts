import { IBookingRepository } from "../../../domain/repository/Bookingrepository";

export class Acceptsession{
    constructor(private _bookingrepository:IBookingRepository){}


    async acceptsession(bookingId:string, requestId:string, status:string){
        try {
            const updatedbooking=await this._bookingrepository.acceptsession(bookingId,requestId)
            if(!updatedbooking){
                throw new Error('no bookings founded')
            }
            return {
                success: true,
                message: "session request accepted",
                booking:updatedbooking,  // Optionally, return the updated booking object
              };

        } catch (error:any) {
            console.error("Error in accept session request:", error);
            throw new Error("Error processing accept session request: " + error.message);
          }
    }
}