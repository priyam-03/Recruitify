import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
    headers: {
        "content-type": "application/json",
    },
    withCredentials: true,
};

export const createJobForms = createAsyncThunk('jobs/createJobForms', async (content, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/jobs/createJobForm', content, config);
        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response?.data || exception.message);
    }
});

export const fetchMyJobForms = createAsyncThunk("jobs/fetchMyJobForms", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/jobs/fetchMyJobForms`, config);
        if (response.data.error === "Forms not found") {
            return rejectWithValue('No Jobs available.');
        }
        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response?.data || exception.message);
    }
});

export const fetchAllJobForms = createAsyncThunk("jobs/fetchAllJobForms",async(_,{rejectWithValue})=>{
    try {
        const response = await axios.get(`/api/jobs/fetchAllJobForms`, config);
        if (response.data.error === "Forms not found") {
            return rejectWithValue('No Jobs available.');
        }
        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response?.data || exception.message);
    }
})


export const fetchJobById = createAsyncThunk('jobs/fetchJobById',async (formId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/jobs/fetchJobById/${formId}`,config);
            return response.data;
        } catch (exception) {
            return rejectWithValue(exception.response?.data || exception.message);
        }
    }
);

export const applyForJob = createAsyncThunk("jobs/applyForJob", async (formId, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/jobs/applyForJob`,{formId:formId},config);
        return response.data;
    } catch (exception) {
        return rejectWithValue(exception.response?.data || exception.message);
    }
});

const JobSlice = createSlice({
    name: 'jobs',
    initialState: {
        isLoading: false,
        allJobForms: [],
        myJobForms:[],
        jobFormById: {},
        isError: false,
        message: '',
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
                state.myJobForms.push(action.payload);
            })
            .addCase(createJobForms.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(fetchMyJobForms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMyJobForms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myJobForms = action.payload;
            })
            .addCase(fetchMyJobForms.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(fetchAllJobForms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllJobForms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allJobForms = action.payload;
            })
            .addCase(fetchAllJobForms.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(fetchJobById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchJobById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobFormById = action.payload;
            })
            .addCase(fetchJobById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            })
            .addCase(applyForJob.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(applyForJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = "Successfully Applied..";
            })
            .addCase(applyForJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
            });
    }
});

export default JobSlice.reducer;
