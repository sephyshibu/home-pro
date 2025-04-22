import jwt from 'jsonwebtoken'
import { UserRepository } from '../../../domain/repository/Userrepository'
import { WalletModel } from '../../../infrastructure/db/schemas/Walletmodel'
import { IUser } from '../../../domain/models/User'

export class GoogleLogin{
    constructor(private userRepository:UserRepository){}

    async GoogleLogin(email:string, sub:string,name:string):Promise<{user:any,token:string}>{
        let user= await this.userRepository.findByEmail(email)

        if(user){
            if(user.isBlocked){
                throw new Error("user is Blocjked buy admin")
            }
        }
            else{
                const newuser:IUser={
                    _id:"",
                    name,
                    email,
                    phone:"",
                    password:"",
                    isBlocked:false,
                    googleIds:sub
                }
                user=await this.userRepository.createUser(newuser)
                await WalletModel.create({userId:user._id})
            }
            const token=jwt.sign({email:user.email}, process.env.JWT_SECRET!, { expiresIn: "15m" });
            return {user, token};


        }
    }
