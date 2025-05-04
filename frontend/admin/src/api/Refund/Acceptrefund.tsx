import axiosInstanceadmin from "../../axios";

export const acceptrefundrequest=async(bookingId:string)=>{
    try {
        const result=await axiosInstanceadmin.post(`/acceptrefund/${bookingId}`)

        return result.data
    } catch (error: any) {
        console.error("Error accept refund request:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to accept refud req"
        );
      }
}