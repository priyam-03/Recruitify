import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
    headers: {
        "content-type": "application/json",
    },
    withCredentials: true,
};

export const updateEducation = createAsyncThunk('profile/updateEducation', async (content, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/profile/updateEducation', content, config);
        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response?.data || exception.message);
    }
});



const JobSlice = createSlice({
    name: 'profile',
    initialState: {
        isLoading: false,
        education:{},
        skills: [],
        experiences:[],
        links: [],
        isError: false,
        message: '',
        errorMessage: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateEducation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateEducation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.education = action.payload;
            })
            .addCase(updateEducation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
    }
});

export default JobSlice.reducer;
