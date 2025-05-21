import { BookingRepository } from "../../../domain/repository/Bookingrepository";

export class RequestSession{
    constructor(private _bookingrepository:BookingRepository){}

    async requestsession(bookingId: string, type: string) {
    try {
        // Use the repository to add the session request
        const booking = await this._bookingrepository.addsessionRequest(bookingId, type);
  
        return {
          success: true,
          message: `Session request for ${type} added successfully`,
          booking,  // Optionally, return the updated booking object
        };
      } catch (error:any) {
        console.error("Error in session request:", error);
        throw new Error("Error processing session request: " + error.message);
      }
    }
}
