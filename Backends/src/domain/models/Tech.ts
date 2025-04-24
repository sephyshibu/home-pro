export interface ITech{
    _id?:Object,
    name?:string,
    email:string,
    phone:string,
    password:string,
    isBlocked:boolean,
    serviceablepincode?:string[],
    categoryid?:Object,
    noofworks?:number,
    profileimgurl?:string,
    workphotos?:string[],
    rateperhour?:number,
    consulationFee?:number,
    isAvailable?:boolean



}