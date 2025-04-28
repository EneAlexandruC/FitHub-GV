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
  workouts: [
    {
      id: "1",

      title: "Full Body Strength",
      duration: "medium",
      equipment: "dumbbells",
      difficulty: "beginner",
      description:
      "A comprehensive full-body workout targeting all major muscle groups",
      imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      exercises: [
        {
          id: "1-1",
          name: "Dumbbell Squats",
          sets: 3,
          reps: 12,
          description:
            "Stand with feet shoulder-width apart, holding dumbbells at shoulders",
        },
        {
          id: "1-2",
          name: "Push-ups",
          sets: 3,
          reps: 15,
          description: "Standard push-ups with proper form",
        },
        {
          id: "1-3",
          name: "Push-ups",
          sets: 3,
          reps: 15,
          description: "Standard push-ups with proper form",
        },
        {
          id: "1-4",
          name: "Push-ups",
          sets: 3,
          reps: 15,
          description: "Standard push-ups with proper form",
        },
        {
          id: "1-5",
          name: "Push-ups",
          sets: 3,
          reps: 15,
          description: "Standard push-ups with proper form",
        },
        {
          id: "1-6",
          name: "Push-ups",
          sets: 3,
          reps: 15,
          description: "Standard push-ups with proper form",
        },
      ],
    },
    {
      id: "2",
      title: "HIIT Cardio",

      duration: "short",
      equipment: "machines",
      difficulty: "intermediate",
      description:
        "High-intensity interval training to boost cardiovascular fitness",
      imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
      exercises: [
        {
          id: "2-1",
          name: "Burpees",
          sets: 4,
          reps: 10,
          description: "Full body exercise combining squat, push-up, and jump",
        },
        {
          id: "2-2",
          name: "Mountain Climbers",
          sets: 3,
          reps: 20,
          description: "Dynamic plank exercise targeting core and cardio",
        },
      ],
    },
    {
      id: "3",

      title: "HIIT Cardio",
      duration: "short",
      equipment: "bodyweight",
      difficulty: "intermediate",
      description:
        "High-intensity interval training to boost cardiovascular fitness",
      imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
      exercises: [
        {
          id: "2-1",
          name: "Burpees",
          sets: 4,
          reps: 10,
          description: "Full body exercise combining squat, push-up, and jump",
        },
        {
          id: "2-2",
          name: "Mountain Climbers",
          sets: 3,
          reps: 20,
          description: "Dynamic plank exercise targeting core and cardio",
        },
      ],
    },
    {
      id: "4",

      title: "HIIT Cardio",
      duration: "short",
      equipment: "bodyweight",
      difficulty: "intermediate",
      description:
        "High-intensity interval training to boost cardiovascular fitness",
      imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
      exercises: [
        {
          id: "2-1",
          name: "Burpees",
          sets: 4,
          reps: 10,
          description: "Full body exercise combining squat, push-up, and jump",
        },
        {
          id: "2-2",
          name: "Mountain Climbers",
          sets: 3,
          reps: 20,
          description: "Dynamic plank exercise targeting core and cardio",
        },
      ],
    },
    {
      id: "5",

      title: "HIIT Cardio",
      duration: "short",
      equipment: "bodyweight",
      difficulty: "intermediate",
      description:
        "High-intensity interval training to boost cardiovascular fitness",
      imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
      exercises: [
        {
          id: "2-1",
          name: "Burpees",
          sets: 4,
          reps: 10,
          description: "Full body exercise combining squat, push-up, and jump",
        },
        {
          id: "2-2",
          name: "Mountain Climbers",
          sets: 3,
          reps: 20,
          description: "Dynamic plank exercise targeting core and cardio",
        },
      ],
    },
    {
      id: "6",

      title: "HIIT Cardio",
      duration: "short",
      equipment: "bodyweight",
      difficulty: "intermediate",
      description:
        "High-intensity interval training to boost cardiovascular fitness",
      imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
      exercises: [
        {
          id: "2-1",
          name: "Burpees",
          sets: 4,
          reps: 10,
          description: "Full body exercise combining squat, push-up, and jump",
        },
        {
          id: "2-2",
          name: "Mountain Climbers",
          sets: 3,
          reps: 20,
          description: "Dynamic plank exercise targeting core and cardio",
        },
      ],
    },
    {
      id: "7",

      title: "HIIT Cardio",
      duration: "short",
      equipment: "bodyweight",
      difficulty: "intermediate",
      description:
        "High-intensity interval training to boost cardiovascular fitness",
      imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
      exercises: [
        {
          id: "2-1",
          name: "Burpees",
          sets: 4,
          reps: 10,
          description: "Full body exercise combining squat, push-up, and jump",
        },
        {
          id: "2-2",
          name: "Mountain Climbers",
          sets: 3,
          reps: 20,
          description: "Dynamic plank exercise targeting core and cardio",
        },
      ],
    },
    {
      id: "8",

      title: "HIIT Cardio",
      duration: "short",
      equipment: "bodyweight",
      difficulty: "intermediate",
      description:
        "High-intensity interval training to boost cardiovascular fitness",
      imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
      exercises: [
        {
          id: "2-1",
          name: "Burpees",
          sets: 4,
          reps: 10,
          description: "Full body exercise combining squat, push-up, and jump",
        },
        {
          id: "2-2",
          name: "Mountain Climbers",
          sets: 3,
          reps: 20,
          description: "Dynamic plank exercise targeting core and cardio",
        },
      ],
    },
    {
      id: "9",

      title: "HIIT Cardio",
      duration: "short",
      equipment: "bodyweight",
      difficulty: "intermediate",
      description:
        "High-intensity interval training to boost cardiovascular fitness",
      imageUrl: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3",
      exercises: [
        {
          id: "2-1",
          name: "Burpees",
          sets: 4,
          reps: 10,
          description: "Full body exercise combining squat, push-up, and jump",
        },
        {
          id: "2-2",
          name: "Mountain Climbers",
          sets: 3,
          reps: 20,
          description: "Dynamic plank exercise targeting core and cardio",
        },
      ],
    },
  ],
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
