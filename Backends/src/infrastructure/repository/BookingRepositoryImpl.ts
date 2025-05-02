import { BookingRepository } from "../../domain/repository/Bookingrepository";
import { IBooking } from "../../domain/models/Bookings";
import {BookingModels} from '../db/schemas/BookingModel';
import { TechModel } from "../db/schemas/techModel";
import { AddressModel } from "../db/schemas/AddressModel";
export class bookingrepositoryImpl implements BookingRepository{
    async creates(booking: Omit<IBooking, "id">): Promise<IBooking> {
        console.log("impl", booking)
        try{
        const technician=await TechModel.findById(booking.technicianId)
        if(!technician) throw new Error("tevh not found")

        const address = await AddressModel.findById(booking.addressId);
        if (!address) throw new Error("Address not found");

        const bookingDataWithDefaults = {
            ...booking,
            rateperhour: technician.rateperhour || 0,
            pincode: address.pincode || "000000", // default fallback if missing
          };
        console.log("booking details before bookmodel create", bookingDataWithDefaults)
        const saved = await BookingModels.create(bookingDataWithDefaults);
        console.log(saved)
        // const saved = await newBooking.save();
        return {
          id: saved._id.toString(),
          userId: saved.userId.toString(),
          technicianId: saved.technicianId?.toString(),
          addressId:saved.addressId?.toString(),
          location:saved.location,
          booked_date:saved.booked_date,
          rateperhour:saved.rateperhour,
          workstatus:saved.workstatus,
          totalhours:saved.totalhours,
          isStartAccept:saved.isStartAccept,
          isEndAccept:saved.isEndAccept,
          isPauseAccept:saved.isPauseAccept,
          isconfirmedbyTech:saved.isconfirmedbyTech,
          techremark:saved.techremark,
          userremark:saved.userremark,
          pincode:saved.pincode,
          workTime:saved.workTime,
          workFinalAmount:saved.workFinalAmount,
          totalFinalAmount:saved.totalFinalAmount,
          consultationFee: saved.consultationFee,
          razorpayPaymentId: saved.razorpayPaymentId,
          finalpayStatus: saved.finalpayStatus,
          finalpaymenttransactionId: saved.finalpaymenttransactionId,
          admincommision: saved.admincommision,
          techcommision:saved.techcommision,
          consultationpaymethod:saved.consultationpaymethod,
          finalpaymethod:saved.finalpaymethod,
          consultationpayStatus:saved.consultationpayStatus,
          razorpayFinalPaymentId:saved.razorpayFinalPaymentId,
          consultationtransactionId:saved.consultationtransactionId,
          

        };
        
    }
    catch (error) {
        console.error("❌ Booking creation failed:", error);
        throw error; // re-throw so service layer can handle
      }
      }
      async update(id: string, updateData: Partial<IBooking>): Promise<IBooking> {
        const updated = await BookingModels.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (!updated) throw new Error("Booking not found");
        return {
            id: updated._id.toString(),
            userId: updated.userId.toString(),
            technicianId: updated.technicianId?.toString(),
            addressId:updated.addressId?.toString(),
            location:updated.location,
            booked_date:updated.booked_date,
            rateperhour:updated.rateperhour,
            workstatus:updated.workstatus,
            totalhours:updated.totalhours,
            isStartAccept:updated.isStartAccept,
            isEndAccept:updated.isEndAccept,
            isPauseAccept:updated.isPauseAccept,
            isconfirmedbyTech:updated.isconfirmedbyTech,
            techremark:updated.techremark,
            userremark:updated.userremark,
            pincode:updated.pincode,
            workTime:updated.workTime,
            workFinalAmount:updated.workFinalAmount,
            totalFinalAmount:updated.totalFinalAmount,
            consultationFee: updated.consultationFee,
            razorpayPaymentId: updated.razorpayPaymentId,
            finalpayStatus: updated.finalpayStatus,
            finalpaymenttransactionId: updated.finalpaymenttransactionId,
            admincommision: updated.admincommision,
            techcommision:updated.techcommision,
            consultationpaymethod:updated.consultationpaymethod,
            finalpaymethod:updated.finalpaymethod,
            consultationpayStatus:updated.consultationpayStatus,
            razorpayFinalPaymentId:updated.razorpayFinalPaymentId,
            consultationtransactionId:updated.consultationtransactionId,
        };
      }

