import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { openAlertMessage } from "../actions/alertActions"; // Ensure correct import path
import axios from "axios";

export const fetchAllSkills = createAsyncThunk(
    "skills/fetchAllSkills",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/skills/fetchAllSkills", { withCredentials: true });
            return response.data.skills || []; 
        } catch (exception) {
            const errorMessage =
                exception.response?.data?.error || exception.message || "An unknown error occurred";
            openAlertMessage(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);
const SkillSlices = createSlice({
    name: "skills",
    initialState: {
        isLoading: false,
        skillsList: [],  // Initialize as an empty array instead of undefined
        isError: false,
        message: "",
        errorMessage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSkills.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllSkills.fulfilled, (state, action) => {
                state.isLoading = false;
                state.skillsList = action.payload;  // Ensure payload is an array
            })
            .addCase(fetchAllSkills.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload || "Failed to load skills";
            });
    },
});

export default SkillSlices.reducer;
