import { razorpay } from "../../utils/RazorpayInstance";


export const createBooking= async (amount: number) => {
  return razorpay.orders.create({
    amount: amount * 100, // in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });
};
