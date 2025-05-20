import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface AdmintokenState{
    token:string
}

const initialState:AdmintokenState={
    token:''
}

const AdmintokenSlice=createSlice({
    name:'admintoken',
    initialState,
    reducers:{
        addadmintoken(state,action:PayloadAction<{token:string}>){
            state.token=action.payload.token
        },
        cleartoken: (state) => {
            state.token = '';
        },
    }
})

export const {addadmintoken,cleartoken}=AdmintokenSlice.actions;
export default AdmintokenSlice.reducer;