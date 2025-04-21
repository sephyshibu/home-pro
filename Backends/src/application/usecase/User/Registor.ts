import { UserRepository } from "../../../domain/repository/Userrepository";
import { IUser } from "../../../domain/models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()

export class Signup{
    constructor(private userRepository:UserRepository){}

    async adduser(name:string,email:string,password:string,phone:string):Promise<{token:string}>{
        const existinguser=await this.userRepository.findByEmail(email);
        if(existinguser){
            throw new Error("email already exists")
        }
        const hashpassword=await bcrypt.hash(password,10)
        const newuser:IUser={
            _id:"",
            name, 
            email,
            phone,
            password:hashpassword,
            isBlocked:false

        }
        const createdUser=await this.userRepository.createUser(newuser)

        if (!process.env.JWTSECRET) {
            throw new Error("JWT secret is not defined in the environment variables.");
        }


        const token=jwt.sign({id:createdUser._id},process.env.JWTSECRET,{expiresIn:'1d'})
        return {token}
    }



}