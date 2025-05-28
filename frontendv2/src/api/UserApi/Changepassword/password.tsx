import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const Changepasswordapi=async(userId:string,oldpassword:string,password:string)=>{
    try {
        const response=await axiosInstanceuser.post(`/api/password/${userId}`,{password,oldpassword})
        console.log("api in password", response.data.message)
        return response.data.message
    } catch (error: any) {
        console.error("Error in chnage password:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to change password"
        );
      }
}