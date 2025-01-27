export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
  muscles: string;
  equipment: string;
  difficulty: number;
}

export interface Workout {
  id: number;
  name: string;
  description: string;
  type: string;
  difficulty: string;
  image: string;
  duration: string;
  caloriesBurned: string;
  exercises: Exercise[];
}
