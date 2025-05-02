import axiosInstanceuser from "../../axios";

export const Changepasswordapi=async(userId:string,password:string)=>{
    try {
        const response=await axiosInstanceuser.post(`/password/${userId}`,{password})
        return response.data.message
    } catch (error: any) {
        console.error("Error in chnage password:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to change password"
        );
      }
}