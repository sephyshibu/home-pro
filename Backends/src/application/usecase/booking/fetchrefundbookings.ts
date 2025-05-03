import { IBooking } from "../../../domain/models/Bookings";
import { BookingRepository } from "../../../domain/repository/Bookingrepository";

export class FetchrefundRequest{
    constructor(private bookrepository:BookingRepository){}

    async fetchrefundreq(){
        const bookings=await this.bookrepository.fetchBookingswithremark()

        if(!bookings) throw new Error("no ookings")

        console.log(bookings)
        return bookings.map((booking:any) => ({
            _id: booking._id.toString(),
            username: booking.userId?.name || "N/A",
            userphone: booking.userId?.phone || "N/A",
            techname: booking.technicianId?.name || "N/A",
            Category: booking.technicianId?.categoryid?.name || "N/A",
            techStatus: booking.isconfirmedbyTech || "Pending",
            date: booking.booked_date,
            locationUrl: `https://www.google.com/maps?q=${booking.location.lat},${booking.location.lng}`,
            rateperhour: booking.rateperhour || 0,
            techphone: booking.technicianId?.phone || "N/A",
            consultationFee: booking.consultationFee?.toString() || "0",
            consultationpaymentStatus: booking.consultationpayStatus || "pending",
            workaddress: booking.addressId?.addressname || "N/A",
            totalhours: booking.workTime?.length || 0,
            userremark: booking.userremark || "",
            techremark: booking.techremark || ""
          }));
          

        

        
    }
}