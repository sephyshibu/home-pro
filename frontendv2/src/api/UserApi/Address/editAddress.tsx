// src/api/Address/editAddress.ts

import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const editAddress = async (addressId: string, updatedData: {
  types: string;
  addressname: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}) => {
  

  const response = await axiosInstanceuser.put(`/api/editaddress/${addressId}`,
    updatedData,
    
  );

  return response.data;
};
