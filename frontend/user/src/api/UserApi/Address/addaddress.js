import axiosInstanceuser from "../../../Axios/UserAxios/axios";
export const addaddress = async (userId, addressdata) => {
    try {
        const response = await axiosInstanceuser.post(`/addaddress/${userId}`, addressdata);
        return response.data;
    }
    catch (error) {
        const message = error?.response?.data?.message || "Something went wrong";
        throw new Error(message); // This is important
    }
};
