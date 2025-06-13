export interface TechProfileDTO{
  _id?:string
  name?:string,
  email:string,
  phone:string,
  serviceablepincode?:string[],
  rateperhour?:number,
  noofworks?:number,
  profileimgurl?:string,
  consulationFee?:number,
  categoryid?:{
    _id:string,
    name:string,
    description:string
  }
}