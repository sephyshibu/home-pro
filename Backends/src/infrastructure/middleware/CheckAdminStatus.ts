import { NextFunction, Request, Response } from "express";
import jwt,{TokenExpiredError} from 'jsonwebtoken'

interface CustomRequest extends Request{
    adminId?:string
}

export const authToken=async(req:Request,res:Response, next:NextFunction):Promise<void>=>{
        const authHeader=req.headers['authorization']
        const adminId=req.headers['admin-id'] as string;
        const token=authHeader && authHeader.split(' ')[1]

        if(!token){
            res.status(401).json({message:"Access Token required"})
            return
        }

        try {
            const decoded=jwt.verify(token, process.env.JWT_SECRET as string) as {adminId:string};
            (req as CustomRequest).adminId=decoded.adminId
            console.log("decoded",decoded)

            if(!adminId){
                console.log("sdsadafeqf")
                res.status(400).json({message:"Admin Id is required in header"})
                return
            }
            
            next()
        } catch (error: any) {
                if (error instanceof TokenExpiredError) {
                    res.status(401).json({ message: "Token expired" });  // Send 401 when token is expired
                    return;
                }
                if (error.message === "Admin is inactive") {
                    res.status(403).json({ message: "Admin is inactive. Please logout", action: "logout" });
                    return;
                }
                 console.error("Error in checkadmin middleware:", error);
                res.status(500).json({ message: "Internal Server Error" });
            
        }
}