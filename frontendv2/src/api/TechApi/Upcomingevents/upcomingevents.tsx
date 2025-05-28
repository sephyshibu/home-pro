import axiosInstancetech from "../../../Axios/TechAxios/axios";


export const fetchupcomingevents=async(techId:string)=>{
    try {
        const response=await axiosInstancetech.get(`/api/upcmingevents/${techId}`)
        return response.data.booking
    } catch (error: any) {
        console.error("Error fetching upcoming events:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch upcoming events"
        );
      }
}