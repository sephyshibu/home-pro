import axiosInstancetech from "../../../Axios/TechAxios/axios";

export const fetchreviews=async(techId:string)=>{
    try {
        const response=await axiosInstancetech.get(`/api/fetchreview/${techId}`)
        return response.data
    } catch (error: any) {
        console.error("Error fetching request:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch request"
        );
      }
}