import axiosInstanceuser from "../../axios";

export const BookingDetails=async(userId:string, currentPage:number=1)=>{
    try {
        const response=await axiosInstanceuser.get(`/fetchbookings?page=${currentPage}&userId=${userId}`)
        console.log("bpokij",response)
        return response.data
    } catch (error: any) {
        console.error("Error fetching category name and description:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch category name and description"
        );
      }
}