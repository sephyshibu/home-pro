import { RazorpayService } from "../../../../infrastructure/service/RazorpayService";
import { nanoid } from "nanoid";
export class CreateBookingUseCase {
  constructor(private razorpayService: RazorpayService) {}

  async execute(amount: number, userId: string): Promise<any> {
    const shortUserId = userId.slice(0, 8); // take first 8 characters
    const receipt = `rcpt_${shortUserId}_${Date.now()}`;
   
    console.log(receipt)
    return await this.razorpayService.createBooking(amount, "INR", receipt);
  }
}
