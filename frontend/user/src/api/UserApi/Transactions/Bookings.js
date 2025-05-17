import axiosInstanceuser from "../../../Axios/UserAxios/axios";
export const fetchbooking = async (transId) => {
    try {
        const transactions = await axiosInstanceuser.get(`/fetchtransactionwithBookings/${transId}`);
        return transactions.data.result;
    }
    catch (error) {
        console.error("Error fetching transactions:", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch transactions");
    }
};
