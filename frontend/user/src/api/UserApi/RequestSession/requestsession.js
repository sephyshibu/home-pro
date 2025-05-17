import axiosInstanceuser from "../../../Axios/UserAxios/axios";
export const rejectsessionrequest = async (bookingId, requestId, status) => {
    try {
        const response = await axiosInstanceuser.post(`/rejectsessionrequest/${bookingId}`, { requestId, status: status });
        return response;
    }
    catch (error) {
        console.error("Error reject request", error);
        throw new Error(error?.response?.data?.message || "Failed to  reject request");
    }
};
