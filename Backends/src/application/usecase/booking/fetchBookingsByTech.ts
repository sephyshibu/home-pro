import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";

export class FetchBookingByTechId{
    constructor(private bookrepository:BookingRepository){}

    async fetchBookingDetailsRequest(techId:string){
        const bookings=await this.bookrepository.fetchbookingByTechId(techId)
        if(!bookings){
            throw new Error('no bookings')
        }
        return bookings.map((bookings:any)=>{
            const locationUrl=`https://www.google.com/maps?q=${bookings.location.lat},${bookings.location.lng}`


            return {
                _id:bookings._id,
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
                consultationpaymentStatus:bookings.consultationpaymentStatus,
                finalpaymentStatus:bookings.finalpaymentStatus,
                workaddress:bookings.addressId.addressname,
                totalhours:bookings.toalhours,
                pincode:bookings.pincode
            }
        })


    }
}