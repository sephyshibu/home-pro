import axiosInstancetech from "../../axios";

export const aceptRequest=async(bookingId:string,techId:string)=>{
    try {
        const response=await axiosInstancetech.post(`/request/${techId}`,{bookingId})
        return response.data.message
    }catch (error: any) {
        console.error("Error accepting request:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to accepting request"
        );
      }
}