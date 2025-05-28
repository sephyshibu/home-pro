import axiosInstanceuser from "../../Axios/UserAxios/axios";


export const fetchTechById=async(techid:string)=>{
    try {
        const response=await axiosInstanceuser.get(`/api/fetchtech/${techid}`)
        return response.data.technian
    }catch (error: any) {
        console.error("Error fetching technicians:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch technician"
        );
      }
}