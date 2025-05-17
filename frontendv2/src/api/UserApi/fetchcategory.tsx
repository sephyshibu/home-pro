import axiosInstanceuser from "../../Axios/UserAxios/axios";

export const fetchcategory=async(catid:string)=>{
    try {
        const response=await axiosInstanceuser.get(`/fetchparticularcategory/${catid}`)
        return response.data.category
    }catch (error: any) {
        console.error("Error fetching category name and description:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch category name and description"
        );
      }
}