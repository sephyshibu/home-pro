import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";

export const searchuser=async(searchterm:string)=>{
    try {
        const searching=await axiosInstanceadmin.get(`/api/searchuser/${searchterm}`)
        return searching
    } catch (error: any) {
        console.error("Error searching user:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to search user"
        );
    }
}