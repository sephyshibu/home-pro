import axiosInstancetech from "../../../Axios/TechAxios/axios";

export const aceptRequest=async(bookingId:string)=>{
    try {
        const response=await axiosInstancetech.post(`/api/request/${bookingId}`)
        return response.data.message
    }catch (error: any) {
        console.error("Error accepting request:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to accepting request"
        );
      }
}