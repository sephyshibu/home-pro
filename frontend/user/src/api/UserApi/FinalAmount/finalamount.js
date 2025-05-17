import axiosInstanceuser from "../../../Axios/UserAxios/axios";
export const finalamount = async (bookingId) => {
    try {
        const resposne = await axiosInstanceuser.post(`/finalpaymentprocess/${bookingId}`);
        console.log(resposne);
        return resposne.data;
    }
    catch (error) {
        console.error("Error in final payment porocess", error);
        throw new Error(error?.response?.data?.message || "Failed to final payment process");
    }
};
