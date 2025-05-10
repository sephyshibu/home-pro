import axiosInstancetech from "../../axios";


export const fetchtransactiondetails=async(techId:string)=>{
    try {
        const response=await axiosInstancetech.get(`/fetchtransactiondetails/${techId}`)
        console.log("fetching transaaction",response.data)
        return response.data
    }catch (error: any) {
        console.error("Error in fetch transaction:", error);
        throw new Error(
          error?.response?.data?.message || "Failed to fetch transaction"
        );
      }

}