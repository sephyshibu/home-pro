import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";

export const searchtransactions=async(searchterm:string)=>{
    try {
        const result=await axiosInstanceadmin.get(`/api/searchbooking/${searchterm}`)
        return result
    } catch (error: any) {
        console.error("Error searching booking:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to search booking"
        );
    }
}