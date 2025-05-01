// src/api/Address/deleteAddress.ts

import axiosInstanceuser from "../../axios";

export const deleteAddress = async (addressId: string) => {


  const response = await axiosInstanceuser.delete(`/deleteaddress/${addressId}`);

  return response.data;
};
