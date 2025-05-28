import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const rejectsessionrequest=async(bookingId:string,requestId:string,status:string)=>{
   try {
    const response=await axiosInstanceuser.post(`/api/rejectsessionrequest/${bookingId}`,{requestId,status:status})
    return response
   } catch (error: any) {
    console.error("Error reject request", error);
    throw new Error(
      error?.response?.data?.message || "Failed to  reject request"
    );
  }
}