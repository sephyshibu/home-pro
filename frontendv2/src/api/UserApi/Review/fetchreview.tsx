import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const ReviewDetails=async(techid:string)=>{
    try {
        const response=await axiosInstanceuser.get(`/api/fetchreview/${techid}`)
        console.log("review",response.data.reviews)
        return response.data.reviews
    } catch (error: any) {
        console.error("Error fetching review:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch review"
        );
      }
}