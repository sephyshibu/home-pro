import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";

export const fetchbooking=async(transId:string)=>{
    try {
        const transactions=await axiosInstanceadmin.get(`/fetchtransactionwithBookings/${transId}`)

        return transactions.data.result
    } catch (error: any) {
        console.error("Error fetching transactions:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch transactions"
        );
      }
}