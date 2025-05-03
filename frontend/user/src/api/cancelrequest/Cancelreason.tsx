import axiosInstanceuser from "../../axios";

export const updatecancelreason=async(bookingid:string,userremark:string)=>{
    try {
        const response=await axiosInstanceuser.post(`/updatecancelreason/${bookingid}`,{userremark})
        return response.data.message
    }catch (error: any) {
        console.error("Error update cancel reason", error);
        throw new Error(
          error?.response?.data?.message || "Failed to  update cancel reason"
        );
      }
}