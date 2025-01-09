import { Workout } from '../types';

export const workouts: Workout[] = [
  {
    id: '1',
    name: 'Full Body Blast',
    description: 'A complete full body workout targeting all major muscle groups. Perfect for building strength and endurance.',
    difficulty: 'intermediate',
    duration: 45,
    equipment: ['bodyweight', 'dumbbells'],
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80',
    exercises: [
      {
        id: 'e1',
        name: 'Push-ups',
        description: 'Classic push-ups for chest and triceps',
        equipment: ['bodyweight'],
        duration: 5,
        sets: 3,
        reps: 12,
        image: 'https://images.unsplash.com/photo-1598971639058-999901021c1a?auto=format&fit=crop&q=80'
      },
      {
        id: 'e2',
        name: 'Dumbbell Rows',
        description: 'Single-arm dumbbell rows for back strength',
        equipment: ['dumbbells'],
        duration: 5,
        sets: 3,
        reps: 12,
        image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: '2',
    name: 'HIIT Cardio Burn',
    description: 'High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.',
    difficulty: 'advanced',
    duration: 30,
    equipment: ['bodyweight'],
    image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&q=80',
    exercises: [
      {
        id: 'e3',
        name: 'Burpees',
        description: 'Full body exercise for maximum intensity',
        equipment: ['bodyweight'],
        duration: 4,
        sets: 4,
        reps: 10,
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: '3',
    name: 'Strength Master',
    description: 'Build serious strength with this machine-based workout routine.',
    difficulty: 'intermediate',
    duration: 60,
    equipment: ['machines'],
    image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&q=80',
    exercises: [
      {
        id: 'e4',
        name: 'Leg Press',
        description: 'Machine-based leg press for lower body strength',
        equipment: ['machines'],
        duration: 6,
        sets: 4,
        reps: 10,
        image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80'
      }
    ]
  }
];