import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice';
import blogReduces from './features/blog/blogSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        blogs: blogReduces
    }
});