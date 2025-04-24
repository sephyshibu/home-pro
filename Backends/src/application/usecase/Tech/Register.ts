import { TechRepository } from "../../../domain/repository/Techrepository";
import { ITech } from "../../../domain/models/Tech";
import bcrypt from 'bcryptjs'


export class Signuptech{
    constructor(private techrepository:TechRepository){}


    async addtech(email:string, password:string, phone:string):Promise<{message:string}>{
        console.log(email,password,phone)

        const existtech=await this.techrepository.findByEmail(email)
        if(existtech){
            throw new Error("email already existed")
        }
        const hash=await bcrypt.hash(password,10)

        const tech:ITech={
            email,
            password:hash,
            phone,
            isBlocked:false
        }

        await this.techrepository.createtech(tech)
        return {message:"tech account created successfully"}
        
       
    }
}