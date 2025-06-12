import { Request,Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from "../../domain/enums/HttpStatusCode";

import { GetCategoryById } from '../../application/usecase/Category/GetCategory';


export class CategoryController{
    constructor(
           private _getcatbyId:GetCategoryById,
    ){}

    
    async fetchCategoryById(req: Request, res: Response) {
        try {
          const { catid } = req.params;
          const category = await this._getcatbyId.getcategorybyId(catid);
          res.status(HTTPStatusCode.OK).json({ category });
        } catch (err: any) {
          res.status(HTTPStatusCode.BAD_REQUEST).json({ message: err.message });
        }
      }
    
}