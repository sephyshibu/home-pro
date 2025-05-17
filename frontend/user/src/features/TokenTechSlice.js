import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: ""
};
const TechtokenSlice = createSlice({
    name: 'techtoken',
    initialState,
    reducers: {
        addtechtoken(state, action) {
            state.token = action.payload.token;
        }
    }
});
export const { addtechtoken } = TechtokenSlice.actions;
export default TechtokenSlice.reducer;
