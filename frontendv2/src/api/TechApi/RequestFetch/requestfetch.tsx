import axiosInstancetech from "../../../Axios/TechAxios/axios";
export const fetchrequest=async(techId:string)=>{
    try {
        const response=await axiosInstancetech.get(`/request/${techId}`)
        return response.data.bokings
    }catch (error: any) {
        console.error("Error fetching request:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch request"
        );
      }
}