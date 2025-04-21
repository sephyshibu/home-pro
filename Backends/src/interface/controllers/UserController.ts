import {Request,Response} from 'express'
import { Signup } from '../../application/usecase/User/Registor'
import { UserRepository } from '../../domain/repository/Userrepository'

export class UserController{
    constructor(
        private signupuser:Signup
    ){}

    async signup(req:Request, res:Response):Promise<void>{
        try{
            const{name, email, password,phone}=req.body;
            const result=await this.signupuser.adduser(name,email,password,phone);
            res.status(201).json(result)
        }
        catch (err:any) {
            res.status(400).json({ message: err.message });
          }
    }
}