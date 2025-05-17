import axiosInstancetech from "../../../Axios/TechAxios/axios";
export const aceptRequest = async (bookingId) => {
    try {
        const response = await axiosInstancetech.post(`/request/${bookingId}`);
        return response.data.message;
    }
    catch (error) {
        console.error("Error accepting request:", error);
        throw new Error(error?.response?.data?.message || "Failed to accepting request");
    }
};
