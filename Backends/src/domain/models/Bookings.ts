// entities/Booking.ts
export interface WorkTime {
    start: Date;
    end: Date;
  }
  
  export interface Location {
    lat: number;
    lng: number;
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
    isStartAccept?:boolean,
    isEndAccept?:boolean,
    isPauseAccept?:boolean,
    isconfirmedbyTech?:'pending' | 'accepted' | 'rejected',
    techremark?:string,
    userremark?:string,
    pincode?:string,
    consultationFee: number;
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
    createdAt?: Date;
  }
  