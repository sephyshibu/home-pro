import axiosInstanceuser from "../../../Axios/UserAxios/axios";

export const addreview=async(userId:string,techId:string,description:string, points:number)=>{
    try {
        const response=await axiosInstanceuser.post(`/api/addreview`,{userId,techId,description,points})
        return response.data.message
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      throw new Error(message); // This is important
    }
}