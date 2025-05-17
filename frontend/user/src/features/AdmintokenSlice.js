import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: ""
};
const AdmintokenSlice = createSlice({
    name: "admintoken",
    initialState,
    reducers: {
        addadmintoken(state, action) {
            state.token = action.payload.token;
        }
    }
});
export const { addadmintoken } = AdmintokenSlice.actions;
export default AdmintokenSlice.reducer;
