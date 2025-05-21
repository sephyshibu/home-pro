import jwt from 'jsonwebtoken'
import { UserRepository } from '../../../domain/repository/Userrepository'
import { WalletModel } from '../../../infrastructure/db/schemas/Walletmodel'
import { IUser } from '../../../domain/models/User'

export class GoogleLogin{
    constructor(private _userRepository:UserRepository){}

    async GoogleLogin(email:string, sub:string,name:string):Promise<{user:any,token:string}>{
        console.log(email,sub,name)
        let user= await this._userRepository.findByEmail(email)
        console.log("google login", user)
        if(user){
            if(user.isBlocked){
                throw new Error("user is Blocjked by admin")
            }
        }
            else{
                const newuser:IUser={
                  
                    name,
                    email,
                    phone:"",
                    password:"",
                    isBlocked:false,
                    googleIds:sub
                }
                user=await this._userRepository.createUser(newuser)
                console.log("google user created",user)
                await WalletModel.create({
                    ownerId:user._id,
                    userType:"user"
                })
            }
            const token=jwt.sign({email:user.email}, process.env.JWT_SECRET!, { expiresIn: "15m" });
            return {user, token};


        }
    }
