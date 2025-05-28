
import { BookingRepository } from "../../../domain/repository/Bookingrepository";

export class CheckPaymentStatus {
  constructor(private _bookingRepository: BookingRepository) {}

  async execute(userId: string, technicianId: string, date: string): Promise<"completed" | "pending" | "not_started"> {
    if (!userId || !technicianId || !date) {
      throw new Error("Missing parameters");
    }

    const booking = await this._bookingRepository.findBookingByUserTechDate(
      userId,
      technicianId,
      date
    );

    if (booking) {
      if (booking.consultationpayStatus === "completed") return "completed";
      if (booking.consultationpayStatus === "pending") return "pending";
    }

    return "not_started";
  }
}
