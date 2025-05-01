import { RazorpayService } from "../../../../infrastructure/service/RazorpayService";

export class CreateBookingUseCase {
  constructor(private razorpayService: RazorpayService) {}

  async execute(amount: number, userId: string): Promise<any> {
    const receipt = `order_rcptid_${userId}_${Date.now()}`;
    return await this.razorpayService.createBooking(amount, "INR", receipt);
  }
}
