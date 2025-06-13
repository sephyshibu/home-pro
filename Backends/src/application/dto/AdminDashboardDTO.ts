export interface admindashboardbookingsdetailsDTO{
    _id:string,
    addressId:{
        _id:string,
        addressname:string
    },
    userId:{
        _id:string,
        name:string,
    },
    technicianId:{
        _id:string,
        name:string
    },
    admincommission:number,

    booked_date:string,
    rateperhour:number,
    consultationFee:string,
    consultationpayStatus:string,
    finalpaymentStatus:string,

    pincode:string,

    totalFinalAmount:string
}