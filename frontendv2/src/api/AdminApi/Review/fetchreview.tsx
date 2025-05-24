import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const ReviewDetails=async(techid:string)=>{
    try {
        const response=await axiosInstanceuser.get(`/fetchreview/${techid}`)
        return response.data
    } catch (error: any) {
        console.error("Error fetching review:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch review"
        );
      }
}