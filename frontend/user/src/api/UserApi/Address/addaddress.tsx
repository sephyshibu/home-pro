import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const addaddress=async(userId:string,addressdata:any)=>{
    try {
        const response=await axiosInstanceuser.post(`/addaddress/${userId}`,addressdata)
        return response.data
    }catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      throw new Error(message); // This is important
    }
    }

