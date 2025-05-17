import axiosInstanceuser from "../../../Axios/UserAxios/axios";
export const updatecancelreason = async (bookingId, userremark) => {
    try {
        const response = await axiosInstanceuser.post(`/updatecancelreason/${bookingId}`, { userremark });
        return response.data;
    }
    catch (error) {
        console.error("Error update cancel reason", error);
        throw new Error(error?.response?.data?.message || "Failed to  update cancel reason");
    }
};
