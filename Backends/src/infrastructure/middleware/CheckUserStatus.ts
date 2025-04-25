import { Request as ExpressRequest,Response,NextFunction} from "express";
import { CheckUserStatus } from "../../application/usecase/User/CheckuserStatus";
import { UserRepositoryImpl } from "../repository/UserRepositoryImpl";
import jwt from 'jsonwebtoken'
import { UserRepository } from "../../domain/repository/Userrepository";

const userrepository:UserRepository= new UserRepositoryImpl()
const checkuserstatuss= new CheckUserStatus(userrepository)

interface CustomRequest extends ExpressRequest {
    userId?: string;
  }
export const authToken=async(req:CustomRequest,res:Response,next:NextFunction)=>{
    const authHeader=req.headers['authorization'];
    const userId =req.headers['user-id'] as string
    const token= authHeader && authHeader.split(' ')[1]   
    
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
      }
    
    try {
       const decoded=jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
       req.userId=decoded.userId

        if(!userId){
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        await checkuserstatuss.checkstatus(userId)

        next()
    }catch (error: any) {
        if (error.message === "User is inactive") {
          return res.status(403).json({ message: "User is inactive. Please logout", action: "logout" });
        }
        if (error.message === "User not found") {
          return res.status(404).json({ message: "User not found" });
        }
    
        console.error("Error in checkUserStatus middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }

}