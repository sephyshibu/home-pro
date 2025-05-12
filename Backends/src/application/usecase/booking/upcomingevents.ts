import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";

export class FetchUpcoming{
    constructor (private bookingrepository:BookingRepository){}

    async fetchupcoming(techId:string){
        const bookings=await this.bookingrepository.fetchupcomingevents(techId)
        if(!bookings){
            throw new Error('no bookings')
        }
        return bookings.map((bookings:any)=>{
            const locationUrl=`https://www.google.com/maps?q=${bookings.location.lat},${bookings.location.lng}`


            return {
                _id:bookings._id,
                userId:bookings.userId,
                isPauseAccept:bookings.isPauseAccept,
                isResumeAccept:bookings.isResumeAccept,
                username:bookings.userId.name,
                userphone:bookings.userId.phone,
                Category:bookings.technicianId.categoryid.name,
                techStatus:bookings.isconfirmedbyTech,
                workStatus:bookings.workstatus,
                date:bookings.booked_date,
                locationUrl,
                rateperhour:bookings.rateperhour,
                isconfirmedByTech:bookings.isconfirmedbyTech,
                techphone:bookings.technicianId.phone,
                consultationFee:bookings.consultationFee,
                consultationpaymentStatus:bookings.consultationpayStatus,
                finalpaymentStatus:bookings.finalpayStatus,
                sessionrequest:bookings.sessionRequests,
                workaddress:bookings.addressId.addressname,
                totalhours:bookings.toalhours,
                pincode:bookings.pincode
            }
        })


    }

}
