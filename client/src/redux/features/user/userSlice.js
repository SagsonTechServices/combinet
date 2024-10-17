import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// async action to login user 
export const loginUser = createAsyncThunk('user/loginUser' , async (loginData) => {
        const response = await axios.post(`${backendURL}/api/auth/login`, loginData);
        return response.data;
});

// creating the slice 
const userSlice = createSlice({
    name: 'user',
    initialState: {user: null, loading: false, error: null},
    reducers: {
        setUserFromStorage: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload);
            state.loading = false,
            state.user = action.payload.token;
            localStorage.setItem('user', JSON.stringify(action.payload.token));
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false,
            state.error = action.error.message;
        })
    }
});

// export the slice reducer 
export const {setUserFromStorage, logoutUser} = userSlice.actions;
export default userSlice.reducer;