import { Workout } from '../types';

export const workouts = [
  {
    id: '1',
    name: 'Workout 1',
    description: '',
    difficulty: 'intermediate',
    duration: 45,
    equipment: ['bodyweight', 'dumbbells'],
    exercises: [
      {
        id: 'w1e1',
        name: 'T-Spine Rotation to Downward Dog',
        description: `1. Start in pushup position.\n2. Keeping your left leg straight, place your right foot just outside your right hand. Hold.\n3. Lift your right arm and reach for the ceiling. Hold, then return to pushup position.\n4. Shift your feet forward slightly, then raise your hips high. Try to form a straight line from your hands through your hips while also trying to keep your legs straight.\n5. Hold, then return to the start. That’s 1 rep.`,
        gif: 'DownwardDog.gif',
      },
      {
        id: 'w1e2',
        name: 'Toe-Touch Squat',
        description: `1. Start standing, feet about shoulder-width apart, arms held in front of you.\n2. Keeping your back flat, bend your knees slightly and hinge forward at your hips until your hands touch your toes.\n3. When they do, bend at the knees so you finish in a low squat position.\n4. Reach your arms overhead.\n5. Stand back up. That’s 1 rep.`,
        gif: 'TSquat.gif',
      },
      {
        id: 'w1e3',
        name: 'Dumbbell Romanian Deadlift',
        description: `1. Stand holding medium-weight dumbbells at your sides, feet hip-width apart, core braced, knees slightly bent.\n2. Hinge at your hips and push your butt backward, lowering your torso.\n3. Hinge until you feel a slight stretch in your hamstrings.\n4. Pause, then stand up, squeezing your glutes. That’s 1 rep; do 12.`,
        gif: 'RDeadlift.gif',
        sets: 1,
        reps: 12,
      },
      {
        id: 'w1e4',
        name: 'Alternating Dumbbell Row',
        description: `1. Stand holding medium-weight dumbbells. Hinge at your hips until your torso is almost parallel to the floor.\n2. Squeeze your shoulder blades and row the right dumbbell to your chest.\n3. Lower it and repeat with the left dumbbell. That’s 1 rep; do 12.`,
        gif: 'AltDumbbell.gif',
        sets: 1,
        reps: 12,
      },
      {
        id: 'w1e5',
        name: 'Side-Plank Press',
        description: `1. Start in a left-side plank, your left elbow on the floor and your torso and hips tight, a light dumbbell in front of you.\n2. Grasp the dumbbell with your right hand. Continue pressing your hips upward as you lift the dumbbell off the floor and pull it close to your right pec.\n3. Press it toward the ceiling, then return it to the floor. That’s 1 rep; do 12 per side.`,
        gif: 'SidePress.gif',
        sets: 1,
        reps: 12,
      },
      {
        id: 'w1e6',
        name: 'Glute Bridge Floor Press',
        description: `1. Lie on the floor holding medium-weight dumbbells, upper arms on the floor, elbows bent 90 degrees.\n2. Tighten your glutes and push your hips upward.\n3. Press the dumbbells upward.\n4. Pause, then lower them back to the start. That’s 1 rep; do 12.`,
        gif: 'GlutePress.gif',
        sets: 1,
        reps: 12,
      },
      {
        id: 'w1e7',
        name: 'Bulgarian Split Squat',
        description: `1. Place your right foot on a bench or box that’s about knee height, bending your knee slightly, and step your left foot about 18 inches away. Your left leg should be almost straight.\n2. Hold medium-weight dumbbells at your shoulders. Bend your left knee, sitting back; your right knee will bend more as you do this and nearly touch the floor.\n3. Hold when your left thigh is parallel to the floor, then stand back up. That’s 1 rep; do 12 per side.`,
        gif: 'BulgSquat.gif',
        sets: 1,
        reps: 12,
      },
      {
        id: 'w1e8',
        name: 'Hollow Body Hold',
        description: `1. Start lying on your back, arms and legs extended.\n2. Tighten your abs, pressing your lower back into the floor as you do so. This should lift your legs off the floor; work to keep them straight.\n3. Lift your shoulder blades off the floor as well; keep extending your arms back as you do this.\n4. Hold for 30 seconds. That’s 1 rep; do 3 to 5.`,
        gif: 'BodyHold.gif',
        sets: 3,
        duration: 30,
      },
    ],
  },
  {
    id: '2',
    name: 'Workout 2',
    description: '',
    difficulty: 'intermediate',
    duration: 40,
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