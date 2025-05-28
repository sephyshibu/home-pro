// src/api/Address/deleteAddress.ts

import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const deleteAddress = async (addressId: string) => {


  const response = await axiosInstanceuser.delete(`/api/deleteaddress/${addressId}`);

  return response.data;
};
