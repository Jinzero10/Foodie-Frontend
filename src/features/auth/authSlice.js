import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("accessToken")
        ? JSON.parse(localStorage.getItem("accessToken"))
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload;

            state.token = accessToken;
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
        },
        logOut: (state, action) => {
            state.token = null;
            localStorage.removeItem("accessToken");
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
// localStorage.setItem("userInfo", JSON.stringify(action.payload));
export const selectCurrentToken = (state) => state.auth.token;
