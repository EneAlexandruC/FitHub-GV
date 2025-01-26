import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workout } from "./types";

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
      equipment: "bodyweight",
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
    setSelectedWorkout: (state, action: PayloadAction<string>) => {
      state.selectedWorkout =
        state.workouts.find((w) => w.id === action.payload) || null;
    },
    clearSelectedWorkout: (state) => {
      state.selectedWorkout = null;
    },
  },
});

export const { setSelectedWorkout, clearSelectedWorkout } =
  workoutsSlice.actions;
export default workoutsSlice.reducer;
