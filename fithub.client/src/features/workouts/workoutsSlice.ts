import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Workout } from "./types";

// Thunk pentru fetch
export const fetchWorkouts = createAsyncThunk(
  "workouts/fetchWorkouts",
  async () => {
    const response = await axios.get("http://localhost:5012/api/Workout/get-all-workouts");
    return response.data;
  }
);

interface WorkoutsState {
  workouts: Workout[];
  selectedWorkout: Workout | null;
  loading: boolean;
  error: string | null;
}

const initialState: WorkoutsState = {
  workouts: [],
  selectedWorkout: null,
  loading: false,
  error: null,
};

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    setSelectedWorkout: (state, action: PayloadAction<string | number>) => {
      state.selectedWorkout =
        state.workouts.find((w) => String(w.id) === String(action.payload)) || null;
    },
    clearSelectedWorkout: (state) => {
      state.selectedWorkout = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action: PayloadAction<Workout[]>) => {
        state.loading = false;
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load workouts";
      });
  }
});

export const { setSelectedWorkout, clearSelectedWorkout } =
  workoutsSlice.actions;
export default workoutsSlice.reducer;
