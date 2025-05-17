// src/api/Address/deleteAddress.ts
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
export const deleteAddress = async (addressId) => {
    const response = await axiosInstanceuser.delete(`/deleteaddress/${addressId}`);
    return response.data;
};
