import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    admin: {}
};
const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loginAdmin(state, action) {
            state.admin = action.payload;
        },
        logoutadmin(state) {
            state.admin = {};
        }
    }
});
export const { loginAdmin, logoutadmin } = adminSlice.actions;
export default adminSlice.reducer;
