import { razorpay } from "../../utils/RazorpayInstance";

export class RazorpayService {
    async createBooking(amount: number, currency: string, receipt: string) {
      const options = {
        amount: amount * 100, // Razorpay uses paise
        currency,
        receipt,
      };
      console.log("service", options)
      try {
        return await razorpay.orders.create(options);
      } catch (err: any) {
        console.error("Razorpay Error:", err);
        throw new Error("Razorpay order creation failed");
      }
    }
  }