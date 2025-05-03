import axiosInstanceadmin from "../../axios";

export const fetchtransactions=async()=>{
    try {
        const transactions=await axiosInstanceadmin.get(`/fetchtransactions`)
        return transactions.data.transaction
    } catch (error: any) {
        console.error("Error fetching transactions:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch transactions"
        );
      }
}