      async fetchbookingByUserId(userId:string):Promise<IBooking[]>{
        const bookings=await BookingModels.find({userId})
                        .populate({
                            path:"technicianId",
                            select:"name profileimgurl categoryid phone",
                            populate:{
                                path:"categoryid",
                                select:"name"
                            }
                        })
                        .populate({
                            path:"addressId",
                            select:"addressname"
                        })
                        .exec()
        console.log("bookings",bookings)
        return bookings
      }

      async fetchbookingByTechId(techId:string):Promise<IBooking[]|null>{
        const bookings =await BookingModels.find({technicianId:techId,isconfirmedbyTech:"pending",consultationpayStatus:"completed"})
                        .populate({
                          path:"userId",
                          select:"name phone"
                        })
                        .populate({
                          path:"technicianId",
                          select:"phone categoryid",
                          populate:{
                            path:"categoryid",
                            select:"name"
                          }
                        })
                        .populate({
                          path:"addressId",
                          select:"addressname"
                        })
                        .exec()
        if(!bookings){
          return null
        }
        else{
          console.log("fetch techId",bookings)
          return bookings
        }

      }

      async fetchupcomingevents(techId: string): Promise<IBooking[] | null> {
          const bookings=await BookingModels.find({technicianId:techId,isconfirmedbyTech:"accepted",workstatus:{$ne:"completed"}})
                          .populate({
                            path:"userId",
                            select:"name phone"
                          })             
                          .populate({
                          path:"technicianId",
                          select:"name profileimgurl categoryid phone",
                          populate:{
                              path:"categoryid",
                              select:"name"
                          }
                      })
                      .populate({
                          path:"addressId",
                          select:"addressname"
                      })
                      .exec()
                      if(!bookings){
                        return null
                      }
                      else{
                        console.log("fetch upcoming evnets",bookings)
                        return bookings
                      }
      }
      async createFailedPaymentBooking(data: IBooking): Promise<IBooking> {
        const booking = new BookingModels(data);
        return await booking.save();
      }

      async findById(id: string): Promise<IBooking | null> {
        try {
          const booking = await BookingModels.findById(id);
          if (!booking) return null;
    
          return {
            id: booking._id.toString(),
            userId: booking.userId.toString(),
            technicianId: booking.technicianId?.toString(),
            addressId: booking.addressId?.toString(),
            location: booking.location,
            booked_date: booking.booked_date,
            rateperhour: booking.rateperhour,
            workstatus: booking.workstatus,
            totalhours: booking.totalhours,
            isStartAccept: booking.isStartAccept,
            isEndAccept: booking.isEndAccept,
            isPauseAccept: booking.isPauseAccept,
            isconfirmedbyTech: booking.isconfirmedbyTech,
            techremark: booking.techremark,
            userremark: booking.userremark,
            pincode: booking.pincode,
            workTime: booking.workTime,
            workFinalAmount: booking.workFinalAmount,
            totalFinalAmount: booking.totalFinalAmount,
            consultationFee: booking.consultationFee,
            razorpayPaymentId: booking.razorpayPaymentId,
            finalpayStatus: booking.finalpayStatus,
            finalpaymenttransactionId: booking.finalpaymenttransactionId,
            admincommision: booking.admincommision,
            techcommision: booking.techcommision,
            consultationpaymethod: booking.consultationpaymethod,
            finalpaymethod: booking.finalpaymethod,
            consultationpayStatus: booking.consultationpayStatus,
            razorpayFinalPaymentId: booking.razorpayFinalPaymentId,
            consultationtransactionId: booking.consultationtransactionId,
          };
        } catch (error) {
          console.error("❌ Error finding booking by ID:", error);
          throw error;
        }
      }
    
}
