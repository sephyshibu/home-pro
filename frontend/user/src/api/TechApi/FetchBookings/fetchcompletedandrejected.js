import axiosInstancetech from "../../../Axios/TechAxios/axios";
export const BookingDetails = async (techId) => {
    try {
        const response = await axiosInstancetech.get(`/fetchbookings/${techId}`);
        return response.data.booking;
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch bookings");
    }
};
