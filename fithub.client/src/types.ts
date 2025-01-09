export type Equipment = 'bodyweight' | 'dumbbells' | 'machines';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  equipment: Equipment[];
  duration: number;
  sets?: number;
  reps?: number;
  image: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  exercises: Exercise[];
  equipment: Equipment[];
  image: string;
}