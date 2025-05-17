import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const fetchbooking=async(transId:string)=>{
    try {
        const transactions=await axiosInstanceuser.get(`/fetchtransactionwithBookings/${transId}`)

        return transactions.data.result
    } catch (error: any) {
        console.error("Error fetching transactions:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch transactions"
        );
      }
}