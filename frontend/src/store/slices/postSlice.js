import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (email, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/posts/getposts/${email}`, { withCredentials: true });
        
        if (response.data.error === "Posts not found") {
            return rejectWithValue('No posts available.');
        }

        return response.data;
    } catch (exception) {
        if (exception.response && exception.response.data) {
            return rejectWithValue(exception.response.data);
        } else {
            return rejectWithValue('An error occurred while fetching posts.');
        }
    }
});

export const createPost = createAsyncThunk('posts/createpost', async (content) => {
    try {
        const response = await axios.post('/api/posts/createpost', content, { withCredentials: true }, config);
        return response.data;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
});

export const editPost = createAsyncThunk('posts/editPost', async ({ id, content }) => {
    try {
        const response = await axios.put(`/api/posts/${id}`, { content }, { withCredentials: true }, config);
        return response.data;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    try {
        await axios.delete(`/api/posts/deletepost${id}`, { withCredentials: true }, config);
        return id;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
});

export const incrementLike = createAsyncThunk('posts/incrementLike', async (id) => {
    try {
        const response = await axios.post(`/api/posts/${id}/like`, {}, { withCredentials: true }, config);
        return response.data;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
});

export const decrementLike = createAsyncThunk('posts/decrementLike', async (id) => {
    try {
        const response = await axios.post(`/api/posts/${id}/unlike`, {}, { withCredentials: true }, config);
        return response.data;
    } catch (exception) {
        return {
            error: true,
            exception,
        };
    }
});

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        isLoading:false,
        data:[],
        isError:false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchPosts.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(fetchPosts.rejected,(state,action)=>{
                state.isLoading =false;
                state.isError = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    state.push(action.payload);
                }
            })
            .addCase(createPost.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(createPost.rejected,(state,action)=>{
                state.isLoading =false;
                state.isError = true;
            })
            .addCase(editPost.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    const { id, content } = action.payload;
                    const post = state.find(post => post._id === id);
                    if (post) {
                        post.content = content;
                    }
                }
            })
            .addCase(editPost.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(editPost.rejected,(state,action)=>{
                state.isLoading =false;
                state.isError = true;
            })
            .addCase(deletePost.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    return state.filter(post => post._id !== action.payload);
                }
            })
            .addCase(deletePost.rejected,(state,action)=>{
                state.isLoading =false;
                state.isError = true;
            })
            .addCase(incrementLike.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    const post = state.find(post => post._id === action.payload._id);
                    if (post) {
                        post.likes = action.payload.likes;
                    }
                }
            })
            .addCase(incrementLike.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(incrementLike.rejected,(state,action)=>{
                state.isLoading =false;
                state.isError = true;
            })
            .addCase(decrementLike.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    const post = state.find(post => post._id === action.payload._id);
                    if (post) {
                        post.likes = action.payload.likes;
                    }
                }
            })
            .addCase(decrementLike.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(decrementLike.rejected,(state,action)=>{
                state.isLoading =false;
                state.isError = true;
            });
    },
});

export default postSlice.reducer;
