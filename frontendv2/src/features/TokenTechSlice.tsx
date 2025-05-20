import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TechtokenState{
    token:string
}

const initialState:TechtokenState={
    token:''
}

const TechtokenSlice=createSlice({
    name:'techtoken',
    initialState,
    reducers:{
        addtechtoken(state,action:PayloadAction<{token:string}>){
                state.token=action.payload.token
        },
        cleartoken: (state) => {
            state.token = '';
        },
    }

})

export const { addtechtoken,cleartoken } = TechtokenSlice.actions;
export default TechtokenSlice.reducer;