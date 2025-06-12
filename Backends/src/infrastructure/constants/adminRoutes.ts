export const AdminRoutes={
    LOGIN:"/api/login",
    REFRESH:'/refresh',

    FETCH_USER:'/api/fetchuser',
    ADD_TECH:'/api/addtech',
    BLOCK_UNBLOCK_USER:'/api/user/:userid',

    FETCH_TECH:'/api/fetchtech',
    BLOCK_UNBLOCK_TECH:'/api/tech/:techid',

    FETCH_CATEGORY:'/api/fetchcategory',
    ADD_CATEGORY:'/api/addcategory',
    BLOCK_UNBLOACK_CATEGORY:'/api/category/:catid',
    EDIT_CATEGORY:'/api/editcategory/:catid',
    FETCH_PARTICULAR_CATEGORY:'/api/category/:catid',

    FETCH_TRANSACTIONS:'/api/fetchtransactions',
    FETCH_TRANSACTION_WITH_BOOKING:'/api/fetchtransactionwithBookings/:transId',

    FETCH_REFUND_REQUEST_ALL:'/api/fetchrefundreqall',
    ACCEPT_REFUND:'/api/acceptrefund/:bookingId',

    SEARCH_USER:'/api/searchuser/:searchterm',
    SEARCH_TECH:'/api/searchtech/:searchterm',
    SEARCH_CATEGORY:'/api/searchcategory/:searchterm',
    SEARCH_BOOKing:'/api/searchbooking/:searchterm',

    DASHBOARD:'/api/admindashboard'


}