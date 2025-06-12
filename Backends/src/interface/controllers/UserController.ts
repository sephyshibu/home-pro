import {Request,response,Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { HTTPStatusCode } from '../../domain/enums/HttpStatusCode';
import { userMessage } from '../../domain/shared/Usermessage/usermessage';

import { PasswordChange } from '../../application/usecase/User/Password/Changepassword';

export class UserController{
    constructor(
        private _passwordchnaging:PasswordChange
    ){}
       async passwordChanges(req:Request, res:Response):Promise<void>{
        try {
        
            const{userId}=req.params
            const{password,oldpassword}=req.body
            console.log(req.body)
            const result=await this._passwordchnaging.editpassword(userId, oldpassword,password)
            res.status(HTTPStatusCode.OK).json({message:result.message})
        } catch (err: any) {
             if (err.message === userMessage.OLD_PASSWORD_INCORRECT) {
                res.status(HTTPStatusCode.NOT_FOUND).json({ message: userMessage.OLD_PASSWORD_INCORRECT });
              }
              else{
                    res.status(HTTPStatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message });
              }
            
            
        }
    }
}