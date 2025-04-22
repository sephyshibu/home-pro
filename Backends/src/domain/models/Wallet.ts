export type UserType='user'|'technician'|'admin'

export interface IWallet{
    id:string,
    ownerId:string,
    userType:UserType,
    balance :number
}