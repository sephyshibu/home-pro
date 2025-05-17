import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const walletdetails=async(userId:string)=>{
    try {
        const response=await axiosInstanceuser.get(`/fetchwalletdetails/${userId}`)
        return response.data.walletdetail
    } catch (error: any) {
        console.error("Error fetchingwallet", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch wallet"
        );
      }
}