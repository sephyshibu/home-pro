import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: ""
};
const tokenSlice = createSlice({
    name: 'usertoken',
    initialState,
    reducers: {
        addtoken(state, action) {
            state.token = action.payload.token;
        }
    }
});
export const { addtoken } = tokenSlice.actions;
export default tokenSlice.reducer;
