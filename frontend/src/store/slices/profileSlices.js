import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openAlertMessage } from "../actions/alertActions";
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
const config = {
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
};
export const addEducation = createAsyncThunk(
  "profile/addEducation",
  async (content, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/profile/addEducation",
        content,
        config
      );
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const fetchEducations = createAsyncThunk(
  "profile/fetchEducations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/profile/fetchEducations", config);
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const addExperience = createAsyncThunk(
  "profile/addExperience",
  async (content, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/profile/addExperience",
        content,
        config
      );
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const fetchExperiences = createAsyncThunk(
  "profile/fetchExperiences",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/profile/fetchExperiences", config);
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const addSkill = createAsyncThunk(
  "profile/addSkill",
  async (content, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/profile/addSkill",
        content,
        config
      );
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);


export const fetchSkills = createAsyncThunk(
  "profile/fetchSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/profile/fetchSkills", config);
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const addLink = createAsyncThunk(
  "profile/addLink",
  async (content, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/profile/addLink",
        content,
        config
      );
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const fetchLinks = createAsyncThunk(
  "profile/fetchLinks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/profile/fetchLinks", config);
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const uploadResume = createAsyncThunk(
  "profile/uploadResume",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/profile/uploadResume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

export const fetchResume = createAsyncThunk(
  "profile/fetchResume",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/profile/fetchResume", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (exception) {
      openAlertMessage(exception.response?.data?.error || exception.message);
      return rejectWithValue(exception.response?.data || exception.message);
    }
  }
);

const JobSlice = createSlice({
  name: "profile",
  initialState: {
    isLoading: false,
    educations: [],
    skills: [],
    experiences: [],
    links: [],
    resume: "",
    isError: false,
    message: "",
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEducation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.educations = action.payload;
      })
      .addCase(addEducation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addExperience.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.isLoading = false;
        state.experiences = action.payload;
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addSkill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skills.push(action.payload);
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.links = action.payload;
      })
      .addCase(addLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchEducations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEducations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.educations = action.payload;
      })
      .addCase(fetchEducations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchExperiences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.experiences = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchSkills.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchLinks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.links = action.payload;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(uploadResume.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resume = action.payload;
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchResume.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resume = action.payload;
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default JobSlice.reducer;
