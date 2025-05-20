import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface UserState{
    user:Record<string,any>
}

const initialState:UserState={
    user:{}
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginuser(state, action: PayloadAction<Record<string,any>>){
            state.user=action.payload

        },
        updateuser(state, action: PayloadAction<Record<string,any>>){
            state.user = action.payload;
          },
        logoutuser(state){
            state.user = {};
          },
          cleanUser(state) {
            state.user = {};
        },
    
    }
})
export const { loginuser, logoutuser, updateuser,cleanUser } = userSlice.actions;
export default userSlice.reducer;