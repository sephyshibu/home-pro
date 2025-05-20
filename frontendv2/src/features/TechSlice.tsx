import { createSlice,type PayloadAction } from "@reduxjs/toolkit";


interface TechState{
    tech:Record<string,any>
}

const initialState:TechState={
    tech:{}
}

const techSlice=createSlice({
    name:"tech",
    initialState,
    reducers:{
        logintech(state, action: PayloadAction<Record<string,any>>){
            state.tech=action.payload

        },
        updatetech(state, action: PayloadAction<Record<string,any>>){
            state.tech = action.payload;
          },
        logouttech(state){
            state.tech = {};
          },
          cleanTech(state) {
            state.tech = {};
        },
    }
})
export const { logintech, logouttech, updatetech,cleanTech } = techSlice.actions;
export default techSlice.reducer;