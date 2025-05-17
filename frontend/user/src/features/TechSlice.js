import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    tech: {}
};
const techSlice = createSlice({
    name: "tech",
    initialState,
    reducers: {
        logintech(state, action) {
            state.tech = action.payload;
        },
        updatetech(state, action) {
            state.tech = action.payload;
        },
        logouttech(state) {
            state.tech = {};
        },
    }
});
export const { logintech, logouttech, updatetech } = techSlice.actions;
export default techSlice.reducer;
