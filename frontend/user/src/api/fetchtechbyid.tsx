import axiosInstanceuser from "../axios";


export const fetchTechById=async(techid:string)=>{
    try {
        const response=await axiosInstanceuser.get(`/fetchtech/${techid}`)
        return response.data.technian
    }catch (error: any) {
        console.error("Error fetching technicians:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch technician"
        );
      }
}