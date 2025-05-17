import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface AdmintokenState{
    token:string
}

const initialState:AdmintokenState={
    token:""
}

const AdmintokenSlice=createSlice({
    name:"admintoken",
    initialState,
    reducers:{
        addadmintoken(state,action:PayloadAction<{token:string}>){
            state.token=action.payload.token
        }
    }
})

export const {addadmintoken}=AdmintokenSlice.actions
export default AdmintokenSlice.reducer;