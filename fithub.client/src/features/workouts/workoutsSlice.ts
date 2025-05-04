import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Workout } from "./types"; // Removed Exercise import

// Thunk for fetching workouts
export const fetchWorkouts = createAsyncThunk(
  "workouts/fetchWorkouts",
  async (_, { rejectWithValue }) => {
    try {
      console.log('Attempting to fetch workouts from API...');
      const response = await axios.get("http://localhost:5012/api/Workout/get-all-workouts", { withCredentials: true });
      console.log('Fetch workouts response status:', response.status);
      console.log('Fetch workouts response data:', response.data);
      // Validate response data structure here if necessary
      return response.data as Workout[]; // Assert type
    } catch (error: unknown) {
      let errorMessage = 'Failed to fetch workouts';
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data;
        errorMessage = typeof data === 'string' ? data : JSON.stringify(data);
        console.error('Error fetching workouts:', errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
        console.error('Error fetching workouts:', errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk for saving a workout
export const saveWorkout = createAsyncThunk(
  'workouts/saveWorkout',
  async (newWorkout: Omit<Workout, 'id'>, { rejectWithValue }) => {
    try {
      console.log('Attempting to save workout to API...', newWorkout);
      const response = await axios.post("http://localhost:5012/api/Workout/add-workout", newWorkout, { withCredentials: true });
      console.log('Save workout response status:', response.status);
      console.log('Save workout response data:', response.data);
      return response.data as Workout;
    } catch (error: unknown) {
      let errorMessage = 'Failed to save workout';
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data;
        errorMessage = typeof data === 'string' ? data :
                       (typeof data === 'object' && data !== null && 'message' in data && typeof (data as { message: unknown }).message === 'string') ? (data as { message: string }).message :
                       JSON.stringify(data);
        console.error('Error saving workout:', errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
        console.error('Error saving workout:', errorMessage);
      }
      return rejectWithValue(errorMessage);
    }
  }
);

interface WorkoutsState {
  workouts: Workout[];
  selectedWorkout: Workout | null;
  loading: boolean;
  error: string | null;
}

// Minimal initial state, rely on fetchWorkouts
const initialState: WorkoutsState = {
  workouts: [], // Start empty, fetch from backend
  selectedWorkout: null,
  loading: false,
  error: null,
};

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    setSelectedWorkout: (state, action: PayloadAction<string | number>) => {
      state.selectedWorkout = state.workouts.find((w) => String(w.id) === String(action.payload)) || null;
    },
    clearSelectedWorkout: (state) => {
      state.selectedWorkout = null;
    },
    // Add reducer to handle local state update if backend save fails (optional)
  },
  extraReducers: (builder) => {
    builder
      // Fetch Workouts Cases
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action: PayloadAction<Workout[]>) => {
        state.loading = false;
        state.workouts = action.payload;
        state.error = null;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to load workouts";
      })
      // Save Workout Cases
      .addCase(saveWorkout.pending, (state) => {
        state.loading = true; // Show loading during save
        state.error = null;
      })
      .addCase(saveWorkout.fulfilled, (state, action: PayloadAction<Workout>) => {
        state.loading = false;
        state.workouts.push(action.payload); // Add the newly saved workout (with ID) to the list
        state.error = null;
      })
      .addCase(saveWorkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to save workout";
      });
  },
});

export const { setSelectedWorkout, clearSelectedWorkout } = workoutsSlice.actions;
export default workoutsSlice.reducer;