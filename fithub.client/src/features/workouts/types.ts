export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  description: string;
}

export interface Workout {
  id: string;

  title: string;
  duration: "short" | "medium" | "long";
  equipment: "bodyweight" | "dumbbells" | "machines";
  exercises: Exercise[];
  description: string;
  imageUrl: string;
}
