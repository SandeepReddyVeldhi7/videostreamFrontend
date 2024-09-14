import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        authStatus: false,
    },
    reducers: {
        setUser: (state, action) => {
            if (!action.payload) {
                state.user = null;
                state.authStatus = false;
            } else {
                state.authStatus = true;
                state.user = action.payload;
            }
        },
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;