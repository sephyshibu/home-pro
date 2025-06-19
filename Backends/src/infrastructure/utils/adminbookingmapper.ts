import { admindashboardbookingsdetailsDTO } from "../../application/dto/AdminDashboardDTO";

export function adminbookingmapper(booking:any):admindashboardbookingsdetailsDTO{
    return{
    _id:booking._id.toString(),
    addressId:{
        _id:booking.addressId.id.toString(),
        addressname:booking.addressId.addressname
    },
    userId:{
        _id:booking.userId._id.toString(),
        name:booking.userId.name
    },
    technicianId:{
        _id:booking.technicianId._id.toString(),
        name:booking.technicianId.name
    },
    admincommission:booking.admincommision,

    booked_date:booking.booked_date,
    rateperhour:booking.rateperhour,
    consultationFee:booking.consulationFee,
    consultationpayStatus:booking.consultationpaymentStatus,
    finalpaymentStatus:booking.finalpaymentStatus,

    pincode:booking.pincode,
    totalFinalAmount:booking.totalFinalAmount
    }
}