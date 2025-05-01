import axiosInstanceuser from "../../axios";

export const fetchaddress=async(userId:string)=>{
    try {
        const response=await axiosInstanceuser.get(`/fetchaddress/${userId}`)
        return response.data.addresses
    } catch (error: any) {
        console.error("Error fetching address:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch address"
        );
      }
}