import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";


export class FetchBookingbyUserId{
    constructor(private bookingrepository:BookingRepository){}

    async fetchBookingdetails(userId:string){
        const booking=await this.bookingrepository.fetchbookingByUserId(userId)
        if(!booking) throw new Error("no booking")

        return booking.map((booking:any)=>{
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
         

            }

        })
    }
}