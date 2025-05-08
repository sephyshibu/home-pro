import axiosInstanceuser from "../../axios";

export const fetchSessionRequests = async (bookingId: string) => {
  try {
    const response = await axiosInstanceuser.get(`/fetchsessions/${bookingId}`);
    console.log("fetching sessio",response.data)
    return response.data; // Assume it returns an array of session requests
  } catch (error) {
    console.error('Error fetching session requests:', error);
    throw error; // Propagate the error so it can be handled in the component
  }
};
