import axiosInstanceuser from "../../axios";

export const finalamount=async(bookingId:string)=>{
    try {
        const resposne=await axiosInstanceuser.post(`/finalpaymentprocess/${bookingId}`)
        console.log(resposne)
        return resposne.data
    } catch (error: any) {
        console.error("Error in final payment porocess", error);
        throw new Error(
          error?.response?.data?.message || "Failed to final payment process"
        );
      }

}