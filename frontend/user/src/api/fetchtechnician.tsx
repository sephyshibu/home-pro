import axiosInstanceuser from "../axios";


export const fetchTechnicianbasedonavailableSlot=async( pincode:string,date:string,categoryId:string)=>{
    try {
        const response = await axiosInstanceuser.get(
          `/technicians/available?pincode=${pincode}&date=${date}&categoryId=${categoryId}`
        );
        return response.data.technicians;
      } catch (error: any) {
        console.error("Error fetching available technicians:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch technicians"
        );
      }
}