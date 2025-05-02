import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { IBooking } from "../../../domain/models/Bookings";

export class HandleFailedPayment {
    constructor(private bookingrepository: BookingRepository) {}
  
    async execute(data: IBooking): Promise<IBooking> {
      return this.bookingrepository.createFailedPaymentBooking({
        ...data,
        consultationpayStatus: 'failed'
      });
    }
  }