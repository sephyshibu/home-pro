import { Request,Response } from "express";
import {Signuptech} from '../../application/usecase/Tech/Register'

// export class techController{
//     constructor(
//         private signuptech:Signuptech
//     ){}

//     async signup(req:Request,res:Response):Promise<void>{
//         console.log("signup tech")

//         try {
//             const{email,password, phone}=req.body
//             const result=await this.signuptech.addtech(email,password,phone)
//             res.status(200).json(result)
//         } 
//         catch (err:any) {
//             res.status(400).json({ message: err.message });
//           }
//     }

// }
