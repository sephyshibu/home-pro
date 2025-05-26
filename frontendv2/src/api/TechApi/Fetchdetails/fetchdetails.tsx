import axiosInstancetech from "../../../Axios/TechAxios/axios";

export const fetchingdashboard=async(techId:string)=>{
    try {
        const res=await axiosInstancetech.get(`/detailsdashboard/${techId}`)
        return res
    } catch (error:any) {
        console.error("Error fetching bookings:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch bookings"
        );  
    }

}