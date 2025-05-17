import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";

export const searchcategory=async(searchterm:string)=>{
    try {
        const searching=await axiosInstanceadmin.get(`/searchcategory/${searchterm}`)
        return searching
    } catch (error: any) {
        console.error("Error searching user:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to search user"
        );
    }
}