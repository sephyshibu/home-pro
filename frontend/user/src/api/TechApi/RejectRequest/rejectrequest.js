import axiosInstancetech from "../../../Axios/TechAxios/axios";
export const rejectRequest = async (bookingId, reason) => {
    const response = await axiosInstancetech.post(`/rejectbookings/${bookingId}`, {
        reason,
    });
    return response.data;
};
