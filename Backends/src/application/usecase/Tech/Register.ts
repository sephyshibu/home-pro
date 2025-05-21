import { TechRepository } from "../../../domain/repository/Techrepository";
import { ITech } from "../../../domain/models/Tech";
import bcrypt from 'bcryptjs'
import { WalletModel } from "../../../infrastructure/db/schemas/Walletmodel";
import { EmailService } from "../../service/EmailService";


export class Signuptech{
    constructor(private _techrepository:TechRepository, private _emailservice:EmailService){}


    async addtech(email:string, password:string, phone:string):Promise<{message:string}>{
        console.log(email,password,phone)

        const existtech=await this._techrepository.findByEmail(email)
        if(existtech){
            throw new Error("email already existed")
        }
        const hash=await bcrypt.hash(password,10)

        const tech:ITech={
            email,
            password:hash,
            phone,
            isBlocked:false,
            bookedSlots:[],
            role:"tech"
        }

       


        await this._techrepository.createtech(tech)

        // ✉️ Send welcome email
    const mailSent = await this._emailservice.sendEmail(email,password);
  
      if (!mailSent) {
        console.warn("Technician registered, but welcome email failed to send");
      }
  
        return {message:"tech account created successfully"}
        
       
    }
}