import axiosInstanceuser from "../../../Axios/UserAxios/axios";
export const fetchaddress = async (userId) => {
    try {
        const response = await axiosInstanceuser.get(`/fetchaddress/${userId}`);
        return response.data.addresses;
    }
    catch (error) {
        console.error("Error fetching address:", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch address");
    }
};
