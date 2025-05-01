import { razorpay } from "../../utils/RazorpayInstance";

export class RazorpayService {
    async createBooking(amount: number, currency: string, receipt: string) {
      const options = {
        amount: amount * 100, // Razorpay uses paise
        currency,
        receipt,
      };
      return await razorpay.orders.create(options);
    }
  }