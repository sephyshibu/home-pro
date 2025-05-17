import axiosInstancetech from "../../../Axios/TechAxios/axios";
export const rejectRequest = async (bookingId: string, reason: string) => {
  const response = await axiosInstancetech.post(`/rejectbookings/${bookingId}`, {
 
    reason,
  });
  return response.data;
};
