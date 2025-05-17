import axiosInstanceuser from "../../../Axios/UserAxios/axios";
export const acceptsessionrequest = async (bookingId, requestId, status) => {
    try {
        const response = await axiosInstanceuser.post(`/acceptsessionrequest/${bookingId}`, { requestId, status: status });
        return response;
    }
    catch (error) {
        console.error("Error accept request", error);
        throw new Error(error?.response?.data?.message || "Failed to  accept request");
    }
};
