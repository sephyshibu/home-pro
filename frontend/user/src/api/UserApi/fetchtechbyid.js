import axiosInstanceuser from "../../Axios/UserAxios/axios";
export const fetchTechById = async (techid) => {
    try {
        const response = await axiosInstanceuser.get(`/fetchtech/${techid}`);
        return response.data.technian;
    }
    catch (error) {
        console.error("Error fetching technicians:", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch technician");
    }
};
