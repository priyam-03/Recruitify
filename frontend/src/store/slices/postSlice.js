import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchMyPosts = createAsyncThunk(
  "posts/fetchMyPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/posts/getMyPosts`, {
        withCredentials: true,
      });

      if (response.data.error === "Posts not found") {
        return rejectWithValue("No posts available.");
      }

      return response.data;
    } catch (exception) {
      if (exception.response && exception.response.data) {
        return rejectWithValue(exception.response.data);
      } else {
        return rejectWithValue("An error occurred while fetching posts.");
      }
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/posts/getAllPosts`, {
        withCredentials: true,
      });

      if (response.data.error === "Posts not found") {
        return rejectWithValue("No posts available.");
      }

      return response.data;
    } catch (exception) {
      if (exception.response && exception.response.data) {
        return rejectWithValue(exception.response.data);
      } else {
        return rejectWithValue("An error occurred while fetching posts.");
      }
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (content, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/posts/createpost",
        content,
        { withCredentials: true },
        config
      );
      return response.data;
    } catch (exception) {
      return rejectWithValue(exception.response ? exception.response.data : "An error occurred while creating the post.");
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, content }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/posts/${id}`,
        { content },
        { withCredentials: true },
        config
      );
      return response.data;
    } catch (exception) {
      return rejectWithValue(exception.response ? exception.response.data : "An error occurred while editing the post.");
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `/api/posts/deletePost/${id}`,
        { withCredentials: true },
        config
      );
      return id;
    } catch (exception) {
      return rejectWithValue(exception.response ? exception.response.data : "An error occurred while deleting the post.");
    }
  }
);

export const incrementLike = createAsyncThunk(
  "posts/incrementLike",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/posts/${id}/like`,
        {},
        { withCredentials: true },
        config
      );
      return response.data;
    } catch (exception) {
      return rejectWithValue(exception.response ? exception.response.data : "An error occurred while incrementing the like.");
    }
  }
);

export const decrementLike = createAsyncThunk(
  "posts/decrementLike",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/posts/${id}/unlike`,
        {},
        { withCredentials: true },
        config
      );
      return response.data;
    } catch (exception) {
      return rejectWithValue(exception.response ? exception.response.data : "An error occurred while decrementing the like.");
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    myPosts: [],
    allPosts: [],
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myPosts = action.payload; // Ensure posts are in the correct order
      })
      .addCase(fetchMyPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allPosts = action.payload; // Ensure posts are in the correct order
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.myPosts = [action.payload, ...state.myPosts]; // Add new post to the top
          state.allPosts = [action.payload, ...state.allPosts]; // Add new post to the top
        }
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        if (!action.payload.error) {
          const { id, content } = action.payload;
          const post = state.myPosts.find((post) => post._id === id);
          if (post) {
            post.content = content;
          }
        }
      })
      .addCase(editPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload.error) {
          state.myPosts = state.myPosts.filter((post) => post._id !== action.payload);
          state.allPosts = state.allPosts.filter((post) => post._id !== action.payload);
        }
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(incrementLike.fulfilled, (state, action) => {
        if (!action.payload.error) {
          const post = state.allPosts.find((post) => post._id === action.payload._id);
          if (post) {
            post.likes = action.payload.likes;
          }
        }
      })
      .addCase(incrementLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(incrementLike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(decrementLike.fulfilled, (state, action) => {
        if (!action.payload.error) {
          const post = state.allPosts.find((post) => post._id === action.payload._id);
          if (post) {
            post.likes = action.payload.likes;
          }
        }
      })
      .addCase(decrementLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decrementLike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default postSlice.reducer;
