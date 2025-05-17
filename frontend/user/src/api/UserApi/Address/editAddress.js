// src/api/Address/editAddress.ts
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
export const editAddress = async (addressId, updatedData) => {
    const response = await axiosInstanceuser.put(`/editaddress/${addressId}`, updatedData);
    return response.data;
};
