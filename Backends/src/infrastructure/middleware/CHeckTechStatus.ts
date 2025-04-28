import { Request, Response, NextFunction } from "express"; 
import { ChecktechStatus } from "../../application/usecase/Tech/CheckTechStatus";
import { UserRepositoryImpl } from "../repository/UserRepositoryImpl";
import jwt ,{TokenExpiredError} from 'jsonwebtoken';
import { TechRepository } from "../../domain/repository/Techrepository";
import { TechRepositoryImpl } from "../repository/TechRepositoryImpl";
const techrepository: TechRepository = new TechRepositoryImpl();
const checkuserstatuss = new ChecktechStatus(techrepository);

interface CustomRequest extends Request {
    userId?: string;
}

// 👉 Export properly with correct types
export const authToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const techId = req.headers['tech-id'] as string;
  const token = authHeader && authHeader.split(' ')[1];
    console.log(techId)
  if (!token) {
      res.status(401).json({ message: 'Access token required' });
      return;
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { techId: string };
      (req as CustomRequest).userId = decoded.techId; 

      if (!techId) {
          res.status(400).json({ message: "User ID is required in headers" });
          return;
      }

      await checkuserstatuss.checkstatus(techId);

      next();
  } catch (error: any) {
    if (error.message === "User is inactive") {
        res.status(403).json({ message: "User is inactive. Please logout", action: "logout" });
        return;
    }
    if (error.message === "tech not found") {
        res.status(404).json({ message: "User not found" });
        return;
    }
    if (error.message === "tech is Blocked") {
        res.status(403).json({ message: "User is blocked by admin", action: "blocked" });
        return;
    }
    console.error("Error in checkUserStatus middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
}

};