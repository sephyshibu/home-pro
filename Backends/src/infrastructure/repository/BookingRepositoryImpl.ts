import { IBookingRepository } from "../../domain/repository/Bookingrepository";
import { IBooking } from "../../domain/models/Bookings";
import {BookingModels} from '../db/schemas/BookingModel';
import { TechModel } from "../db/schemas/techModel";
import { AddressModel } from "../db/schemas/AddressModel";
import { IUser } from "../../domain/models/User";
import mongoose from "mongoose";

interface TechDashboardSummary {
  totalOrders: number;
  totalSales: number;

}
export class bookingrepositoryImpl implements IBookingRepository{
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

    async findBookingByUserTechDate(userId: string, technicianId: string, bookedDate: string): Promise<IBooking | null> {
      const existing = await BookingModels.findOne({
        userId,
        technicianId,
        booked_date: bookedDate,
      });

      return existing ? {
        id: existing._id.toString(),
        userId: existing.userId.toString(),
        technicianId: existing.technicianId.toString(),
        addressId: existing.addressId.toString(),
        location: existing.location,
        booked_date: existing.booked_date,
        consultationpayStatus: existing.consultationpayStatus,
        consultationFee: existing.consultationFee,
        razorpayPaymentId: existing.razorpayPaymentId,
        consultationtransactionId: existing.consultationtransactionId,
        rateperhour: existing.rateperhour,
        workstatus: existing.workstatus,
        totalhours: existing.totalhours,
        isStartAccept: existing.isStartAccept,
        isEndAccept: existing.isEndAccept,
        isPauseAccept: existing.isPauseAccept,
        isconfirmedbyTech: existing.isconfirmedbyTech,
        techremark: existing.techremark,
        userremark: existing.userremark,
        pincode: existing.pincode,
        workTime: existing.workTime,
        workFinalAmount: existing.workFinalAmount,
        totalFinalAmount: existing.totalFinalAmount,
        admincommision: existing.admincommision,
        techcommision: existing.techcommision,
        consultationpaymethod: existing.consultationpaymethod,
        finalpayStatus: existing.finalpayStatus,
        finalpaymethod: existing.finalpaymethod,
        razorpayFinalPaymentId: existing.razorpayFinalPaymentId,
        finalpaymenttransactionId: existing.finalpaymenttransactionId,
        refundrequestAccept: existing.refundrequestAccept,
      } : null;
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

      async fetchbookingByUserId(userId:string,limit:number,skip:number):Promise<IBooking[]>{
        console.log("dfde",userId,limit,skip)
        const bookings=await BookingModels.find({userId})
                        .sort({_id:-1})
                        .skip(skip)
                        .limit(limit)
                        .populate({
                            path:"technicianId",
                            select:"_id name profileimgurl categoryid phone",
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

      async countBookingsByUserId(userId: string): Promise<number> {
      return await BookingModels.countDocuments({ userId });
    }
    async countBookingBytechId(techId: string): Promise<number> {
        const count=await BookingModels.countDocuments({
          technicianId:techId,
          userremark:"",
          techremark:"",
          consultationpayStatus:"completed",
          isconfirmedbyTech:"accepted"
        }).exec()

        return count
    }

    async totalSales(techId: string): Promise<TechDashboardSummary> {
        const result=await BookingModels.aggregate([
          {$match:{
              technicianId:new mongoose.Types.ObjectId(techId),
              finalpayStatus:"completed"
          }
        },
        {$group:{
            _id:null,
            totalOrders:{$sum:1},
            totalSales:{$sum:"$techcommision"}
          }
        },
        {$project:{
          _id:0,
          totalOrders:1,
          totalSales:1

        }}

        ])

        if(result.length===0){
          return {totalOrders:0, totalSales:0}
        }

        return result[0] as TechDashboardSummary

    }

      async fetchbookingByTechId(techId:string):Promise<IBooking[]|null>{
        const bookings =await BookingModels.find({technicianId:techId,userremark:"",isconfirmedbyTech:"pending",consultationpayStatus:"completed"})
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
          const bookings=await BookingModels.find(
                          {technicianId:techId,
                            isconfirmedbyTech:"accepted",
                            finalpayStatus:{$ne:"completed"},
                          })
                          .sort({date:1})
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
            sessionRequests:booking.sessionRequests,
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

      async findByIdWithPopulates(id: string): Promise<IBooking | null> {
        return await BookingModels.findById(id)
          .populate('userId', 'name')
          .populate('technicianId', 'name')
          .populate('addressId', 'addressname')
          .lean<IBooking>();
      }

      async fetchBookingswithremark(): Promise<IBooking[]> {
        return await BookingModels.find({
          $or: [
            { userremark: { $exists: true, $ne: "" } },
            { techremark: { $exists: true, $ne: "" } }
          ]
        })
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
      }

  async addsessionRequest(bookingId: string, types: string): Promise<IBooking | null> {
    const validTypes = ["start", "pause", "end", "resume"];

    // Validate the type of session request
    if (!validTypes.includes(types)) {
      throw new Error("Invalid type for session request");
    }

    try {
      // Find the booking by ID
      const booking = await BookingModels.findById(bookingId);

      if (!booking) {
        throw new Error("Booking not found");
      }

      // Add the session request to the booking's sessionRequests array
      booking.sessionRequests?.push({
        types:types as "start" | "pause" | "end" | "resume",           
        status: "pending",  
        requestedAt: new Date(),  
        responseAt: null, 
        reason: null,     
      });

      // Save the updated booking document with the new session request
      await booking.save();

      return booking;  // Return the updated booking object
    } catch (error:any) {
      console.error("Error adding session request:", error);
      throw new Error("Error adding session request: " + error.message);
    }
  
  }

  async acceptsession(bookingId: string, requestId: string): Promise<IBooking | null> {
      const booking=await BookingModels.findById(bookingId)
      if(!booking) return null
      

      const sessionrequest=booking.sessionRequests?.find((req)=>req._id!.toString()===requestId)
      console.log("session request accept",sessionrequest)
      if(!sessionrequest) return null

      sessionrequest.status='accepted'
      
      sessionrequest.responseAt=new Date()

      switch (sessionrequest.types){
        case 'start':
          booking.workTime?.push({start:new Date()})
          booking.workstatus="progress"
          booking.isStartAccept=true
          break;

        case 'pause':
          if (!booking.workTime) booking.workTime = [];
          const lastpause=booking.workTime[booking.workTime?.length-1]
          if(lastpause && !lastpause.end) lastpause.end=new Date()
            booking.workstatus="paused"
          booking.isPauseAccept = true;
          booking.isResumeAccept = false; // ✅ Set to false on pause
          break;

        case "resume":
          booking.workTime?.push({ start: new Date() });
          booking.workstatus="resume"
          booking.isResumeAccept=true
          booking.isPauseAccept=false
          break;

        case "end":
          if (!booking.workTime) booking.workTime = [];
          const lastEnd = booking.workTime[booking.workTime.length - 1];
          if (lastEnd && !lastEnd.end) lastEnd.end = new Date();
          booking.workstatus="completed"
          booking.isEndAccept=true
          break;

        
      }
      await booking.save()
      return booking
  }
  async fetchcompletedandrejected(techId:string):Promise<IBooking[]|null>{
    const bookings =await BookingModels.find({
                  technicianId:techId,
                  $or:[
                    {workstatus:"completed"},
                    {$or:[
                      {userremark:{$ne:""}},
                      {techremark:{$ne:""}}
                    ]}
                  ]
                })
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
  async findbookingIdreturnIUser(id: string): Promise<IUser | null> {
     try {
       const booking=await BookingModels.findById(id).populate('userId')
       if (!booking || !booking.userId) {
        return null; // If no booking found or no user associated, return null
      }
  
      // Return the populated user
      return booking.userId as IUser;
    } catch (error) {
      console.log("Error fetching booking:", error);
      throw new Error('Failed to fetch booking user');
    }
  }

  

 
      
    
}
