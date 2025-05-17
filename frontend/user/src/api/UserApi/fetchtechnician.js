import axiosInstanceuser from "../../Axios/UserAxios/axios";
export const fetchTechnicianbasedonavailableSlot = async (pincode, date, categoryId) => {
    try {
        const response = await axiosInstanceuser.get(`/technicians/available?pincode=${pincode}&date=${date}&categoryId=${categoryId}`);
        return response.data.technicians;
    }
    catch (error) {
        const message = error?.response?.data?.message || "Something went wrong";
        throw new Error(message); // This is important
    }
};
