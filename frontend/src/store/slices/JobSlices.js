import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openAlertMessage } from "../actions/alertActions";
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
const config = {
  headers: {
    "content-type": "application/json",
  },
};

export const createJobForms = createAsyncThunk(
  "jobs/createJobForms",
  async (content, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post("/api/jobs/createJobForm", content, {
        withCredentials: true,
      });
      return response.data;
    } catch (exception) {
      // Dispatching the openAlertMessage action on error
      openAlertMessage(exception.response?.data?.error || exception.message);
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
        { withCredentials: true },
        config
      );
      if (response.data.error === "Forms not found") {
        return rejectWithValue("No Jobs available.");
      }
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
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
        { withCredentials: true },
        config
      );
      if (response.data.error === "Forms not found") {
        return rejectWithValue("No Jobs available.");
      }
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (formId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `/api/jobs/fetchJobById/${formId}`,
        { withCredentials: true },
        config
      );
      return response.data;
    } catch (exception) {
      // Dispatching the openAlertMessage action on error
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const applyForJob = createAsyncThunk(
  "jobs/applyForJob",
  async (formId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `/api/jobs/applyForJob`,

        { formId: formId },
        { withCredentials: true },
        config
      );

      return response.data;
    } catch (exception) {
      console.log(exception);
      // Dispatching the openAlertMessage action on error
      dispatch(
        openAlertMessage(exception.response?.data?.error || exception.message)
      );
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);
export const fetchShortlistedApplicants = createAsyncThunk(
  "jobs/fetchShortlistedApplicants",
  async ({ formId, noOfApplicants },{ rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `/api/jobs/shortlist?formId=${formId}&noOfApplicants=${noOfApplicants}`,
        { withCredentials: true },
        config
      );
      return response.data;
    } catch (exception) {
      console.log(exception);
      dispatch(
        openAlertMessage(exception.response?.data?.error || exception.message)
      );
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const viewSimilarJobs = createAsyncThunk(
  "jobs/viewSimilarJobs",
  async (formId , { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `/api/jobs/viewSimilarJobs`,
        { formId: formId },
        { withCredentials: true, ...config }
      );
      dispatch(response.message);
      return response.data;
    } catch (exception) {
      dispatch(
        openAlertMessage(exception.response?.data?.error || exception.message)
      );
      return rejectWithValue(exception.response?.data || exception.message);
    }
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
      .addCase(viewSimilarJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(viewSimilarJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "Successfully Applied..";
      })
      .addCase(viewSimilarJobs.rejected, (state, action) => {
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
