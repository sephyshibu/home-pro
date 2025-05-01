import { IBooking } from "../models/Bookings";


export interface BookingRepository {
    creates(booking: IBooking): Promise<IBooking>;
    update(bookingId: Object, updatedBooking: Partial<IBooking>): Promise<IBooking>;
    fetchbookingByUserId(userId:string):Promise<IBooking[]>
    // getById(bookingId: string): Promise<IBooking | null>;
    // getByUserId(userId: string): Promise<IBooking[]>;
    // getByTechnicianId(technicianId: string): Promise<IBooking[]>;
    // getByStatus(status: string): Promise<IBooking[]>;
    // You can add more queries based on your use case
}
