import { IBooking } from "../models/Bookings";


export interface BookingRepository {
    create(booking: IBooking): Promise<IBooking>;
    update(bookingId: string, updatedBooking: Partial<IBooking>): Promise<IBooking>;
    getById(bookingId: string): Promise<IBooking | null>;
    getByUserId(userId: string): Promise<IBooking[]>;
    getByTechnicianId(technicianId: string): Promise<IBooking[]>;
    getByStatus(status: string): Promise<IBooking[]>;
    // You can add more queries based on your use case
}
