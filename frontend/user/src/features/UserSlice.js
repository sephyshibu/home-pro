import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {}
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginuser(state, action) {
            state.user = action.payload;
        },
        updateuser(state, action) {
            state.user = action.payload;
        },
        logoutuser(state) {
            state.user = {};
        },
    }
});
export const { loginuser, logoutuser, updateuser } = userSlice.actions;
export default userSlice.reducer;
