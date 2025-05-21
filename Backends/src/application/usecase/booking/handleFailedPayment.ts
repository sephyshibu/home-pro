import { BookingRepository } from "../../../domain/repository/Bookingrepository";
import { IBooking } from "../../../domain/models/Bookings";

export class HandleFailedPayment {
    constructor(private _bookingrepository: BookingRepository) {}
  
    async execute(data: IBooking): Promise<IBooking> {
      return this._bookingrepository.createFailedPaymentBooking({
        ...data,
        consultationpayStatus: 'failed'
      });
    }
  }