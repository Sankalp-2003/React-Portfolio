import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import projectReducer from "./slices/projectSlice";
import skillReducer from "./slices/skillSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    projects: projectReducer,
    skills: skillReducer,
  },
});
