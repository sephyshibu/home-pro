import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";

export const fetchtransactions=async(page:number)=>{
    try {
        const transactions=await axiosInstanceadmin.get(`/api/fetchtransactions?page=${page}`)
        return transactions.data
    } catch (error: any) {
        console.error("Error fetching transactions:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch transactions"
        );
      }
}