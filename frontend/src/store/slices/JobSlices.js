import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
    headers: {
        "content-type": "application/json",
    },
};

export const createJobForms = createAsyncThunk('jobs/createJobForms', async (content, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/jobs/createJobForm', content, { withCredentials: true }, config);
        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response.data || exception.message);
    }
});

export const fetchJobForms = createAsyncThunk("jobs/fetchJobForms", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/jobs/fetchJobForms/${id}`, { withCredentials: true }, config);
        if (response.data.error === "Forms not found") {
            return rejectWithValue('No Jobs available.');
        }
        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response.data || exception.message);
    }
});

export const applyForJob = createAsyncThunk("jobs/applyForJob", async ({ userId, formId, userDetails }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/jobs/applyForJob', { userId, formId, userDetails }, { withCredentials: true }, config);
        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response.data || exception.message);
    }
});

const JobSlice = createSlice({
    name: 'jobs',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        message:'',
        errorMessage: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createJobForms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createJobForms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(createJobForms.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(fetchJobForms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchJobForms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchJobForms.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(applyForJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(applyForJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.message = "Successfully Applied.."
            })
            .addCase(applyForJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });
    }
});

export default JobSlice.reducer;
