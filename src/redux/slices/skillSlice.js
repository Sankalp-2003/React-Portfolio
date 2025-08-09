// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getSkillImages = createAsyncThunk(
  "skills/getSkillImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/skill/images");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSkills = createAsyncThunk(
  "skills/getSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/skill");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSkillById = createAsyncThunk(
  "skills/getSkillById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/skill/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async (skillData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/skill", skillData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({ id, skillData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/skill/${id}`, skillData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/skill/${id}`);

      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const skillSlice = createSlice({
  name: "skills",
  initialState: {
    skillImages: null,
    skills: [],
    skill: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkillImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSkillImages.fulfilled, (state, action) => {
        state.loading = false;
        state.skillImages = action.payload;
      })
      .addCase(getSkillImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(getSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSkillById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSkillById.fulfilled, (state, action) => {
        state.loading = false;
        state.skill = action.payload;
      })
      .addCase(getSkillById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.loading = false;
        const created = action.payload;
        state.skills = [created, ...state.skills];
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.skills.findIndex(
          (skill) => skill._id === updated._id
        );
        if (idx !== -1) {
          state.skills[idx] = updated;
        }
        if (state.skill && state.skill._id === updated._id) {
          state.skill = updated;
        }
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.skills = state.skills.filter((skill) => skill._id !== id);
        if (state.skill && state.skill._id === id) {
          state.skill = null;
        }
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default skillSlice.reducer;
