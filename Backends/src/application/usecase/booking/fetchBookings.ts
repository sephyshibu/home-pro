import { IBooking } from "../../../domain/models/Bookings";
import { IBookingRepository } from "../../../domain/repository/Bookingrepository";


export class FetchBookingbyUserId{
    constructor(private _bookingrepository:IBookingRepository){}

    async fetchBookingdetails(userId:string,page:number){
        console.log("dasd",userId)
         const limit = 5;
         const skip = (page - 1) * limit;
        const totalCount = await this._bookingrepository.countBookingsByUserId(userId);
        const booking=await this._bookingrepository.fetchbookingByUserId(userId,limit,skip)
        if(!booking) throw new Error("no booking")

        const formatted= booking.map((booking:any)=>{
            const locationUrl = `https://www.google.com/maps?q=${booking.location.lat},${booking.location.lng}`

            return {
            _id:booking._id,
            techIds:booking.technicianId._id,
            technicianname:booking.technicianId.name,
            techimage:booking.technicianId.profileimgurl,
            Category:booking.technicianId.categoryid.name,
            techStatus:booking.isconfirmedbyTech,
            workStatus:booking.workstatus,
            date:booking.booked_date,
            locationUrl,
            rateperhour:booking.rateperhour,
            techphone:booking.technicianId.phone,
            consultationFee:booking.consultationFee,
            consultationpayStatus:booking.consultationpayStatus,
            finalpaymentStatus:booking.finalpayStatus,
            workaddress:booking.addressId.addressname,
            sessionrequest:booking.sessionRequests,
            workTime:booking.workTime,
            totalhours:booking.toalhours,
            pincode:booking.pincode,
            userremark:booking.userremark,
            techremark:booking.techremark,
            refundrequestAccept:booking.refundrequestAccept,
            totalFinalAmount:booking.totalFinalAmount
         

            }

        })
        return {
    bookings: formatted,
    totalPages: Math.ceil(totalCount / limit),
  };

    }
}