export const UserRoutes={
    SIGNUP:"/api/signup",
    LOGIN:"/api/login",
    REFRESH:"/refresh",
    GOOGLELOGIN:"/api/googlelogin",
    
    VERIFYOTP:"/api/verifyotp",
    RESENDOTP:"/api/resendotp",

    CHECKEMAIL:"/api/checkemail",
    CHANGEPASSWORD:"/api/chnagepasswords",
    FORGETPASSWORDVERIFYOTP:"/api/forgetpassverifyotp",
    FORGETRESENDOTP:"/api/forgetpassresendotp",

    FETCHCATEGORY:"/api/fetchcategory",
    FETCHUSER:"/api/fetchinguser/:userId",
    UPDATEUSER:"/api/updateuser/:userId",
    TECHAVAILABLE:"/api/technicians/available",
    FETCHPARTICULARCATEGORY:"/api/fetchparticularcategory/:catid",
    FETCHTECH:"/api/fetchtech/:techid",

    ADDADDRESS:"/api/addaddress/:userId",
    FETCHADDRESS:"/api/fetchaddress/:userId",
    EDITADDRESS:"/api/editaddress/:addressId",
    DELETEADDRESS:"/api/deleteaddress/:addressId",

    CREATEORDER:"/api/create-order/:userId",
    CONFIRMPAYMENT:"/api/confirm-payment",
    FETCHBOOKINGS:"/api/fetchbookings",
    PASSWORD:"/api/password/:userId",
    PAYMENTFAILED:"/api/payment-failed",
    CONFIRMPAYMENT_RETRY:"/api/confirm-payment-retry",
    UPDATECANCELREASON:"/api/updatecancelreason/:bookingId",

    FETCHWALLET:"/api/fetchwalletdetails/:userId",
    FETCHWALLETBALANCE:"/api/fetchwalletbalance/:userId",
    WALLETPAYMENT:"/api/walletpayment",

    ACCEPTSESSIONREQUEST:"/api/acceptsessionrequest/:bookingId",
    FETCHSESSIONS:"/api/fetchsessions/:bookingId",

    FINALPAYMENTPROCESS:"/api/finalpaymentprocess/:bookingId",
    FINALCONFIRMPAYMENT:"/api/finalconfirmpayemnts",

    FETCHTRANSACTIONS:"/api/fetchtransactionwithBookings/:transId",
    FETCHREVIEW:"/api/fetchreview/:techId",
    ADDREVIEW:"/api/addreview",

    PAYMENT_STATUS_CHECK:"/api/payment-status-check"




}