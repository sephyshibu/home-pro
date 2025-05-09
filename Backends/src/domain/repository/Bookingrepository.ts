import { IBooking } from "../models/Bookings";


export interface BookingRepository {
    creates(booking: IBooking): Promise<IBooking>;
    update(bookingId: Object, updatedBooking: Partial<IBooking>): Promise<IBooking>;
    fetchbookingByUserId(userId:string):Promise<IBooking[]>
    fetchbookingByTechId(techId:string):Promise<IBooking[]|null>
    fetchupcomingevents(techId:string):Promise<IBooking[]|null>
    createFailedPaymentBooking(data: IBooking): Promise<IBooking>;
    findById(id: string): Promise<IBooking | null>;
    findByIdWithPopulates(id: string): Promise<IBooking | null>;
    fetchBookingswithremark():Promise<IBooking[]>
    addsessionRequest(bookingId:string, types:string):Promise<IBooking|null>
    acceptsession(bookingId:string,requestId:string):Promise<IBooking|null>
   
    
}
