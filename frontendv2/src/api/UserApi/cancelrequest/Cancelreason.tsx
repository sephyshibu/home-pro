import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const updatecancelreason=async(bookingId:string,userremark:string)=>{
    try {
        const response=await axiosInstanceuser.post(`/api/updatecancelreason/${bookingId}`,{userremark})
        return response.data
    }catch (error: any) {
        console.error("Error update cancel reason", error);
        throw new Error(
          error?.response?.data?.message || "Failed to  update cancel reason"
        );
      }
}