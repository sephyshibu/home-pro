export interface IUser{
    _id:Object,
    name:string,
    email:string,
    password?:string,
    phone?:string,
    googleIds?:string|null,
    isBlocked:boolean,
    googleVerified?:boolean

}