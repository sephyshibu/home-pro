import axiosInstanceuser from "../../axios";

export const BookingDetails=async(userId:string)=>{
    try {
        const response=await axiosInstanceuser.get(`/fetchbookings/${userId}`)
        return response.data.booking
    } catch (error: any) {
        console.error("Error fetching category name and description:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch category name and description"
        );
      }
}