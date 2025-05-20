import { createSlice,type  PayloadAction} from "@reduxjs/toolkit";

interface AdminState{
    admin:Record<string,any>
}

const initialState:AdminState={
    admin:{}
}

const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        loginAdmin(state,action:PayloadAction<Record<string,any>>){
            state.admin=action.payload
        },
        logoutadmin(state){
            state.admin={}
        },
        cleanAdmin(state) {
            state.admin = {};
        },
    }
})

export const{loginAdmin, logoutadmin,cleanAdmin}=adminSlice.actions
export default adminSlice.reducer