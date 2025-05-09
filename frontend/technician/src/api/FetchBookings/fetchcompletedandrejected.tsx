import axiosInstancetech from "../../axios";

export const BookingDetails=async(techId:string)=>{
    try {
        const response=await axiosInstancetech.get(`/fetchbookings/${techId}`)
        return response.data.booking
    } catch (error: any) {
        console.error("Error fetching bookings:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch bookings"
        );
      }
}