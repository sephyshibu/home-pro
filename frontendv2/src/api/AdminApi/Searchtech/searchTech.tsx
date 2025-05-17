import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";

export const searchtech=async(searchterm:string)=>{
    try {
        const searching=await axiosInstanceadmin.get(`/searchtech/${searchterm}`)
        return searching
    } catch (error: any) {
        console.error("Error searching tech:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to search tech"
        );
    }
}