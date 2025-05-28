import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";

export const fetchrefunndallreq=async()=>{
    try {
        const transactions=await axiosInstanceadmin.get('/api/fetchrefundreqall')

        return transactions.data.Bookings
    } catch (error: any) {
        console.error("Error fetching refund request:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch refud req"
        );
      }
}