export interface Exercise {
  id: string;
  name: string;
  description: string;
  gif: string; // filename of the gif in exerciseGIFS
  sets?: number;
  reps?: number;
  duration?: number; // in seconds, if applicable
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number; // in minutes
  equipment: string[]; // e.g. ['bodyweight', 'dumbbells']
  exercises: Exercise[];
  gif: string;
}
