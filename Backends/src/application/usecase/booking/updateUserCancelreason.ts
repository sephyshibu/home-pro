import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";

export class updateusercancelreason{
    constructor(private _bookrepository:BookingRepository){}

    async updateusercanel(bookingId:string,userremark:string):Promise<{message:string;updatebooker:IBooking}>{
        console.log("getting")
        const booking= await this._bookrepository.update(bookingId,{userremark:userremark})

        console.log("booking after update", booking)
        return{message:"updated", updatebooker:booking}


    }
}