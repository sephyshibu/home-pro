// entities/Booking.ts
export interface WorkTime {
    start: Date;
    end?: Date;
  }
  
  export interface Location {
    lat: number;
    lng: number;
  }

  export interface SessionRequest {
    _id?:string,
    types: 'start' | 'pause' | 'resume' | 'end';
    status: 'pending' | 'accepted' | 'rejected';
    requestedAt: Date;
    responseAt?: Date|null;
    reason?: string|null; // Optional rejection reason
  }
  
  export interface IBooking {
    id?: Object;
    userId: Object;
    technicianId: Object;
    addressId: Object;
    location: Location;
    booked_date: string;
    rateperhour?:number,
    workstatus?:'pending' | 'progress' | 'paused' | "completed",
    totalhours?:number,
    isStartAccept?:boolean|null,
    isEndAccept?:boolean|null,
    isPauseAccept?:boolean|null,
    isconfirmedbyTech?:'pending' | 'accepted' | 'rejected',
    techremark?:string,
    userremark?:string,
    pincode?:string,
    consultationFee: number;
    sessionRequests?: SessionRequest[]; // ✅ Add this
    workTime?: WorkTime[];
    workFinalAmount?: number;
    totalFinalAmount?: number;//(consultationFee+workfinalamount)
    admincommision?:number,
    techcommision?:number,
    consultationpaymethod?:'RazorPay' | 'Wallet',
    finalpaymethod?:'RazorPay' | 'Wallet',
    finalpayStatus?:'pending' | 'completed' | 'failed'
    consultationpayStatus?: 'pending' | 'completed' | 'failed';
    razorpayPaymentId?: string;
    razorpayFinalPaymentId?:string,
    consultationtransactionId?:string, 
    finalpaymenttransactionId?:string,
    refundrequestAccept?:boolean
    createdAt?: Date;
  }
  