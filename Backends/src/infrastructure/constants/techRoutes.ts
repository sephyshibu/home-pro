export const TechRoutes={
    LOGIN:"/api/login",
    REFRESH:"/refresh",

    FETCHPROFILE:"/api/fetchtechprofile/:techId",
    UPDATEPROFILE:"/api/updatetech/:techId",

    FETCHCATEGORY:"/api/fetchcategories",
    FETCHTECHREQUEST:"/api/request/:techId",
    FETCHBOOKINGREQUEST:"/api/request/:bookingId",

    UPCOMING_EVENTS:"/api/upcmingevents/:techId",
    PASSWORD:"/api/password/:techId",
    REJECT_BOOKINGS:"/api/rejectbookings/:bookingId",
    REQUEST_SESSIONS:"/api/requestsession/:bookingId",

    FETCH_BOOKINGS:"/api/fetchbookings/:techId",
    FETCH_TRANSACTIONS:"/api/fetchtransactiondetails/:techId",

    GETSTATSTECH:"/api/tech/stats/:techId",
    FETCH_REVIEW:"/api/fetchreview/:techId"
}