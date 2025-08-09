// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/project");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/project/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (projectData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const fields = ["title", "name", "para", "git", "link", "description"];
      fields.forEach((f) => {
        if (projectData[f] !== undefined && projectData[f] !== null) {
          formData.append(f, projectData[f]);
        }
      });

      if (projectData.techStack) {
        if (Array.isArray(projectData.techStack)) {
          formData.append("techStack", JSON.stringify(projectData.techStack));
        } else {
          formData.append("techStack", projectData.techStack);
        }
      }

      if (projectData.thumbnail) {
        formData.append("thumbnail", projectData.thumbnail);
      }

      const response = await api.post("/api/project", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.project || response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const fields = ["title", "name", "para", "git", "link", "description"];
      fields.forEach((f) => {
        if (projectData[f] !== undefined && projectData[f] !== null) {
          formData.append(f, projectData[f]);
        }
      });

      if (projectData.techStack) {
        if (Array.isArray(projectData.techStack)) {
          formData.append("techStack", JSON.stringify(projectData.techStack));
        } else {
          formData.append("techStack", projectData.techStack);
        }
      }

      if (projectData.thumbnail) {
        formData.append("thumbnail", projectData.thumbnail);
      }

      const response = await api.put(`/api/project/${id}`, formData, {
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

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/project/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  projects: [],
  project: null,
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearProjectState(state) {
      state.project = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        state.projects = Array.isArray(payload)
          ? payload
          : payload.projects || payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload.project || action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        const created = action.payload;
        state.projects = [created, ...state.projects];
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;

        const idx = state.projects.findIndex((p) => p._id === updated._id);
        if (idx !== -1) {
          state.projects[idx] = updated;
        }
        if (state.project && state.project._id === updated._id) {
          state.project = updated;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.projects = state.projects.filter((p) => p._id !== id);
        if (state.project && state.project._id === id) {
          state.project = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectState, clearError } = projectsSlice.actions;
export default projectsSlice.reducer;
