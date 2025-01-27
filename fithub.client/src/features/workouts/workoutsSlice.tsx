import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Workout } from "./types";
import { getAllWorkoutsAPI, getWorkoutByIdAPI } from "../../utils/api";

interface WorkoutsState {
  workouts: Workout[];
  selectedWorkout: Workout | null;
  loading: boolean;
  error: string | null;
}

// Async thunk to fetch workouts from API
export const fetchWorkouts = createAsyncThunk<
  Workout[],
  void,
  { rejectValue: string }
>("workouts/fetchWorkouts", async (_, { rejectWithValue }) => {
  try {
    const response = await getAllWorkoutsAPI();
    return response; // Assuming response is already an array of Workout objects
  } catch (error) {
    return rejectWithValue("Failed to fetch workouts");
  }
});

// Async thunk to fetch a single workout by ID from API
export const fetchWorkoutById = createAsyncThunk<
  Workout,
  string,
  { rejectValue: string }
>("workouts/fetchWorkoutById", async (id, { rejectWithValue }) => {
  try {
    const response = await getWorkoutByIdAPI(id);
    return response;
  } catch (error) {
    return rejectWithValue("Failed to fetch workout");
  }
});

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
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.loading = false;
        state.workouts = action.payload;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchWorkoutById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkoutById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedWorkout = action.payload;
      })
      .addCase(fetchWorkoutById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearSelectedWorkout } = workoutsSlice.actions;
export default workoutsSlice.reducer;
