// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProfilePic = createAsyncThunk(
  "profile/fetchProfilePic",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/profile");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addOrUpdateProfilePic = createAsyncThunk(
  "profile,addOrUpdateProfilePic",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data.profile;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfilePic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addOrUpdateProfilePic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrUpdateProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(addOrUpdateProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
