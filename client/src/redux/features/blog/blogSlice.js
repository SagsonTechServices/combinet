import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchBlogsByUserId = createAsyncThunk('blog/fetchBlogsByUserId', async (user_id) => {
    const response = await axios.get(`${backendURL}/api/blog/get-by-user/${user_id}`);
    return response.data;
})

const blogSlice = createSlice({
    name: 'blogs',
    initialState: {blogs: null, loading: false, error: null},
    extraReducers: (builder) => {
        builder.addCase(fetchBlogsByUserId.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchBlogsByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
        })
        .addCase(fetchBlogsByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export default blogSlice.reducer;