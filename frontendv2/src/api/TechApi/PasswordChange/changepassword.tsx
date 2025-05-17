import axiosInstancetech from "../../../Axios/TechAxios/axios";

export const Changepasswordapi=async(techId:string,password:string)=>{
    try {
        const response=await axiosInstancetech.post(`/password/${techId}`,{password})
        console.log("api in password", response.data.message)
        return response.data.message
    } catch (error: any) {
        console.error("Error in chnage password:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to change password"
        );
      }
}