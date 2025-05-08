import axiosInstanceuser from "../../axios";

export const acceptsessionrequest=async(bookingId:string,requestId:string,status:string)=>{
   try {
    const response=await axiosInstanceuser.post(`/acceptsessionrequest/${bookingId}`,{requestId,status:status})
    return response
   } catch (error: any) {
    console.error("Error accept request", error);
    throw new Error(
      error?.response?.data?.message || "Failed to  accept request"
    );
  }
}