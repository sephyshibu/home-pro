import axiosInstanceuser from "../../axios";

export const addaddress=async(userId:string,addressdata:any)=>{
    try {
        const response=await axiosInstanceuser.post(`/addaddress/${userId}`,addressdata)
        return response.data
    }catch (error: any) {
            console.error("Error adding address:", error);
            throw new Error(
              error?.response?.data?.message || "Failed to add address"
            );
    }
    }

