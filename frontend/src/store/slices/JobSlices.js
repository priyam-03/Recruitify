import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
const config = {
  headers: {
    "content-type": "application/json",
  },
};

export const createJobForms = createAsyncThunk(
  "jobs/createJobForms",
  async (content, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/jobs/createJobForm",
        content,
        { withCredentials: true },
        config
      );
      return response.data;
    } catch (exception) {
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const fetchMyJobForms = createAsyncThunk(
  "jobs/fetchMyJobForms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/jobs/fetchMyJobForms`,
        {
          withCredentials: true,
        },
        config
      );
      if (response.data.error === "Forms not found") {
        return rejectWithValue("No Jobs available.");
      }
      return response.data;
    } catch (exception) {
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const fetchAllJobForms = createAsyncThunk(
  "jobs/fetchAllJobForms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/jobs/fetchAllJobForms`,
        {
          withCredentials: true,
        },
        config
      );
      if (response.data.error === "Forms not found") {
        return rejectWithValue("No Jobs available.");
      }
      return response.data;
    } catch (exception) {
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (formId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/jobs/fetchJobById/${formId}`,
        {
          withCredentials: true,
        },
        config
      );
      return response.data;
    } catch (exception) {
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const applyForJob = createAsyncThunk(
  "jobs/applyForJob",
  async (formId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/jobs/applyForJob`,

        { formId: formId },
        {
          withCredentials: true,
        },
        config
      );
      return response.data;
    } catch (exception) {
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);
export const fetchShortlistedApplicants = createAsyncThunk(
  "jobs/fetchShortlistedApplicants",
  async ({ formId, noOfApplicants }) => {
    const response = await axios.get(
      `/api/jobs/shortlist?formId=${formId}&noOfApplicants=${noOfApplicants}`,
      {
        withCredentials: true,
      },
      config
    );
    return response.data;
  }
);

const JobSlice = createSlice({
  name: "jobs",
  initialState: {
    isLoading: false,
    allJobForms: [],
    myJobForms: [],
    jobFormById: {},
    shortlistedApplicants: [],
    isError: false,
    message: "",
    errorMessage: "",
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
        state.errorMessage = action.payload.error;
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
        state.errorMessage = action.payload.error;
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
        state.errorMessage = action.payload.error;
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
        state.errorMessage = action.payload.error;
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
        state.errorMessage = action.payload.error;
      })
      .addCase(fetchShortlistedApplicants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShortlistedApplicants.fulfilled, (state, action) => {
        state.shortlistedApplicants = action.payload;
        console.log("shortlistApplication" + action.payload);
        state.isLoading = false;
      })
      .addCase(fetchShortlistedApplicants.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default JobSlice.reducer;
