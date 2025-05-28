import axiosInstanceuser from "../../Axios/UserAxios/axios";


export const fetchTechnicianbasedonavailableSlot=async( pincode:string,date:string,categoryId:string)=>{
    try {
        const response = await axiosInstanceuser.get(
          `/api/technicians/available?pincode=${pincode}&date=${date}&categoryId=${categoryId}`
        );
        return response.data.technicians;
      } catch (error: any) {
        const message = error?.response?.data?.message || "Something went wrong";
        throw new Error(message); // This is important
      }
}